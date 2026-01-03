import express from "express";
import multer from "multer";
import {
  register,
  login,
  updateProfile,
  logout,
  checkIsLoggedIn,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 5MB
});

router.post(
  "/register",
  (req, res, next) => {
    upload.fields([
      { name: "profilePhoto", maxCount: 1 },
      { name: "resume", maxCount: 1 },
    ])(req, res, (err) => {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_FILE_SIZE"
        ) {
          return res.status(400).json({
            message: "File too large. Max allowed size is 15MB.",
            success: false,
          });
        }
        return res.status(500).json({ message: err.message, success: false });
      }
      next(); // no error, continue to register controller
    });
  },
  register
);



router.post("/login", login);
router.put(
  "/update-profile",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  isAuthenticated,
  updateProfile
);

router.post("/logout", logout);

router.get("/me", isAuthenticated, checkIsLoggedIn);

export default router;
