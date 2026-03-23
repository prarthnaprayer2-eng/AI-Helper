const { React, useState, useEffect } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;
const { daysUntil, getToday } = window.utils.dateHelpers;
const { getCurrentUser } = window.utils.auth;

export function Dashboard({ assignments, attendance, notifications }) {
  const today = getToday();
  const user = getCurrentUser();
  const pending = assignments.filter(a => !a.done).length;
  const overallAtt = Math.round(attendance.reduce((s,a) => s + a.present/a.total, 0) / attendance.length * 100);
  const lowAtt = attendance.filter(a => a.present/a.total * 100 < 75).length;
  const streak = 7;

  const [aiTip, setAiTip] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    setAiLoading(true);
    callAI(
      `Give me 2–3 short, actionable study tips for today. I have ${pending} pending assignments, ${lowAtt} subject(s) with low attendance, and a 7-day study streak. Be very concise, use bullet points.`,
      "You are an AI academic advisor. Give short, encouraging and specific advice."
    ).then(r => { setAiTip(r); setAiLoading(false); });
  }, []);

  return (
    <div className="fade-in">
      <div style={{marginBottom:24}}>
        <p style={{color:'var(--text2)',fontSize:14}}>Good morning, {user?.name || 'Student'} 👋 — {today.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</p>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:26,fontWeight:800,marginTop:4}}>Your Academic Dashboard</h2>
      </div>

      <div className="grid-4" style={{marginBottom:20}}>
        {[
          {icon:'📝', label:'Pending Tasks', value:pending, sub:'assignments due', color:'var(--amber-bg)', iconColor:'var(--amber)'},
          {icon:'📊', label:'Avg Attendance', value:`${overallAtt}%`, sub:`${lowAtt} subjects at risk`, color:'var(--blue-bg)', iconColor:'var(--blue)'},
          {icon:'🔥', label:'Study Streak', value:`${streak}d`, sub:'keep it going!', color:'var(--pink-bg)', iconColor:'var(--pink)'},
          {icon:'🏆', label:'Productivity', value:'78', sub:'score this week', color:'var(--green-bg)', iconColor:'var(--green)'},
        ].map((s,i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{background:s.color}}>
              <span>{s.icon}</span>
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value" style={{color:s.iconColor}}>{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:20}}>
        {/* Today's AI Tip */}
        <div className="card">
          <div className="card-title">✦ AI Insights for Today</div>
          {aiLoading ? <LoadingDots/> : (
            <div className="ai-box">
              <div className="ai-label">Personalized for you</div>
              <div className="ai-text">{aiTip}</div>
            </div>
          )}
        </div>

        {/* Upcoming Deadlines */}
        <div className="card">
          <div className="card-title">⏰ Upcoming Deadlines</div>
          {assignments.filter(a=>!a.done).slice(0,4).map(a => {
            const d = daysUntil(a.deadline);
            const col = d<=2?'var(--red)':d<=5?'var(--amber)':'var(--green)';
            return (
              <div key={a.id} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:col,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:13.5,fontWeight:500}}>{a.name}</div>
                  <div style={{fontSize:11,color:'var(--text2)'}}>{a.subject}</div>
                </div>
                <div style={{fontSize:12,fontWeight:600,color:col}}>{d<=0?'Today!':d===1?'Tomorrow':`${d}d`}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2">
        {/* Streak Calendar */}
        <div className="card">
          <div className="card-title">🔥 Weekly Streak</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:16}}>
            {['M','T','W','T','F','S','S'].map((d,i) => (
              <div key={i} className="streak-day" style={{background:i<5?'var(--accent)':i===5?'var(--accent)':'var(--bg3)',color:i<6?'#fff':'var(--text3)'}}>
                {d}
              </div>
            ))}
          </div>
          <div style={{fontSize:13,color:'var(--text2)'}}>🎯 7-day streak! You're in the top 15% of students this week.</div>
          <div style={{marginTop:14}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--text2)',marginBottom:6}}>
              <span>Weekly Goal</span><span>78 / 100 pts</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-bar" style={{width:'78%',background:'linear-gradient(90deg,var(--accent),var(--pink))'}}/>
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="card">
          <div className="card-title">📊 Attendance Overview</div>
          {attendance.slice(0,4).map(a => {
            const pct = Math.round(a.present/a.total*100);
            const col = pct<75?'var(--red)':pct<85?'var(--amber)':'var(--green)';
            return (
              <div key={a.id} style={{marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                  <span style={{color:'var(--text2)'}}>{a.subject}</span>
                  <span style={{fontWeight:600,color:col}}>{pct}%</span>
                </div>
                <div className="progress-wrap">
                  <div className="progress-bar" style={{width:`${pct}%`,background:col}}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
