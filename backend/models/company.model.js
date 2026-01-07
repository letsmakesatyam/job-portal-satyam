import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: { // Added this as your controller uses it
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String, 
    },
    website: {
        type: String 
    },
    location: {
        type: String 
    },
    logo: {
        type: String // This will store the Cloudinary URL
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);