import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";



const uploadToCloudinary = async (file, folder, resourceType = "image") => {
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder,
      resource_type: resourceType,
    }
  );
  return result.secure_url;
};



export const register = async (req, res) => {
  try {
    const {
      fullName = "",
      email = "",
      password = "",
      phoneNumber = "",
      role = "",
    } = req.body || {};

    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ⬇️ Cloudinary uploads FIRST
    let profilePhotoData;
    let resumeData;
    let resumeOriginalName;

    if (profilePhoto) {
      const photoUrl = await uploadToCloudinary(
        profilePhoto,
        "profile-photos"
      );

      profilePhotoData = {
        data: photoUrl,
        contentType: profilePhoto.mimetype,
      };
    }

    if (role === "job-seeker" && resume) {
      const resumeUrl = await uploadToCloudinary(
        resume,
        "resumes",
        "raw"
      );

      resumeData = {
        data: resumeUrl,
        contentType: resume.mimetype,
      };
      resumeOriginalName = resume.originalname;
    }

    // ⬇️ Create user ONCE, with URLs
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: profilePhotoData,
        resume: resumeData,
        resumeOriginalName,
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
        sameSite: "none",
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

    const user = await User.findById(req._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const profilePhoto = req.files?.profilePhoto?.[0];
    const resume = req.files?.resume?.[0];

    // Basic fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");

    // ⬇️ Cloudinary instead of buffers
    if (profilePhoto) {
      const photoUrl = await uploadToCloudinary(
        profilePhoto,
        "profile-photos"
      );

      user.profile.profilePhoto = {
        data: photoUrl,
        contentType: profilePhoto.mimetype,
      };
    }

    if (resume) {
      const resumeUrl = await uploadToCloudinary(
        resume,
        "resumes",
        "raw"
      );

      user.profile.resume = {
        data: resumeUrl,
        contentType: resume.mimetype,
      };
      user.profile.resumeOriginalName = resume.originalname;
    }

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


export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req._id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const checkIsLoggedIn = async(req, res) => {
  try {
    const user = await User.findById(req._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
