const Entries = require('../models/Entries');
const Projects = require('../models/Project');
const { sendEmail } = require("../Services/Mail");
const { getSubmissionEmailTemplate } = require("../utils/mailTemplate");
let UserSummary = require("../models/Summary");

const EntriesSubmission = async (req, res) => {
    try {
        const publicId = req.headers['publicid'];

        // 2. Project Verification
        const project = await Projects.findOne({ publicId }) // .lean() for faster read-only

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // 3. Security Check: Domain Verification
        const origin = req.headers.origin;

        // Reject if no origin exists (blocks direct Postman pings)
        if (!origin) {
            return res.status(403).json({ message: 'Unauthorized: Missing Origin header' });
        }

        // ✅ Since both the DB and the incoming request have 'https://...', 
        // we demand an absolute, perfect match.
        if (origin !== project.allowedDomain) {
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
            data: req.body
        });

        // await Promise.all([
        //     newEntry.save(),
        //     UserSummary = UserSummary.findOneAndUpdate(
        //         { UserId: project.ownerId },
        //         { $inc: { totalEntries: 1 } },
        //         { new: true, upsert: true }
        //     ).exec(), // Add .exec() to make it a proper promise
        //     project.updateOne({ $inc: { totalEntries: 1 } }), // Increment totalEntries in the project
        //     sendEmail(
        //         project.targetEmail,
        //         "New Entry Submitted",
        //         getSubmissionEmailTemplate(project.name, req.body)
        //     )
        // ]);
        await Promise.all([
            newEntry.save(),
            UserSummary.findOneAndUpdate(
                { UserId: project.ownerId },
                { $inc: { totalEntries: 1 } },
                { new: true, upsert: true }
            ),
            project.updateOne({ $inc: { totalEntries: 1 } }),
            sendEmail(
                project.targetEmail,
                "New Entry Submitted",
                getSubmissionEmailTemplate(project.name, req.body)
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
                .select('data createdAt -_id') // Only select necessary fields
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

module.exports = { EntriesSubmission, GetEntries };
