const { React, useState, useEffect } = window;

// Import all pages
const { Dashboard } = window.pages;
const { Notes } = window.pages;
const { Attendance } = window.pages;
const { Assignments } = window.pages;
const { Planner } = window.pages;
const { Schedule } = window.pages;
const { CalendarView } = window.pages;
const { Finance } = window.pages;
const { Notifications } = window.pages;

const { NAV, PAGE_TITLES, initAssignments, initAttendance } = window.utils.data;
const { isAuthenticated, getCurrentUser, logoutUser } = window.utils.auth;

export function App() {
  const [page, setPage] = useState('dashboard');
  const [dark, setDark] = useState(true);
  const [assignments, setAssignments] = useState(initAssignments);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());

  // Check if user is authenticated, redirect to login if not
  if (!isAuthenticated()) {
    window.location.href = './login.html';
    return null;
  }

  // Handle theme
  useEffect(()=>{
    document.body.className = dark ? '' : 'light';
  },[dark]);

  const handleLogout = () => {
    logoutUser();
    window.location.href = './login.html';
  };

  const { daysUntil } = window.utils.dateHelpers;
  const pendingCount = assignments.filter(a=>!a.done&&daysUntil(a.deadline)<=3).length;

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen?'open':''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">🎓</div>
          <div><div className="logo-text">AI College</div><div className="logo-sub">Helper</div></div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-label">Main</div>
          {NAV.slice(0,1).map(n=>(
            <div key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>{setPage(n.id);setSidebarOpen(false);}}>
              <span className="nav-icon">{n.icon}</span>{n.label}
            </div>
          ))}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-label">Academic</div>
          {NAV.slice(1,6).map(n=>(
            <div key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>{setPage(n.id);setSidebarOpen(false);}}>
              <span className="nav-icon">{n.icon}</span>{n.label}
              {n.id==='assignments'&&pendingCount>0&&<span className="nav-badge">{pendingCount}</span>}
            </div>
          ))}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-label">Life</div>
          {NAV.slice(6).map(n=>(
            <div key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>{setPage(n.id);setSidebarOpen(false);}}>
              <span className="nav-icon">{n.icon}</span>{n.label}
              {n.id==='notifications'&&<span className="nav-badge">{pendingCount+2}</span>}
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <div className="theme-toggle" onClick={()=>setDark(!dark)}>
            <span style={{fontSize:13}}>{dark?'🌙 Dark mode':'☀️ Light mode'}</span>
            <div className={`toggle-switch ${dark?'on':''}`}><div className="toggle-knob"/></div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="main">
        <div className="topbar">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button className="notif-btn" style={{display:'none'}} onClick={()=>setSidebarOpen(!sidebarOpen)}>☰</button>
            <div className="topbar-title">{PAGE_TITLES[page]}</div>
          </div>
          <div className="topbar-right">
            <div className="notif-btn" onClick={()=>setPage('notifications')}>🔔<div className="notif-dot"/></div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{textAlign:'right',fontSize:13}}>
                <div style={{fontWeight:600,color:'var(--text1)'}}>{user?.name}</div>
                <div style={{color:'var(--text2)',fontSize:11}}>{user?.email}</div>
              </div>
              <div style={{position:'relative',group:'hover'}}>
                <div className="topbar-avatar">{user?.name?.charAt(0) || 'U'}</div>
                <button 
                  onClick={handleLogout}
                  style={{
                    position:'absolute',
                    right:0,
                    top:'100%',
                    marginTop:8,
                    padding:'8px 12px',
                    background:'#ef4444',
                    color:'white',
                    border:'none',
                    borderRadius:'6px',
                    fontSize:12,
                    fontWeight:500,
                    cursor:'pointer',
                    whiteSpace:'nowrap',
                    transition:'all 0.2s',
                    opacity:0,
                    pointerEvents:'none',
                    boxShadow:'var(--shadow-sm)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.pointerEvents = 'auto';
                    e.target.style.background = '#dc2626';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0';
                    e.target.style.pointerEvents = 'none';
                    e.target.style.background = '#ef4444';
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          {page==='dashboard' && <Dashboard assignments={assignments} attendance={initAttendance} notifications={[]}/>}
          {page==='notes' && <Notes/>}
          {page==='attendance' && <Attendance/>}
          {page==='assignments' && <Assignments/>}
          {page==='planner' && <Planner assignments={assignments}/>}
          {page==='schedule' && <Schedule/>}
          {page==='calendar' && <CalendarView/>}
          {page==='finance' && <Finance/>}
          {page==='notifications' && <Notifications assignments={assignments} attendance={initAttendance}/>}
        </div>
      </div>
    </>
  );
}
