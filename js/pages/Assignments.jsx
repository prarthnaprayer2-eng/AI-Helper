const { React, useState } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;
const { daysUntil } = window.utils.dateHelpers;

export function Assignments() {
  const { initAssignments } = window.utils.data;
  const [items, setItems] = useState(initAssignments);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [aiPlan, setAiPlan] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [newA, setNewA] = useState({name:'',subject:'',deadline:'',priority:'Medium'});

  const toggle = id => setItems(items.map(a => a.id===id ? {...a,done:!a.done} : a));
  const del = id => setItems(items.filter(a=>a.id!==id));

  const filtered = filter==='All' ? items : filter==='Done' ? items.filter(a=>a.done) : items.filter(a=>!a.done && a.priority===filter);

  const getPriority = async () => {
    setAiLoading(true);
    const pending = items.filter(a=>!a.done);
    const r = await callAI(
      `I have these pending assignments: ${pending.map(a=>`${a.name} (${a.subject}, due ${a.deadline}, priority: ${a.priority})`).join('; ')}. Which should I work on first and why? Give me a brief prioritized action plan.`,
      "You are a time management coach for students. Be specific and concise."
    );
    setAiPlan(r);
    setAiLoading(false);
  };

  const priorityColor = p => p==='High'?'badge-red':p==='Medium'?'badge-amber':'badge-green';

  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700}}>⏰ Assignments</h2>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={getPriority}>✦ AI Prioritize</button>
          <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add</button>
        </div>
      </div>

      <div className="tabs">
        {['All','High','Medium','Low','Done'].map(f => (
          <div key={f} className={`tab ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>{f}</div>
        ))}
      </div>

      {aiPlan && (
        <div className="ai-box" style={{marginBottom:20}}>
          <div className="ai-label">AI Priority Plan</div>
          {aiLoading ? <LoadingDots/> : <div className="ai-text">{aiPlan}</div>}
        </div>
      )}

      <div className="card">
        {filtered.length === 0 && <div style={{textAlign:'center',color:'var(--text3)',padding:32}}>No assignments here 🎉</div>}
        {filtered.map(a => {
          const d = daysUntil(a.deadline);
          const dCol = d<=2?'var(--red)':d<=5?'var(--amber)':'var(--text2)';
          return (
            <div key={a.id} className="assignment-item" style={{opacity:a.done?0.5:1}}>
              <div className={`assignment-check ${a.done?'done':''}`} onClick={()=>toggle(a.id)}>
                {a.done && <span style={{color:'#fff',fontSize:12}}>✓</span>}
              </div>
              <div style={{flex:1}}>
                <div className="assignment-name" style={{textDecoration:a.done?'line-through':'none'}}>{a.name}</div>
                <div className="assignment-meta">
                  <span>{a.subject}</span>
                  <span className={`badge ${priorityColor(a.priority)}`}>{a.priority}</span>
                  <span style={{color:dCol,fontWeight:500}}>{a.done?'Done':d<=0?'Overdue!':d===1?'Due tomorrow':`Due in ${d}d`}</span>
                </div>
              </div>
              <button className="btn btn-danger btn-sm" onClick={()=>del(a.id)}>✕</button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal">
            <div className="modal-title">New Assignment</div>
            <div className="form-group"><label className="label">Assignment Name</label><input className="input" placeholder="e.g. Lab Report" value={newA.name} onChange={e=>setNewA({...newA,name:e.target.value})}/></div>
            <div className="form-group"><label className="label">Subject</label><input className="input" placeholder="e.g. PHY102" value={newA.subject} onChange={e=>setNewA({...newA,subject:e.target.value})}/></div>
            <div className="form-group"><label className="label">Deadline</label><input className="input" type="date" value={newA.deadline} onChange={e=>setNewA({...newA,deadline:e.target.value})}/></div>
            <div className="form-group">
              <label className="label">Priority</label>
              <select className="input" value={newA.priority} onChange={e=>setNewA({...newA,priority:e.target.value})}>
                {['High','Medium','Low'].map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{if(newA.name&&newA.deadline){setItems([{id:Date.now(),...newA,done:false},...items]);setShowModal(false);setNewA({name:'',subject:'',deadline:'',priority:'Medium'});}}}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
