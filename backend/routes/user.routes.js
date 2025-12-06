import express from "express";
import { register , login , updateProfile, logout } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";    
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", isAuthenticated ,updateProfile);
router.post("/logout", logout);


export default router;