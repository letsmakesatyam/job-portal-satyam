import express from "express";
import multer from "multer";
import {
  register,
  login,
  updateProfile,
  logout,
  getMyProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  register
);

router.post("/login", login);
router.put("/update-profile", isAuthenticated, updateProfile);
router.post("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile);

export default router;
