import { Company } from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { name, email, description, website } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
        success: false,
      });
    }

    // Check if company model exists by email or name
    const existingCompany = await Company.findOne({
      $or: [{ email }, { name }]
    });
    if (existingCompany) {
      return res.status(409).json({
        message: `Company with this ${duplicateField} already exists`,
        success: false,
      });
    }

    const company = new Company({
      name,
      email,
      description,
      website,
      userId: req._id
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

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Ensure the company belongs to the logged-in user
    const company = await Company.findOne({ _id: id, userId: req._id });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Update only the fields that are present in req.body
    Object.keys(updateFields).forEach((key) => {
      company[key] = updateFields[key];
    });

    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating company",
      error: err.message,
      success: false,
    });
  }
};