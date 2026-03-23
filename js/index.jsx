// Attach utils to window
window.utils = {
  ai: {},
  dateHelpers: {},
  data: {},
  auth: {}
};

window.components = {};
window.pages = {};

// Import utilities
Promise.all([
  import('./utils/dateHelpers.js'),
  import('./utils/ai.js'),
  import('./utils/data.js'),
  import('./utils/auth.js'),
]).then(([dateHelpers, ai, data, auth]) => {
  window.utils.dateHelpers = dateHelpers;
  window.utils.ai = ai;
  window.utils.data = data;
  window.utils.auth = auth;
  
  // Now load components
  return Promise.all([
    import('./components/LoadingDots.jsx'),
    import('./components/ProgressRing.jsx'),
  ]);
}).then(([LoadingDots, ProgressRing]) => {
  window.components = {
    LoadingDots: LoadingDots.LoadingDots,
    ProgressRing: ProgressRing.ProgressRing,
  };
  
  // Now load pages
  return Promise.all([
    import('./pages/Dashboard.jsx'),
    import('./pages/Notes.jsx'),
    import('./pages/Attendance.jsx'),
    import('./pages/Assignments.jsx'),
    import('./pages/Planner.jsx'),
    import('./pages/Schedule.jsx'),
    import('./pages/Calendar.jsx'),
    import('./pages/Finance.jsx'),
    import('./pages/Notifications.jsx'),
    import('./pages/Login.jsx'),
  ]);
}).then(([
  Dashboard,
  Notes,
  Attendance,
  Assignments,
  Planner,
  Schedule,
  Calendar,
  Finance,
  Notifications,
  Login
]) => {
  window.pages = {
    Dashboard: Dashboard.Dashboard,
    Notes: Notes.Notes,
    Attendance: Attendance.Attendance,
    Assignments: Assignments.Assignments,
    Planner: Planner.Planner,
    Schedule: Schedule.Schedule,
    CalendarView: Calendar.CalendarView,
    Finance: Finance.Finance,
    Notifications: Notifications.Notifications,
    Login: Login.Login,
  };
  
  // Now load and render the main app
  return import('./App.jsx');
}).then(({ App }) => {
  const { ReactDOM } = window;
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}).catch(err => {
  console.error('Failed to load app:', err);
});
