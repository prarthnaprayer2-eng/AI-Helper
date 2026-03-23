const { React, useState } = window;
const { daysUntil } = window.utils.dateHelpers;

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const [events] = useState([
    {date:new Date(2025,6,8),label:'DS Assignment Due',color:'var(--red)'},
    {date:new Date(2025,6,12),label:'Eco Essay',color:'var(--amber)'},
    {date:new Date(2025,6,15),label:'Math Exam',color:'var(--pink)'},
    {date:new Date(2025,6,20),label:'Physics Viva',color:'var(--accent)'},
    {date:new Date(2025,6,25),label:'Project Submission',color:'var(--green)'},
  ]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();
  const days = [];
  for (let i=0; i<firstDay; i++) days.push(null);
  for (let d=1; d<=daysInMonth; d++) days.push(d);

  const monthName = currentDate.toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  const isToday = d => d && today.getDate()===d && today.getMonth()===month && today.getFullYear()===year;
  const eventsOn = d => events.filter(e => e.date.getDate()===d && e.date.getMonth()===month);

  return (
    <div className="fade-in">
      <h2 style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:700,marginBottom:20}}>📅 Monthly Timetable</h2>

      <div className="grid-2">
        <div className="card">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <button className="btn btn-ghost btn-sm" onClick={()=>setCurrentDate(new Date(year,month-1,1))}>◀</button>
            <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:16}}>{monthName}</div>
            <button className="btn btn-ghost btn-sm" onClick={()=>setCurrentDate(new Date(year,month+1,1))}>▶</button>
          </div>
          <div className="cal-grid">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><div key={d} className="cal-day-header">{d}</div>)}
            {days.map((d,i) => (
              <div key={i} className={`cal-cell ${isToday(d)?'active':''} ${!d?'':''}`} style={{position:'relative'}}>
                {d && <span>{d}</span>}
                {d && eventsOn(d).map((ev,j)=>(
                  <div key={j} className="cal-event-dot" style={{background:ev.color}}/>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">📌 Events this Month</div>
          {events.filter(e=>e.date.getMonth()===month).map((ev,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:ev.color,flexShrink:0}}/>
              <div>
                <div style={{fontSize:13.5,fontWeight:500}}>{ev.label}</div>
                <div style={{fontSize:12,color:'var(--text2)'}}>{ev.date.toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short'})}</div>
              </div>
              <div style={{marginLeft:'auto',fontSize:12,fontWeight:600,color:ev.color}}>
                {daysUntil(ev.date)<=0?'Today':daysUntil(ev.date)===1?'Tomorrow':`In ${daysUntil(ev.date)}d`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
