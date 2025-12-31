import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/redux/authSlice";
import { Loader2, User, Mail, LockKeyhole, Phone, Camera, FileText } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePhoto: null,
    resume: null,
    role: "job-seeker",
  });
  
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  const handleChangeEvent = (e) => {
    const { name, value, type, files } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.profilePhoto) formData.append("profilePhoto", input.profilePhoto);
    if (input.role === "job-seeker" && input.resume) formData.append("resume", input.resume);

    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success(res.data.message || "Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden px-4 py-12">
      {/* Aesthetic Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[120px]" />

      <Card className="w-full max-w-2xl bg-zinc-950/50 border-white/10 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-black tracking-tighter text-white">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-red-500">Elite</span>
          </CardTitle>
          <CardDescription className="text-gray-400 text-base">
            Create your account and start your professional journey today.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-violet-500 transition-colors" />
                  <Input id="name" name="fullName" placeholder="John Doe" value={input.fullName} onChange={handleChangeEvent} className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-violet-600" required />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <Input id="email" name="email" type="email" placeholder="john@example.com" value={input.email} onChange={handleChangeEvent} className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-red-600" required />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative group">
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-violet-500 transition-colors" />
                  <Input id="password" name="password" type="password" placeholder="••••••••" value={input.password} onChange={handleChangeEvent} className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-violet-600" required />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                  <Input id="phone" name="phoneNumber" placeholder="+1 (555) 000-0000" value={input.phoneNumber} onChange={handleChangeEvent} className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-red-600" required />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-2">
                <Label htmlFor="profile-photo" className="text-gray-300 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-violet-400" /> Profile Photo
                </Label>
                <Input id="profile-photo" name="profilePhoto" type="file" accept="image/*" onChange={handleChangeEvent} className="bg-white/5 border-white/10 text-gray-400 file:bg-violet-600 file:text-white file:border-none file:mr-4 file:px-4 file:py-1 file:rounded-md cursor-pointer" />
              </div>

              {input.role === "job-seeker" && (
                <div className="space-y-2">
                  <Label htmlFor="resume" className="text-gray-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-400" /> Resume (PDF)
                  </Label>
                  <Input id="resume" name="resume" type="file" accept=".pdf" onChange={handleChangeEvent} className="bg-white/5 border-white/10 text-gray-400 file:bg-red-600 file:text-white file:border-none file:mr-4 file:px-4 file:py-1 file:rounded-md cursor-pointer" />
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
              <Label className="text-gray-300">Register as</Label>
              <RadioGroup
                defaultValue="job-seeker"
                value={input.role}
                onValueChange={(val) => setInput({ ...input, role: val })}
                className="flex items-center gap-8"
              >
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <RadioGroupItem value="job-seeker" id="job-seeker" className="border-gray-500 text-violet-500" />
                  <Label htmlFor="job-seeker" className="text-gray-400 group-hover:text-white cursor-pointer transition-colors">Job Seeker</Label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <RadioGroupItem value="employer" id="employer" className="border-gray-500 text-red-500" />
                  <Label htmlFor="employer" className="text-gray-400 group-hover:text-white cursor-pointer transition-colors">Employer</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-red-600 text-white font-bold py-6 hover:opacity-90 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 font-semibold hover:text-violet-400 transition-colors hover:underline">
              Log in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;