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


git init
git add .
git commit -m "Initial CampusGenius backend"
git remote add origin https://github.com/YOUR_USERNAME/campusgenius-backend.git
git push -u origin main
```

**Step 2 — MongoDB Atlas (Free Cloud DB)**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) → Create free cluster
2. Create a database user (username + password)
3. Under Network Access → Add IP `0.0.0.0/0` (allow all)
4. Get your connection string: `mongodb+srv://user:pass@cluster.mongodb.net/campusgenius`

**Step 3 — Deploy on Render**
1. Go to [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Add Environment Variables:
   - `MONGO_URI` → your Atlas connection string
   - `JWT_SECRET` → a long random string
   - `NODE_ENV` → `production`
5. Click **Deploy** — you get a live URL like `https://campusgenius-api.onrender.com`

---

## Quick API Reference

| Method | Endpoint | Auth? | Description |
|--------|----------|-------|-------------|
| POST | `/api/auth/signup` | ❌ | Register |
| POST | `/api/auth/login` | ❌ | Login → get token |
| GET | `/api/auth/me` | ✅ | My profile |
| GET | `/api/notes` | ✅ | All my notes |
| POST | `/api/notes` | ✅ | Create note |
| DELETE | `/api/notes/:id` | ✅ | Delete note |
| GET | `/api/attendance` | ✅ | All subjects |
| POST | `/api/attendance` | ✅ | Add subject |
| PUT | `/api/attendance/:id` | ✅ | Update % |
| GET | `/api/assignments/upcoming` | ✅ | Upcoming tasks |
| POST | `/api/assignments` | ✅ | Add assignment |
| PUT | `/api/assignments/:id/complete` | ✅ | Mark done |
| GET | `/api/finance` | ✅ | All expenses + summary |
| POST | `/api/finance` | ✅ | Add expense |
| GET | `/api/finance/summary` | ✅ | Monthly breakdown |
| POST | `/api/planner/generate` | ✅ | Generate study plan |
| POST | `/api/planner/tips` | ✅ | Get subject tips |

**Auth header format for protected routes:**
```
Authorization: Bearer YOUR_JWT_TOKEN_HERE








module.exports = router;
