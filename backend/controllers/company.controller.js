import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";

// Utility function for Cloudinary Upload
const uploadToCloudinary = async (file, folder, resourceType = "image") => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
        folder,
        resource_type: resourceType,
    });
    return result.secure_url;
};

export const registerCompany = async (req, res) => {
    try {
        const { name, email, description, website } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required",
                success: false,
            });
        }

        const existingCompany = await Company.findOne({
            $or: [{ email }, { name }]
        });

        if (existingCompany) {
            return res.status(409).json({
                message: `Company with this name or email already exists`,
                success: false,
            });
        }

        const company = new Company({
            name,
            email,
            description,
            website,
            userId: req._id // Ensure your auth middleware sets req._id
        });

        await company.save();

        res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error registering company",
            error: err.message,
            success: false,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, website, location } = req.body;
        const file = req.file; // From multer

        // 1. Prepare update object
        const updateData = { name, description, website, location };

        // 2. If a file is provided, upload it to Cloudinary
        if (file) {
            const logoUrl = await uploadToCloudinary(file, "company_logos");
            updateData.logo = logoUrl;
        }

        // 3. Find and Update
        const company = await Company.findOneAndUpdate(
            { _id: id, userId: req._id },
            { $set: updateData },
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found or unauthorized",
                success: false,
            });
        }

        res.status(200).json({
            message: "Company updated successfully",
            company,
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error updating company",
            error: err.message,
            success: false,
        });
    }
};

// ... keep your getAllCompanies and getCompanyById as they were

export const getAllCompanies = async (req, res) => {
  try {
    // Only return companies created by the logged-in user (req._id)
    const companies = await Company.find({ userId: req._id });
    res.status(200).json({
      message: "Companies fetched successfully",
      companies,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching companies",
      error: err.message,
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Only fetch the company if it belongs to the logged-in user
    const company = await Company.findOne({ _id: id, userId: req._id });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Company fetched successfully",
      company,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching company",
      error: err.message,
      success: false,
    });
  }
};

