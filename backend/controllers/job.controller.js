import { Job } from "../models/job.model.js";

export const createJobPost = async (req, res) => {
    try {
        
        const { 
            title, 
            description, 
            requirements,
            salary, 
            location, 
            jobType, 
            experience,
            position, 
            company
        } = req.body;

        // Validate required fields
        if (!title || !description || !salary || !location || !jobType || !position || !company) {
            return res.status(400).json({
                message: "All required fields must be provided",
                success: false
            });
        }

        const job = new Job({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            company,
            created_by: req._id // assumes req._id is the user id via auth middleware
        });

        await job.save();

        res.status(201).json({
            message: "Job post created successfully",
            job,
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating job post",
            error: err.message,
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const { keywords } = req.query;
        let filter = {};

        if (keywords) {
            const keywordArray = keywords.split(',').map(word => word.trim()).filter(Boolean);
            if (keywordArray.length > 0) {
                filter.$or = [
                    { title: { $regex: keywordArray.join('|'), $options: 'i' } },
                    { description: { $regex: keywordArray.join('|'), $options: 'i' } },
                    { requirements: { $regex: keywordArray.join('|'), $options: 'i' } },
                    { location: { $regex: keywordArray.join('|'), $options: 'i' } },
                    { jobType: { $regex: keywordArray.join('|'), $options: 'i' } },
                    { position: { $regex: keywordArray.join('|'), $options: 'i' } },
                ];
            }
        }

        const jobs = await Job.find(filter)
            .populate('company', 'name email')
            .populate('created_by', 'name email');

        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch jobs",
            error: err.message,
            success: false
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
           
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Job fetched successfully",
            job,
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch job",
            error: err.message,
            success: false
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req._id; // Logged-in admin/user ID

        // We find jobs created by this admin and populate the 'company' field 
        // to get company name, logo, etc.
        const jobs = await Job.find({ created_by: adminId })
            .populate({
                path: 'company',
            })
            .sort({ createdAt: -1 }); // Show newest jobs first

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        res.status(200).json({
            message: "Admin jobs fetched successfully",
            jobs,
            success: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch admin jobs",
            error: err.message,
            success: false
        });
    }
};