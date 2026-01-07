import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2, Briefcase, MapPin, DollarSign, Users, Award, FileText } from "lucide-react";
import { JOB_API_ENDPOINT, COMPANY_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";


const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    company: "",
  });

  // Fetch companies so the admin can select which one is posting the job
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (error) {
        console.error(error);
        toast.error("Register a company first before posting a job");
      }
    };
    fetchCompanies();
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, company: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/create`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/jobs")}
          className="mb-6 text-gray-400 hover:text-white hover:bg-white/5"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Jobs
        </Button>

        <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-violet-500 bg-clip-text text-transparent inline-block">
              Create New Job Post
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Fill in the details to find your next great hire.</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="space-y-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Job Title
                </Label>
                <Input
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Location
                </Label>
                <Input
                  name="location"
                  placeholder="e.g. Mumbai, Remote"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Salary (LPA)
                </Label>
                <Input
                  name="salary"
                  placeholder="e.g. 12-15"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label className="text-gray-400">Job Type</Label>
                <Input
                  name="jobType"
                  placeholder="Full-time, Part-time, Internship"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Experience Level
                </Label>
                <Input
                  name="experience"
                  placeholder="e.g. 2+ years"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>

              {/* No of Positions */}
              <div className="space-y-2">
                <Label className="text-gray-400 flex items-center gap-2">
                  <Users className="w-4 h-4" /> No. of Positions
                </Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Company Selection */}
            <div className="space-y-2">
              <Label className="text-gray-400">Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="bg-zinc-900 border-white/10 text-white">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-white/10 text-white">
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company.name.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-red-500 font-medium">
                  * Please register a company first before posting a job.
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-gray-400 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Job Description
              </Label>
              <Textarea
                name="description"
                placeholder="Describe the role and responsibilities..."
                rows={4}
                value={input.description}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-white/10 focus:ring-violet-500"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label className="text-gray-400">Requirements (comma separated)</Label>
              <Textarea
                name="requirements"
                placeholder="ReactJS, Node.js, Tailwind, MongoDB..."
                rows={3}
                value={input.requirements}
                onChange={changeEventHandler}
                className="bg-zinc-900 border-white/10 focus:ring-violet-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || companies.length === 0}
              className="w-full bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 text-white py-6 text-lg font-bold transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...
                </>
              ) : (
                "Post New Job"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;