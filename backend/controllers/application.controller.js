import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req._id;

    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    // Save the new application
    const application = new Application({
      job: jobId,
      applicant: userId,
    });

    // Add this application to the job's applications array
    job.applications.push(application._id);
    await job.save();

    await application.save();

    return res
      .status(201)
      .json({ message: "Application submitted successfully.", application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req._id;

    // Find all applications by this user, and populate job details
    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: [
          { path: "company", select: "name" },
          { path: "created_by", select: "fullName email" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Applied jobs fetched successfully.",
      applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }
    // Find all applications for the given job, populate applicant details
    const applications = await Application.find({ job: jobId })
      .populate({
        path: "applicant",
        select: "fullName email profile",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Applicants fetched successfully.",
      applicants: applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Check for valid status
    const validStatuses = ["pending", "accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
        success: false,
      });
    }

    // Find and update the application

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    )
      .populate({
        path: "applicant",
        select: "fullName email profile",
      })
      .populate({
        path: "job",
        select: "title",
      });

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Application status updated successfully.",
      application: updatedApplication,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};
