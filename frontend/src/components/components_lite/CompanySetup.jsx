import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Upload, Globe, MapPin, Edit3, Building2, ExternalLink } from "lucide-react";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const CompanySetup = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "", // Store the URL from backend
    file: null, // Store the file for upload
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

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
          logo: res.data.company.logo || "", // Capture the logo URL
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

  useEffect(() => {
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
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOpen(false);
        // Instant update: update local state with the new company data from response
        const updated = res.data.company;
        setInput({
            name: updated.name || "",
            description: updated.description || "",
            website: updated.website || "",
            location: updated.location || "",
            logo: updated.logo || "",
            file: null
        });
      }
    } catch (error) {
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/companies")}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 shadow-lg shadow-violet-500/20">
                <Edit3 className="mr-2 w-4 h-4" /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-zinc-950 border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">Update Company Details</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Changes will reflect immediately on your public profile.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={submitHandler} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Company Name</Label>
                    <Input name="name" value={input.name} onChange={changeEventHandler} className="bg-zinc-900 border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-400">Location</Label>
                    <Input name="location" value={input.location} onChange={changeEventHandler} className="bg-zinc-900 border-white/10 text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-zinc-400">Website URL</Label>
                  <Input name="website" placeholder="https://..." value={input.website} onChange={changeEventHandler} className="bg-zinc-900 border-white/10 text-white" />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">Description</Label>
                  <Textarea name="description" value={input.description} onChange={changeEventHandler} className="bg-zinc-900 border-white/10 text-white" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-400">Company Logo</Label>
                  <Input type="file" accept="image/*" onChange={changeFileHandler} className="bg-zinc-900 border-white/10 text-white file:text-violet-400 file:font-semibold" />
                </div>

                <DialogFooter className="mt-6">
                  <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-zinc-400">Cancel</Button>
                  <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-700 text-white">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Display View */}
        <Card className="bg-zinc-900/50 border-white/10 overflow-hidden backdrop-blur-sm">
          <div className="h-32 bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border-b border-white/10" />
          <CardContent className="relative pt-16 pb-8">
            
            {/* Logo Display Logic */}
            <div className="absolute -top-12 left-8 w-24 h-24 rounded-2xl bg-zinc-800 border-4 border-[#0a0a0a] flex items-center justify-center shadow-2xl overflow-hidden">
                {input.logo ? (
                    <img 
                        src={input.logo} 
                        alt="logo" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Building2 className="w-12 h-12 text-violet-500" />
                )}
            </div>

            <div className="px-4">
              <h1 className="text-4xl font-bold text-white mb-2">{input.name || "Company Name"}</h1>
              
              <div className="flex flex-wrap gap-6 text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-500" />
                  <span>{input.location || "Location not set"}</span>
                </div>
                {input.website && (
                    <div className="flex items-center gap-2 text-violet-400">
                        <Globe className="w-4 h-4" />
                        <a href={input.website.startsWith('http') ? input.website : `https://${input.website}`} 
                           target="_blank" 
                           rel="noreferrer" 
                           className="hover:underline flex items-center gap-1">
                            {input.website} <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                )}
              </div>

              <div className="space-y-4 border-t border-white/5 pt-6">
                <h3 className="text-lg font-semibold text-white">About Company</h3>
                <p className="text-gray-400 leading-relaxed max-w-3xl">
                  {input.description || "No description provided yet. Complete your profile to attract more candidates."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySetup;