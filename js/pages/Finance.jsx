const { React, useState, useEffect, useRef } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;

export function Finance() {
  const { initExpenses } = window.utils.data;
  const [expenses, setExpenses] = useState(initExpenses);
  const [budget] = useState(5000);
  const [showModal, setShowModal] = useState(false);
  const [newExp, setNewExp] = useState({name:'',cat:'Food',amount:''});
  const [aiTip, setAiTip] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const total = expenses.reduce((s,e)=>s+e.amount,0);
  const pct = Math.round(total/budget*100);
  const canvasRef = useRef(null);

  useEffect(()=>{
    if(!canvasRef.current) return;
    const ex = window.Chart.getChart(canvasRef.current);
    if(ex) ex.destroy();
    const cats = {};
    expenses.forEach(e=>{cats[e.cat]=(cats[e.cat]||0)+e.amount;});
    new window.Chart(canvasRef.current,{
      type:'doughnut',
      data:{
        labels:Object.keys(cats),
        datasets:[{data:Object.values(cats),backgroundColor:['#6c63ff','#3b82f6','#22c55e','#f59e0b','#ec4899'],borderWidth:0,hoverOffset:4}]
      },
      options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false}}}
    });
  },[expenses]);

  const getAiAdvice = async () => {
    setAiLoading(true);
    const cats = {};
    expenses.forEach(e=>{cats[e.cat]=(cats[e.cat]||0)+e.amount;});
    const r = await callAI(
      `My monthly budget is ₹${budget}. I've spent ₹${total} so far (${pct}% of budget). Breakdown: ${Object.entries(cats).map(([k,v])=>`${k}: ₹${v}`).join(', ')}. Give me 3 specific savings tips and warn me about overspending categories.`,
      "You are a personal finance advisor for college students in India. Be practical and specific."
    );
    setAiTip(r);
    setAiLoading(false);
  };

  const catIcons = {Food:'🍱',Travel:'🚇',Education:'📗',Entertainment:'🎬',Shopping:'🛍️',Other:'💸'};

  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700}}>💰 Finance Tracker</h2>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={getAiAdvice}>✦ AI Tips</button>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Expense</button>
        </div>
      </div>

      <div className="grid-4" style={{marginBottom:20}}>
        {[
          {label:'Monthly Budget',value:`₹${budget.toLocaleString()}`,color:'var(--blue)',bg:'var(--blue-bg)',icon:'💼'},
          {label:'Total Spent',value:`₹${total.toLocaleString()}`,color:'var(--accent)',bg:'rgba(108,99,255,0.12)',icon:'💳'},
          {label:'Remaining',value:`₹${(budget-total).toLocaleString()}`,color:'var(--green)',bg:'var(--green-bg)',icon:'🏦'},
          {label:'% Used',value:`${pct}%`,color:pct>90?'var(--red)':pct>70?'var(--amber)':'var(--green)',bg:'var(--bg3)',icon:'📊'},
        ].map((s,i)=>(
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{background:s.bg,fontSize:22}}>{s.icon}</div>
            <div><div className="stat-label">{s.label}</div><div className="stat-value" style={{fontSize:18,color:s.color}}>{s.value}</div></div>
          </div>
        ))}
      </div>

      <div style={{marginBottom:20}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}>
          <span style={{color:'var(--text2)'}}>Budget used</span>
          <span style={{fontWeight:600,color:pct>90?'var(--red)':pct>70?'var(--amber)':'var(--green)'}}>{pct}%</span>
        </div>
        <div className="progress-wrap" style={{height:10}}>
          <div className="progress-bar" style={{width:`${Math.min(pct,100)}%`,background:pct>90?'var(--red)':pct>70?'var(--amber)':'var(--accent)'}}/>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">🥧 Spending Breakdown</div>
          <div style={{height:180}}><canvas ref={canvasRef}/></div>
        </div>
        <div className="card">
          {aiTip ? (
            <>
              <div className="card-title">✦ AI Savings Tips</div>
              <div className="ai-box">
                <div className="ai-label">Personalized advice</div>
                {aiLoading?<LoadingDots/>:<div className="ai-text">{aiTip}</div>}
              </div>
            </>
          ) : (
            <>
              <div className="card-title">📋 Recent Transactions</div>
              {expenses.slice(0,4).map(e=>(
                <div key={e.id} className="expense-row">
                  <div className="expense-icon" style={{background:e.color}}>{e.icon}</div>
                  <div><div className="expense-name">{e.name}</div><div className="expense-cat">{e.cat} • {e.date}</div></div>
                  <div className="expense-amount">₹{e.amount}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal">
            <div className="modal-title">Add Expense</div>
            <div className="form-group"><label className="label">Description</label><input className="input" placeholder="e.g. Canteen lunch" value={newExp.name} onChange={e=>setNewExp({...newExp,name:e.target.value})}/></div>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="input" value={newExp.cat} onChange={e=>setNewExp({...newExp,cat:e.target.value})}>
                {['Food','Travel','Education','Entertainment','Shopping','Other'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="label">Amount (₹)</label><input className="input" type="number" placeholder="0" value={newExp.amount} onChange={e=>setNewExp({...newExp,amount:+e.target.value})}/></div>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{if(newExp.name&&newExp.amount>0){setExpenses([{id:Date.now(),...newExp,icon:catIcons[newExp.cat]||'💸',color:'var(--amber-bg)',date:'Today'},...expenses]);setShowModal(false);setNewExp({name:'',cat:'Food',amount:''});}}}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
