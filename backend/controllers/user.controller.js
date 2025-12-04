import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    await user.save();

    // Remove password from returned user data
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
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }
    if (role !== user.role) {
      return res.status(401).json({ message: "Role mismatch", success: false });
    }

    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Remove password from user object before sending
    const userResponse = user.toObject();
    delete userResponse.password;

    res
        .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
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
        if (!fullName || !email || !phoneNumber || !bio || !skills) {
            return res.status(404).json({
                message: "Missing required fields",
                success: false,
            });
        }

        const userId = req._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skills.split(",");

        await user.save();

        res.status(200).json({
            message: "Profile updated",
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating profile",
            success: false,
            error: err.message
        });
    }
}