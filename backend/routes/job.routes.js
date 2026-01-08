import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// Job routes
import {
  createJobPost,
  getAllJobs,
  getJobById,
 
  getAdminJobs,
  updateJob,
} from "../controllers/job.controller.js";
 
// Create a job - authenticated
router.post("/create", isAuthenticated, createJobPost);

// Get all jobs - authenticated
router.get("/get", isAuthenticated, getAllJobs);

// Get a single job by ID - authenticated
router.get("/get/:id", isAuthenticated, getJobById);



// Get all jobs created by the authenticated admin
router.get("/admin", isAuthenticated, getAdminJobs);
// Add this import to your existing imports


// Add this route
router.put("/update/:id", isAuthenticated, updateJob);

export default router;