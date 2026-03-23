// Initial application data

export const initAssignments = [
  { id:1, name:"Data Structures Assignment 3", subject:"CS101", deadline:"2025-07-08", priority:"High", done:false },
  { id:2, name:"Economics Essay – Market Failures", subject:"ECO201", deadline:"2025-07-12", priority:"Medium", done:false },
  { id:3, name:"Physics Lab Report", subject:"PHY102", deadline:"2025-07-05", priority:"High", done:true },
  { id:4, name:"Math Problem Set 5", subject:"MAT201", deadline:"2025-07-15", priority:"Low", done:false },
];

export const initAttendance = [
  { id:1, subject:"Data Structures", present:38, total:45 },
  { id:2, subject:"Economics", present:28, total:40 },
  { id:3, subject:"Physics", present:35, total:38 },
  { id:4, subject:"Mathematics", present:42, total:44 },
  { id:5, subject:"English", present:18, total:30 },
];

export const initSchedule = [
  { time:"07:30", label:"Morning Run", color:"var(--green)", type:"personal" },
  { time:"09:00", label:"Data Structures", color:"var(--accent)", type:"class", room:"Room 201" },
  { time:"11:00", label:"Economics Lecture", color:"var(--blue)", type:"class", room:"Auditorium A" },
  { time:"13:00", label:"Lunch Break", color:"var(--amber)", type:"personal" },
  { time:"14:30", label:"Physics Lab", color:"var(--pink)", type:"class", room:"Lab 3" },
  { time:"17:00", label:"Self Study", color:"var(--teal)", type:"study" },
  { time:"20:00", label:"Assignment Work", color:"var(--accent)", type:"study" },
];

export const initNotes = [
  { id:1, title:"Sorting Algorithms – Big O", subject:"CS101", content:"Bubble Sort: O(n²) worst case\nMerge Sort: O(n log n) always\nQuick Sort: O(n log n) average, O(n²) worst\nHeap Sort: O(n log n) always\n\nKey insight: Merge sort is stable, quick sort is in-place.", tags:["algorithms","exams"], date:"Jun 28" },
  { id:2, title:"Demand & Supply Curves", subject:"ECO201", content:"Law of Demand: As price increases, quantity demanded decreases (inverse relationship).\nLaw of Supply: As price increases, quantity supplied increases.\n\nEquilibrium: Point where supply meets demand.", tags:["economics","basics"], date:"Jun 27" },
  { id:3, title:"Newton's Laws Summary", subject:"PHY102", content:"1st Law: Object at rest stays at rest unless acted upon by external force.\n2nd Law: F = ma\n3rd Law: Every action has equal and opposite reaction.", tags:["physics","newton"], date:"Jun 25" },
];

export const initExpenses = [
  { id:1, name:"Canteen Lunch", cat:"Food", amount:120, icon:"🍱", color:"var(--amber-bg)", date:"Today" },
  { id:2, name:"Metro Card Recharge", cat:"Travel", amount:200, icon:"🚇", color:"var(--blue-bg)", date:"Yesterday" },
  { id:3, name:"Textbook – Algorithms", cat:"Education", amount:450, icon:"📗", color:"var(--green-bg)", date:"Jun 30" },
  { id:4, name:"Movie – Weekend", cat:"Entertainment", amount:350, icon:"🎬", color:"var(--pink-bg)", date:"Jun 29" },
  { id:5, name:"Groceries", cat:"Food", amount:580, icon:"🛒", color:"var(--amber-bg)", date:"Jun 28" },
];

export const NAV = [
  {id:'dashboard',icon:'⊞',label:'Dashboard'},
  {id:'notes',icon:'📚',label:'Notes'},
  {id:'attendance',icon:'📊',label:'Attendance'},
  {id:'assignments',icon:'⏰',label:'Assignments'},
  {id:'planner',icon:'🤖',label:'AI Planner'},
  {id:'schedule',icon:'🗓️',label:'Schedule'},
  {id:'calendar',icon:'📅',label:'Calendar'},
  {id:'finance',icon:'💰',label:'Finance'},
  {id:'notifications',icon:'🔔',label:'Notifications'},
];

export const PAGE_TITLES = {
  dashboard:'Dashboard',
  notes:'Smart Notes',
  attendance:'Attendance Tracker',
  assignments:'Assignments',
  planner:'AI Study Planner',
  schedule:'Daily Schedule',
  calendar:'Monthly Calendar',
  finance:'Finance Tracker',
  notifications:'Notifications'
};
