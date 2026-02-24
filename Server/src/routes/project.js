const router = require('express').Router();

// Get all projects (useful for a dashboard or list view)
router.get("/getall", fetchAllProjects);

// Get a single project by ID (useful for a "Details" page)
router.get("/getproject/:id", fetchSingleProject);

router.post("/create", createProject);
router.put("/update/:id", updateProject); // Conventionally uses PUT or PATCH
router.delete("/delete/:id", deleteProject);

module.exports = router;