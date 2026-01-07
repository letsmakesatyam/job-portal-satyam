import express from "express";
import multer from "multer";
import { 
    registerCompany, 
    getCompanyById, 
    updateCompany, 
    getAllCompanies 
} from "../controllers/company.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

// 1. Configure Multer (following your user reference)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for company logos
});

router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getAllCompanies);
router.get("/get/:id", isAuthenticated, getCompanyById);

// 2. Add the upload middleware to the update route
// Use .single("file") because your frontend appends the logo as "file"
router.put(
  "/update/:id",
  isAuthenticated,
  upload.single("file"), 
  updateCompany
);

export default router;