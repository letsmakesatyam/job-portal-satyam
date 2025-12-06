import express from "express";

import { registerCompany, getCompanyById, updateCompany } from "../controllers/company.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { getAllCompanies } from "../controllers/company.controller.js";


const router = express.Router();


router.post("/register", isAuthenticated, registerCompany);
router.get("/get", isAuthenticated, getAllCompanies);
router.get("/get/:id" , isAuthenticated , getCompanyById)
router.put("/update/:id" , isAuthenticated , updateCompany )

export default router;