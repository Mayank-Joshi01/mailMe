const Entries = require('../models/entries');
const Projects = require('../models/project');
const { sendEmail } = require("../Services/Mail");
const { z } = require('zod'); // Recommended: npm install zod

// Define a schema for validation
const entrySchema = z.object({
    userName: z.string().min(2).max(50),
    userEmail: z.email(),
    userMessage: z.string().min(1).max(2000),
});

const EntriesSubmission = async (req, res) => {
    try {
        // 1. Validation: Ensure input is clean before doing anything else
        const validation = entrySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.message});
        }

        const { userName, userEmail, userMessage } = validation.data;
        const publicId = req.headers['publicid'];

        // 2. Project Verification
        const project = await Projects.findOne({ publicId }).lean(); // .lean() for faster read-only

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // 3. Security Check: Domain Verification
        const origin = req.headers.origin;
        if (!origin || !origin.includes(project.allowedDomain)) {
             return res.status(403).json({ message: 'Unauthorized domain' });
        }

        if (project.status !== 'active') {
            return res.status(403).json({ message: 'Project is inactive' });
        }

        // 4. Data Persistence & Email
        // Use Promise.all if you want them to happen concurrently for speed
        const newEntry = new Entries({
            ProjectId: project._id,
            UserId: project.ownerId,
            name: userName,
            SenderEmail: userEmail,
            message: userMessage
        });

        await Promise.all([
            newEntry.save(),
            sendEmail(
                project.targetEmail, 
                "New Entry Submitted", 
                `<b>Submission from ${userName}:</b><p>${userMessage}</p>`
            )
        ]);

        return res.status(201).json({ 
            success: true, 
            message: 'Form submitted successfully' 
        });

    } catch (error) {
        console.error('Submission Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const GetEntries = async (req, res) => {
    try {
        const { projectId } = req.params;
        // Get page and limit from query strings, e.g., /entries/123?page=1&limit=10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        // 1. Verify Project Ownership (Critical Security Step)
        const project = await Projects.findOne({ 
            _id: projectId, 
            ownerId: req.user.id // Assumes you have auth middleware providing req.user
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found or unauthorized" });
        }

        // 2. Fetch Entries with Pagination and Sorting (Newest first)
        const [entries, totalCount] = await Promise.all([
            Entries.find({ ProjectId: projectId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Entries.countDocuments({ ProjectId: projectId })
        ]);

        // 3. Metadata for the Frontend
        res.status(200).json({
            success: true,
            data: entries,
            pagination: {
                totalEntries: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit
            }
        });

    } catch (error) {
        console.error("GetEntries Error:", error);
        res.status(500).json({ message: "Error fetching entries" });
    }
};

const DeleteEntries = async (req, res) => {
    try {
        const { projectId } = req.params;

        // 1. Security Check: Is the requester the owner?
        const project = await Projects.findOne({ 
            _id: projectId, 
            ownerId: req.user.id 
        });

        if (!project) {
            return res.status(403).json({ message: "Unauthorized to delete these entries" });
        }

        // 2. Performance: DeleteMany is faster than looping through IDs
        const result = await Entries.deleteMany({ ProjectId: projectId });

        res.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} entries.`
        });

    } catch (error) {
        console.error("DeleteEntries Error:", error);
        res.status(500).json({ message: "Error performing deletion" });
    }
};

module.exports = { EntriesSubmission, GetEntries, DeleteEntries  };
