const router = require('express').Router();
const { fetchAllProjects, createProject, updateProject, deleteProject, fetchSingleProject } = require('../controllers/project');
const { validateCreateProject, validateUpdateProject, handleValidationErrors } = require('../middlewares/projectValidation');
const authenticateToken = require('../middlewares/AuthenticateToken');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
dotenv.config();


// Looser limit for viewing data (e.g., 100 requests per 15 minutes)
const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    standardHeaders: 'draft-8', // Returns modern RateLimit headers
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
});

// Stricter limit for creating/modifying data (e.g., 20 requests per hour)
const mutationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 20, 
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: "You can only create/update 20 projects per hour." }
});

const FrontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

// Apply CORS middleware to all routes in this router
router.use(cors({ origin: FrontendURL }));

// GET /api/projects/ -> Fetches all projects
router.get("/", authenticateToken, standardLimiter, fetchAllProjects);

// GET /api/projects/:id -> Fetches a single project
// router.get("/:id", authenticateToken, standardLimiter, fetchSingleProject);

// POST /api/projects/ -> Creates a new project
router.post("/", authenticateToken, mutationLimiter, validateCreateProject, handleValidationErrors, createProject);

// PUT /api/projects/:id -> Updates a project
router.put("/:id", authenticateToken, mutationLimiter, validateUpdateProject, handleValidationErrors, updateProject); 

// DELETE /api/projects/:id -> Deletes a project
router.delete("/:id", authenticateToken, mutationLimiter, deleteProject);

module.exports = router;