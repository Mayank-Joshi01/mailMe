const Project = require("../models/Project");
const crypto = require('crypto');
const UserSummary = require("../models/Summary");
const Entries = require('../models/Entries');


// 1. Get All Projects (Read)
const fetchAllProjects = async (req, res) => {
    try {
        // Find projects where the user matches the logged-in user ID
        const projects = await Project.find({ ownerId: req.user.id }).select('-__v -ownerId'); // Exclude __v and ownerId fields
        res.json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// 2. Create a New Project (Create)
const createProject = async (req, res) => {
    const { name, description, allowedDomain } = req.body;

    // Update user summary
    const userSummary = await UserSummary.findOne({ UserId: req.user.id });

    if (userSummary.totalProjects >= 10) {
        return res.status(400).json({ error: "Project limit reached. You cannot create more than 10 projects." });
    }

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
            targetEmail: req.user.email, // Set targetEmail to the email of the logged-in user
            publicId,
            ownerId: req.user.id
        });

        // 2. Save the new project to the database (Second DB Call)
        const savedProject = await project.save();


        // if (userSummary) {
        userSummary.totalProjects += 1;
        userSummary.activeProjects += 1;
        await userSummary.save();
        // }

        res.json(savedProject);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

// 3. Update an Existing Project (Update)
const updateProject = async (req, res) => {
    const { name, description, allowedDomain, status } = req.body;
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

        // 3. Check for existing project with the same name for this user (Optional but good UX) , Single DB Call
        const existingProject = await Project.findOne({ name, ownerId: req.user.id });

        if (existingProject && existingProject._id.toString() !== projectId) {
            return res.status(400).json({ error: "A project with this name already exists for the user." });
        }

        // 4. Evaluate new data and check for changes
        if (name) project.name = name;
        if (description) project.description = description;
        if (allowedDomain) project.allowedDomain = allowedDomain;
    

        // Update user summary if project status changes
        if (status && status !== project.status) {
            let updateFields = {};

            if (status === "active" && project.status === "inactive") {
                // Switching Inactive -> Active
                updateFields = {
                    $inc: { activeProjects: 1 }
                };
            } else if (status === "inactive" && project.status === "active") {
                // Switching Active -> Inactive
                updateFields = {
                    $inc: { activeProjects: -1 }
                };
            }

            if (Object.keys(updateFields).length > 0) {
                await UserSummary.findOneAndUpdate(
                    { UserId: req.user.id },
                    updateFields,
                    { upsert: true, new: true }
                );
                console.log(`Summary updated: ${status} transition complete.`);
            }
        }


        /// Update project status if provided
        if (status) project.status = status;
        
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

        const totalEntriesToDelete = project.totalEntries;

        // 3. Delete the project (Second DB Call)
        const deletedProject = await Project.findByIdAndDelete(projectId);

        const result = await Entries.deleteMany({ ProjectId: projectId });

        // 4. Update user summary
        const userSummary = await UserSummary.findOne({ UserId: req.user.id });
        if (userSummary) {
            userSummary.totalProjects -= 1;
            userSummary.activeProjects = deletedProject.status === "active" ? userSummary.activeProjects - 1 : userSummary.activeProjects;
            userSummary.totalEntries -= totalEntriesToDelete;
            await userSummary.save();
        }

        // 5. Return success message with deleted project info
        res.json({ project: deletedProject });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { fetchAllProjects, createProject, updateProject, deleteProject };