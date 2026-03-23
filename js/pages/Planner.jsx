const { React, useState } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;

export function Planner({ assignments }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [planType, setPlanType] = useState('daily');
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setPlan("");
    const pending = assignments.filter(a=>!a.done);
    const r = await callAI(
      `Create a ${planType} study plan for a college student. Pending assignments: ${pending.map(a=>`${a.name} (${a.subject}, due ${a.deadline}, ${a.priority} priority)`).join('; ')}. Include time blocks, breaks, and specific tasks. Format it clearly with time slots.`,
      "You are an expert study planner. Create realistic, efficient schedules with Pomodoro-style time blocks."
    );
    setPlan(r);
    setLoading(false);
  };

  const sendChat = async () => {
    if (!msg.trim()) return;
    const userMsg = msg;
    setMsg("");
    const newChat = [...chat, {role:'user',content:userMsg}];
    setChat(newChat);
    setChatLoading(true);
    const r = await callAI(
      `Student question: ${userMsg}\n\nContext: They have these pending assignments: ${assignments.filter(a=>!a.done).map(a=>a.name).join(', ')}`,
      "You are a helpful AI study buddy for college students. Be supportive, practical and concise."
    );
    setChat([...newChat, {role:'assistant',content:r}]);
    setChatLoading(false);
  };

  return (
    <div className="fade-in">
      <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700,marginBottom:20}}>🤖 AI Study Planner</h2>

      <div className="grid-2">
        <div>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-title">Generate Study Plan</div>
            <div className="tabs">
              {['daily','weekly'].map(t=><div key={t} className={`tab ${planType===t?'active':''}`} onClick={()=>setPlanType(t)} style={{textTransform:'capitalize'}}>{t}</div>)}
            </div>
            <button className="btn btn-primary" style={{width:'100%'}} onClick={generate}>
              {loading ? 'Generating…' : `✦ Generate ${planType.charAt(0).toUpperCase()+planType.slice(1)} Plan`}
            </button>
            {loading && <div style={{textAlign:'center',marginTop:16}}><LoadingDots/></div>}
            {plan && (
              <div className="ai-box" style={{marginTop:16}}>
                <div className="ai-label">Your {planType} plan</div>
                <div className="ai-text" style={{maxHeight:300,overflowY:'auto'}}>{plan}</div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-title">💬 AI Study Assistant</div>
          <div style={{height:280,overflowY:'auto',marginBottom:12,display:'flex',flexDirection:'column',gap:10}}>
            {chat.length===0 && (
              <div style={{textAlign:'center',color:'var(--text3)',fontSize:13,marginTop:60}}>
                Ask me anything about studying, schedules, or your assignments!
              </div>
            )}
            {chat.map((m,i)=>(
              <div key={i} style={{display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}}>
                <div style={{maxWidth:'80%',padding:'9px 13px',borderRadius:12,background:m.role==='user'?'var(--accent)':'var(--bg3)',color:m.role==='user'?'#fff':'var(--text)',fontSize:13,lineHeight:1.6}}>
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && <div style={{alignSelf:'flex-start',background:'var(--bg3)',padding:'9px 13px',borderRadius:12}}><LoadingDots/></div>}
          </div>
          <div style={{display:'flex',gap:8}}>
            <input className="input" placeholder="Ask the AI…" value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendChat()}/>
            <button className="btn btn-primary" onClick={sendChat}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
