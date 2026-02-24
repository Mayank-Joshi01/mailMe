const Project = require("../models/Project");
const crypto = require('crypto');


// 1. Get All Projects (Read)
const fetchAllProjects = async (req, res) => {
    try {
        // Find projects where the user matches the logged-in user ID
        const projects = await Project.find({ ownerId: req.user.id });
        res.json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// 2. Create a New Project (Create)
const createProject = async (req, res) => {
    const { name, description, allowedDomain, targetEmail } = req.body;
    try {
        // 1. Check for existing project with the same name for this user (Optional but good UX) , Single DB Call
        const existingProject = await Project.findOne({ name, ownerId: req.user.id });

        if (existingProject) {
                    return res.status(400).json({ error: "A project with this name already exists for the user." });
        }

        // Generate 8 random bytes and convert to hex (16 characters total)
        const publicId = crypto.randomBytes(8).toString('hex');

        const project = new Project({
            name, 
            description, 
            allowedDomain,
            targetEmail,
            publicId,
            ownerId: req.user.id
        });

        // 2. Save the new project to the database (Second DB Call)
        const savedProject = await project.save();

        res.json(savedProject);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// 3. Update an Existing Project (Update)
const updateProject = async (req, res) => {
    const { name, description, allowedDomain, targetEmail, status } = req.body;
    const projectId = req.params.id;

    try {
        // 1. Find the project first (Single DB Call)
        let project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "A project with this ID does not exist." });
        }

        // 2. Authorization Check
        if (project.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ error: "You do not have permission to update this project." });
        }

        // 3. Evaluate new data and check for changes
        if (name) project.name = name;
        if (description) project.description = description;
        if (status) project.status = status;

        // Check if domain or email are provided AND are actually different
        const domainChanged = allowedDomain && allowedDomain !== project.allowedDomain;
        const emailChanged = targetEmail && targetEmail !== project.targetEmail;

        if (domainChanged || emailChanged) {
            if (allowedDomain) project.allowedDomain = allowedDomain;
            if (targetEmail) project.targetEmail = targetEmail;
            
            // Regenerate publicId
            project.publicId = crypto.randomBytes(8).toString('hex');
        }

        // 4. Save the updated project (Second DB Call)
        const updatedProject = await project.save();
        
        res.json({ project: updatedProject });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// 4. Delete a Project (Delete)
const deleteProject = async (req, res) => {
            const projectId = req.params.id;
    try {
        // 1. Find the project first (Single DB Call)
        let project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "A project with this ID does not exist." });
        }

        // 2. Authorization Check
        if (project.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ error: "You do not have permission to delete this project." });
        }

        // 3. Delete the project (Second DB Call)
        const deletedProject = await Project.findByIdAndDelete(projectId);

        // 4. Return success message with deleted project info
        res.json({ project: deletedProject });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { fetchAllProjects, createProject, updateProject, deleteProject };