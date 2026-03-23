const { React, useState } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;
const { daysUntil } = window.utils.dateHelpers;

export function Notifications({ assignments, attendance }) {
  const pending = assignments.filter(a=>!a.done&&daysUntil(a.deadline)<=3);
  const lowAtt = attendance.filter(a=>a.present/a.total*100<75);
  const [aiDigest, setAiDigest] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const getDigest = async () => {
    setAiLoading(true);
    const r = await callAI(
      `Generate a motivating daily digest for a college student. They have ${pending.length} urgent deadlines, ${lowAtt.length} subjects with low attendance, and a 7-day study streak. Make it encouraging, practical, and under 100 words.`,
      "You are a supportive AI academic coach. Be warm, concise, and action-oriented."
    );
    setAiDigest(r);
    setAiLoading(false);
  };

  const notifs = [
    ...pending.map(a=>({icon:'⏰',title:`Assignment due soon: ${a.name}`,body:`${a.subject} — due in ${daysUntil(a.deadline)} day(s)`,time:'Just now',color:'var(--red-bg)',iconColor:'var(--red)'})),
    ...lowAtt.map(a=>({icon:'📊',title:`Low attendance: ${a.subject}`,body:`Your attendance is ${Math.round(a.present/a.total*100)}% — below the 75% threshold`,time:'Today',color:'var(--amber-bg)',iconColor:'var(--amber)'})),
    {icon:'🔥',title:'Study streak: 7 days!',body:"You've studied 7 days in a row. Keep it up — you're in the top 15% of your batch!",time:'This week',color:'var(--pink-bg)',iconColor:'var(--pink)'},
    {icon:'💡',title:'Study tip',body:"You have 3 deadlines this week. Focus on Data Structures first — it has the highest priority.",time:'AI suggestion',color:'rgba(108,99,255,0.12)',iconColor:'var(--accent)'},
  ];

  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700}}>🔔 Notifications</h2>
        <button className="btn btn-ghost btn-sm" onClick={getDigest}>✦ AI Daily Digest</button>
      </div>

      {aiDigest && (
        <div className="ai-box" style={{marginBottom:20}}>
          <div className="ai-label">Your AI daily digest</div>
          {aiLoading?<LoadingDots/>:<div className="ai-text">{aiDigest}</div>}
        </div>
      )}

      {notifs.map((n,i)=>(
        <div key={i} className="notif-item">
          <div className="notif-icon-wrap" style={{background:n.color}}>
            <span style={{fontSize:18}}>{n.icon}</span>
          </div>
          <div>
            <div className="notif-title">{n.title}</div>
            <div className="notif-body">{n.body}</div>
            <div className="notif-time">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
