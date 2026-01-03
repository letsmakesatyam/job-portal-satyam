import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['job-seeker', 'employer'],
        default: 'job-seeker',
        required: true,
      },
      profile: {
        bio: {
          type: String,
        },
        skills: [
          {
            type: String,
          }
        ],
      
        resume: {
          data: String,
          contentType: String,
        },
        resumeOriginalName: {
          type: String,
        },
      
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
      
        profilePhoto: {
          data: String,
          contentType: String,
        },
      },
      
    
}, {timestamps:true});

export const User= mongoose.model("User" , userSchema);