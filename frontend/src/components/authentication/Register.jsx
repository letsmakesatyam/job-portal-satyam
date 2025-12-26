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

const Register = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "job-seeker",
  });

  const navigate = useNavigate();

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        {
          fullName: input.fullName,
          email: input.email,
          password: input.password,
          phoneNumber: input.phoneNumber,
          role: input.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 pt-8 pb-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="fullName"
                type="text"
                placeholder="John Doe"
                value={input.fullName}
                onChange={handleChangeEvent}
              />
            </div>

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
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phoneNumber"
                type="tel"
                placeholder="123-456-7890"
                value={input.phoneNumber}
                onChange={handleChangeEvent}
              />
            </div>

            <div className="grid gap-2">
              <Label>Register as</Label>
              <RadioGroup
                defaultValue="job-seeker"
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

            <Button className="w-full bg-[#F83002] text-white hover:bg-[#F83002]/90">
              Register
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#F83002] hover:text-[#F83002]/90 hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
