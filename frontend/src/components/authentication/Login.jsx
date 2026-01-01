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
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUser } from "@/redux/authSlice";
import { Loader2, LockKeyhole, Mail } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "job-seeker",
  });
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        input,
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(res.data.user));
      toast.success(res.data.message || "Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden px-4">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[120px]" />

      <Card className="w-full max-w-md bg-zinc-950/50 border-white/10 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-black tracking-tighter text-white">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">Back</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access your professional dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-violet-500 transition-colors" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                  value={input.email}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Link to="#" className="text-xs text-violet-400 hover:text-red-400">Forgot password?</Link>
              </div>
              <div className="relative group">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-violet-500 transition-colors" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-violet-600 focus-visible:border-violet-600"
                  value={input.password}
                  onChange={handleChangeEvent}
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="grid gap-3">
              <Label className="text-gray-300">Login as</Label>
              <RadioGroup
                defaultValue="job-seeker"
                name="role"
                value={input.role}
                onValueChange={(val) => setInput({ ...input, role: val })}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <RadioGroupItem value="job-seeker" id="job-seeker" className="border-gray-500 text-violet-600 focus:ring-violet-600" />
                  <Label htmlFor="job-seeker" className="text-gray-400 group-hover:text-white cursor-pointer transition-colors">Job Seeker</Label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <RadioGroupItem value="employer" id="employer" className="border-gray-500 text-red-600 focus:ring-red-600" />
                  <Label htmlFor="employer" className="text-gray-400 group-hover:text-white cursor-pointer transition-colors">Employer</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-violet-600 text-white font-bold py-6 hover:opacity-90 shadow-[0_0_20px_rgba(220,38,38,0.2)] transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            New to the portal?{" "}
            <Link
              to="/register"
              className="text-violet-400 font-semibold hover:text-red-400 transition-colors hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;