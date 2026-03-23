routes/noteRoutes.js
js
const express = require("express");
const router = express.Router();
const { getNotes, createNote, getNoteById, deleteNote } = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect); // All note routes require login

router.get("/", getNotes);
router.post("/", createNote);
router.get("/:id", getNoteById);
router.delete("/:id", deleteNote);

module.exports = router;

routes/attendanceRoutes.js
const express = require("express");
const router = express.Router();
const { getAttendance, addSubject, updateAttendance, deleteSubject } = require("../controllers/attendanceController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getAttendance);
router.post("/", addSubject);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteSubject);

routes/assignmentRoutes.js
const express = require("express");
const router = express.Router();
const { getAssignments, getUpcoming, createAssignment, toggleComplete, deleteAssignment } = require("../controllers/assignmentController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getAssignments);
router.get("/upcoming", getUpcoming);
router.post("/", createAssignment);
router.put("/:id/complete", toggleComplete);
router.delete("/:id", deleteAssignment);

module.exports = router;

routes/financeRoutes.js
const express = require("express");
const router = express.Router();
const { getExpenses, addExpense, deleteExpense, getMonthlySummary } = require("../controllers/financeController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);routes/plannerRoutes.js


router.get("/", getExpenses);
router.get("/summary", getMonthlySummary);
router.post("/", addExpense);
router.delete("/:id", deleteExpense);

module.exports = router;

const express = require("express");
const router = express.Router();
const { generatePlan, getStudyTips } = require("../controllers/plannerController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.post("/generate", generatePlan);
router.post("/tips", getStudyTips);

module.exports = router;
```

---
routes/plannerRoutes.js

## Complete Project Structure
```
campusgenius-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── noteController.js
│   ├── attendanceController.js
│   ├── assignmentController.js
│   ├── financeController.js
│   └── plannerController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   ├── Note.js
│   ├── Attendance.js
│   ├── Assignment.js
│   └── Expense.js
├── routes/
│   ├── authRoutes.js
│   ├── noteRoutes.js
│   ├── attendanceRoutes.js
│   ├── assignmentRoutes.js
│   ├── financeRoutes.js
│   └── plannerRoutes.js
├── .env.example
├── package.json
└── server.js

# 1. Clone/create the project folder and cd into it

# 2. Install dependencies
npm install

# 3. Copy the env file and fill in your values
cp .env.example .env
# Edit .env: set MONGO_URI and JWT_SECRET

# 4. Start development server (with auto-reload)
npm run dev

# OR start production server
npm start








module.exports = router;
