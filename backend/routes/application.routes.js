import express from "express";
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/application.controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/apply", isAuthenticated, applyJob);
router.get("/applied-jobs", isAuthenticated, getAppliedJobs);
router.get("/applicants/:jobId", isAuthenticated, getApplicants);
router.patch("/status/:applicationId", isAuthenticated, updateStatus);

export default router;