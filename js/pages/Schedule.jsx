const { React, useState } = window;

export function Schedule() {
  const { initSchedule } = window.utils.data;
  const today = new Date();
  const [items, setItems] = useState(initSchedule);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({time:'09:00',label:'',color:'var(--accent)',type:'class',room:''});

  const typeColors = {class:'var(--accent)',personal:'var(--green)',study:'var(--teal)',gym:'var(--pink)'};

  return (
    <div className="fade-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700}}>🗓️ Daily Schedule</h2>
        <button className="btn btn-primary" onClick={()=>setShowModal(true)}>+ Add Event</button>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Today — {today.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})}</div>
          {[...items].sort((a,b)=>a.time.localeCompare(b.time)).map((s,i) => (
            <div key={i} className="schedule-item">
              <div className="schedule-time">{s.time}</div>
              <div className="schedule-dot" style={{background:typeColors[s.type]||s.color}}/>
              <div>
                <div className="schedule-event">{s.label}</div>
                {s.room && <div className="schedule-sub">📍 {s.room}</div>}
                <span className="badge badge-purple" style={{marginTop:4}}>{s.type}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">📊 Time Distribution</div>
          <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
            {['class','study','personal','gym'].map(type => {
              const count = items.filter(s=>s.type===type).length;
              const pct = Math.round(count/items.length*100);
              const col = typeColors[type];
              return (
                <div key={type}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                    <span style={{color:'var(--text2)',textTransform:'capitalize'}}>{type}</span>
                    <span style={{fontWeight:600}}>{count} slots</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{width:`${pct}%`,background:col}}/>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:20,padding:12,background:'var(--bg3)',borderRadius:'var(--radius-sm)',fontSize:13,color:'var(--text2)'}}>
            💡 You have <strong style={{color:'var(--text)'}}>2 free slots</strong> today — perfect for getting ahead on assignments!
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal">
            <div className="modal-title">New Schedule Event</div>
            <div className="form-group"><label className="label">Time</label><input className="input" type="time" value={newItem.time} onChange={e=>setNewItem({...newItem,time:e.target.value})}/></div>
            <div className="form-group"><label className="label">Event Name</label><input className="input" placeholder="e.g. Physics Lecture" value={newItem.label} onChange={e=>setNewItem({...newItem,label:e.target.value})}/></div>
            <div className="form-group">
              <label className="label">Type</label>
              <select className="input" value={newItem.type} onChange={e=>setNewItem({...newItem,type:e.target.value})}>
                {['class','study','personal','gym'].map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="label">Room / Location (optional)</label><input className="input" placeholder="e.g. Room 201" value={newItem.room} onChange={e=>setNewItem({...newItem,room:e.target.value})}/></div>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={()=>{if(newItem.label){setItems([...items,newItem]);setShowModal(false);setNewItem({time:'09:00',label:'',color:'var(--accent)',type:'class',room:''});}}}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
