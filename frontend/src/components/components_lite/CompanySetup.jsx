import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Upload, Globe, MapPin,  Info } from "lucide-react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // Fetch existing data to pre-fill the form
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${params.id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setInput({
            name: res.data.company.name || "",
            description: res.data.company.description || "",
            website: res.data.company.website || "",
            location: res.data.company.location || "",
            file: null,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch company details");
      } finally {
        setDataLoading(false);
      }
    };
    fetchSingleCompany();
  }, [params.id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={submitHandler} className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/admin/companies")}
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Setup Details</h1>
                <p className="text-gray-400 text-sm">Complete your company profile to post jobs</p>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 text-white px-8"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-400">Company Name</Label>
                <Input
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Tell us about your company..."
                  rows={5}
                  value={input.description}
                  onChange={changeEventHandler}
                  className="bg-zinc-900 border-white/10 focus:ring-violet-500 resize-none"
                />
              </div>
            </div>

            {/* Right Column: Links & Media */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-400">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    name="website"
                    placeholder="https://example.com"
                    value={input.website}
                    onChange={changeEventHandler}
                    className="bg-zinc-900 border-white/10 pl-10 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <Input
                    name="location"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={input.location}
                    onChange={changeEventHandler}
                    className="bg-zinc-900 border-white/10 pl-10 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400">Company Logo</Label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label className="relative cursor-pointer rounded-md font-medium text-violet-500 hover:text-violet-400 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={changeFileHandler}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    {input.file && (
                        <p className="text-xs text-emerald-500 mt-2 font-bold">Selected: {input.file.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;