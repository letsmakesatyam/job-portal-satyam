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

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "job-seeker",
  });

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
    console.log("Form submitted with:", input);

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/login`,
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", res.data);
      toast.success("Login successful!");
      navigate("/");
    } catch (e) {
      console.log("Login Error:", e);
      toast.error(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 pt-8 pb-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={input.email}
                onChange={handleChangeEvent}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={input.password}
                onChange={handleChangeEvent}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Login as</Label>
              <RadioGroup
                defaultValue="job-seeker"
                name="role"
                value={input.role}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, role: value }))
                }
                className="flex items-center gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="job-seeker" id="job-seeker" />
                  <Label htmlFor="job-seeker">Job Seeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employer" id="employer" />
                  <Label htmlFor="employer">Employer</Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#F83002] text-white hover:bg-[#F83002]/90"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#F83002] hover:text-[#F83002]/90 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
