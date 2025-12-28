import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // ✅ defensive destructuring (critical fix)
    const {
      fullName = "",
      email = "",
      password = "",
      phoneNumber = "",
      role = "",
    } = req.body || {};

    // ✅ file-safe (future-proof, no behavior change)
    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (unchanged behavior)
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: profilePhoto
          ? {
              data: profilePhoto.buffer,
              contentType: profilePhoto.mimetype,
            }
          : undefined,
        resume:
          role === "job-seeker" && resume
            ? {
                data: resume.buffer,
                contentType: resume.mimetype,
              }
            : undefined,
        resumeOriginalName: resume?.originalname,
      },
    });
    
   
    
   

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    if (role !== user.role) {
      return res
        .status(401)
        .json({ message: "Role mismatch", success: false });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: userResponse,
        success: true,
      });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error during logout",
      error: err.message,
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const userId = req._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating profile",
      success: false,
      error: err.message,
    });
  }
};
