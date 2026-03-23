const { React, useState, useEffect, useRef } = window;
const { LoadingDots } = window.components;
const { callAI } = window.utils.ai;

export function Attendance() {
  const { initAttendance } = window.utils.data;
  const [subjects, setSubjects] = useState(initAttendance);
  const [showModal, setShowModal] = useState(false);
  const [newSub, setNewSub] = useState({subject:'',present:0,total:0});
  const [aiAdvice, setAiAdvice] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const low = subjects.filter(s => s.present/s.total*100 < 75);

  useEffect(() => {
    if (low.length > 0) {
      setAiLoading(true);
      callAI(
        `I have low attendance in: ${low.map(s=>`${s.subject} (${Math.round(s.present/s.total*100)}%)`).join(', ')}. Give me specific advice on how to improve attendance and what to do about missed classes.`,
        "You are an academic advisor. Be practical and encouraging."
      ).then(r => { setAiAdvice(r); setAiLoading(false); });
    }
  }, []);

  const mark = (id, type) => {
    setSubjects(subjects.map(s => s.id===id ? {
      ...s,
      present: type==='present' ? s.present+1 : s.present,
      total: s.total+1
    } : s));
  };

  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const existing = window.Chart.getChart(canvasRef.current);
    if (existing) existing.destroy();
    new window.Chart(canvasRef.current, {
      type:'bar',
      data:{
        labels: subjects.map(s=>s.subject.split(' ')[0]),
        datasets:[{
          label:'Attendance %',
          data: subjects.map(s=>Math.round(s.present/s.total*100)),
          backgroundColor: subjects.map(s => Math.round(s.present/s.total*100)<75?'rgba(239,68,68,0.7)':'rgba(108,99,255,0.7)'),
          borderRadius:6, borderSkipped:false
        }]
      },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{y:{min:0,max:100,grid:{color:'rgba(255,255,255,0.05)'},ticks:{color:'#8b91a8',callback:v=>v+'%'}},x:{grid:{display:false},ticks:{color:'#8b91a8'}}}}
    });
  }, [subjects]);

  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700}}>📊 Attendance Tracker</h2>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Subject</button>
      </div>

      {low.length > 0 && (
        <div style={{background:'var(--red-bg)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'var(--radius)',padding:14,marginBottom:20,display:'flex',gap:10,alignItems:'flex-start'}}>
          <span style={{fontSize:20}}>⚠️</span>
          <div>
            <div style={{fontWeight:600,color:'var(--red)',marginBottom:3}}>Low Attendance Alert</div>
            <div style={{fontSize:13,color:'var(--text2)'}}>
              {low.map(s=>`${s.subject} (${Math.round(s.present/s.total*100)}%)`).join(' • ')} — below 75% threshold
            </div>
          </div>
        </div>
      )}

      <div className="grid-2" style={{marginBottom:20}}>
        <div className="card">
          <div className="card-title">📈 Attendance Chart</div>
          <div style={{height:200}}>
            <canvas ref={canvasRef}/>
          </div>
        </div>
        {aiAdvice && (
          <div className="card">
            <div className="card-title">✦ AI Recovery Plan</div>
            <div className="ai-box">
              <div className="ai-label">Personalized advice</div>
              {aiLoading ? <LoadingDots/> : <div className="ai-text">{aiAdvice}</div>}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-title">🎓 Subjects</div>
        {subjects.map(s => {
          const pct = Math.round(s.present/s.total*100);
          const col = pct<75?'var(--red)':pct<85?'var(--amber)':'var(--green)';
          return (
            <div key={s.id} className="attendance-row">
              <div style={{flex:1}}>
                <div className="attendance-subject">{s.subject}</div>
                <div style={{fontSize:11,color:'var(--text2)',marginBottom:6}}>{s.present}/{s.total} classes • Need {Math.max(0,Math.ceil((0.75*s.total-s.present)/0.25))} more to reach 75%</div>
                <div className="progress-wrap">
                  <div className="progress-bar" style={{width:`${pct}%`,background:col}}/>
                </div>
              </div>
              <div className="attendance-pct" style={{color:col,marginLeft:16}}>{pct}%</div>
              <div className="attendance-actions">
                <button className="btn btn-ghost btn-sm" onClick={()=>mark(s.id,'present')} style={{color:'var(--green)'}}>✓ Present</button>
                <button className="btn btn-ghost btn-sm" onClick={()=>mark(s.id,'absent')} style={{color:'var(--red)'}}>✗ Absent</button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal">
            <div className="modal-title">Add Subject</div>
            {[{label:'Subject Name',key:'subject',type:'text',ph:'e.g. Algorithms'},{label:'Classes Attended',key:'present',type:'number',ph:'0'},{label:'Total Classes',key:'total',type:'number',ph:'0'}].map(f=>(
              <div key={f.key} className="form-group">
                <label className="label">{f.label}</label>
                <input className="input" type={f.type} placeholder={f.ph} value={newSub[f.key]} onChange={e=>setNewSub({...newSub,[f.key]:f.type==='number'?+e.target.value:e.target.value})}/>
              </div>
            ))}
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{if(newSub.subject&&newSub.total>0){setSubjects([...subjects,{id:Date.now(),...newSub}]);setShowModal(false);setNewSub({subject:'',present:0,total:0});}}}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
