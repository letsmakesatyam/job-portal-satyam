import React, { useState } from "react";
import { useSelector } from "react-redux";
import { 
  Mail, 
  Contact, 
  PenBox, 
  Briefcase, 
  FileText,
  Download,
  Eye,
  X,
  Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { USER_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { toast } from "sonner";

const appliedJobs = [
  { id: 1, role: "Frontend Developer", company: "Google", date: "20-08-2024", status: "Selected" },
  { id: 2, role: "MERN Stack Engineer", company: "Meta", date: "15-08-2024", status: "Pending" },
];

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const initials = user?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase() || "JP";
  const resumeUrl = user?.profile?.resume ? `${USER_API_ENDPOINT}/users/${user._id}/resume` : null;

  // PRODUCTION LOGIC: Force Download via Blob
  const downloadResume = async () => {
    if (!resumeUrl) return;
    try {
      setIsDownloading(true);
      const response = await axios.get(resumeUrl, {
        responseType: 'blob', // Important for handling binary data
        withCredentials: true
      });

      // Create a local URL for the blob
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger click
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', user?.profile?.resumeOriginalName || 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Download started");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download resume");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-10">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        
        {/* Profile Header */}
        <div className="relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[100px] -z-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-violet-500/30">
                <AvatarImage src={user?.profile?.profilePhoto} />
                <AvatarFallback className="bg-zinc-800 text-2xl font-bold">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white">{user?.fullName || "Job Seeker"}</h1>
                <p className="text-gray-400 font-medium mt-1">{user?.profile?.bio || "No bio added yet."}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-red-500" /> {user?.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Contact className="w-4 h-4 text-violet-500" /> {user?.phoneNumber || "N/A"}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2">
              <PenBox className="w-4 h-4" /> Edit Profile
            </Button>
          </div>

          {/* Skills */}
          <div className="mt-8 pt-8 border-t border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index} className="bg-violet-600/20 border-violet-500/30 text-violet-200 px-4 py-1">
                    {item}
                  </Badge>
                ))
              ) : ( <span className="text-gray-500 italic">No skills listed</span> )}
            </div>
          </div>

          {/* Updated Resume Logic */}
          <div className="mt-6 flex flex-col gap-3">
            <Label className="text-sm font-bold uppercase tracking-widest text-gray-500">Resume</Label>
            {user?.profile?.resume ? (
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  variant="outline"
                  className="bg-zinc-800 hover:bg-zinc-700 border-white/10 text-white gap-2 rounded-xl"
                >
                  {isPreviewOpen ? <X className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4 text-violet-400" />}
                  {isPreviewOpen ? "Close Preview" : "Preview"}
                </Button>

                <Button 
                  onClick={downloadResume}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 text-white gap-2 rounded-xl shadow-lg shadow-red-600/20"
                >
                  {isDownloading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isDownloading ? "Downloading..." : "Download Resume"}
                </Button>
              </div>
            ) : (
              <span className="text-gray-500 italic text-sm">Resume not uploaded</span>
            )}
          </div>

          {/* Inline Preview */}
          {isPreviewOpen && resumeUrl && (
            <div className="mt-6 animate-in fade-in zoom-in duration-300">
              <div className="w-full h-[500px] border border-white/10 rounded-2xl overflow-hidden bg-white">
                <iframe
                  src={`${resumeUrl}#toolbar=0`}
                  title="Resume Preview"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Applied Jobs */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Applied Jobs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appliedJobs.map((job) => (
              <Card key={job.id} className="bg-zinc-900 border-white/5 hover:border-red-500/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-bold text-white">{job.role}</CardTitle>
                  <Badge className={job.status === "Selected" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                    {job.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span className="text-gray-300">{job.company}</span>
                    <span>{job.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;