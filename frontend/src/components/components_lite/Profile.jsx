import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { 
  Mail, 
  Contact, 
  PenBox, 
  Briefcase, 
  Download,
  Eye,
  X,
  Loader2,
  Calendar,
  Building2,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import UpdateProfileDialog from "./UpdateProfileDialog"; 

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isPhotoPreviewOpen, setIsPhotoPreviewOpen] = useState(false);

  // ✅ NEW: applied jobs state
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  const initials =
    user?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase() || "JP";

  const resumeUrl = user?.profile?.resume?.data || null;
  const profilePhotoUrl = user?.profile?.profilePhoto?.data || "";

  // ✅ NEW: fetch applied jobs
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setJobsLoading(true);
        const res = await fetch(
          `${APPLICATION_API_ENDPOINT}/applied-jobs`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to fetch applied jobs");

        const data = await res.json();
        console.log(data);
        setAppliedJobs(data.applications || []);
      } catch (error) {
        console.error(error);
        toast.error("Unable to load applied jobs");
      } finally {
        setJobsLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const downloadResume = async () => {
    if (!resumeUrl) return;
    try {
      setIsDownloading(true);
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute(
        "download",
        user?.profile?.resumeOriginalName || "resume.pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
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

        {/* PROFILE CARD */}
        <div className="relative bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/10 blur-[100px] -z-10"></div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                className="h-24 w-24 border-4 border-violet-500/30 shadow-2xl shadow-violet-500/10 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsPhotoPreviewOpen(true)}
              >
                <AvatarImage src={profilePhotoUrl} alt={user?.fullName} />
                <AvatarFallback className="bg-zinc-800 text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-3xl font-black">{user?.fullName}</h1>
                <p className="text-gray-400 mt-1">
                  {user?.profile?.bio || "No bio added yet."}
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" /> {user?.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Contact className="w-4 h-4 text-violet-500" /> {user?.phoneNumber || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10 gap-2"
            >
              <PenBox className="w-4 h-4" /> Edit Profile
            </Button>
          </div>

          {/* SKILLS */}
          <div className="mt-8 pt-8 border-t border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-violet-600/20 border-violet-500/30 text-violet-200 px-4 py-1"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500 italic text-sm">
                  No skills listed
                </span>
              )}
            </div>
          </div>

          {/* RESUME */}
          <div className="mt-6 flex flex-col gap-3">
            <Label className="text-sm font-bold uppercase tracking-widest text-gray-500">
              Resume
            </Label>

            {resumeUrl ? (
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                  variant="outline"
                  className="bg-zinc-800 border-white/10 gap-2 rounded-xl"
                >
                  {isPreviewOpen ? <X className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4 text-violet-400" />}
                  {isPreviewOpen ? "Close Preview" : "Preview"}
                </Button>

                <Button
                  onClick={downloadResume}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-red-600 to-violet-600 gap-2 rounded-xl"
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
              <span className="text-gray-500 italic text-sm">
                Resume not uploaded
              </span>
            )}
          </div>

          {isPreviewOpen && resumeUrl && (
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="w-full h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-white">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={resumeUrl} />
                </Worker>
              </div>
            </div>
          )}
        </div>

        {/* APPLIED JOBS SECTION */}
       {/* APPLIED JOBS SECTION */}
<div className="mt-12">
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-red-500/10 rounded-lg">
        <Briefcase className="w-6 h-6 text-red-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">Applied Jobs</h2>
        <p className="text-sm text-gray-500">Track your application progress</p>
      </div>
    </div>
    <Badge variant="outline" className="border-white/10 text-gray-400 px-3 py-1">
      {appliedJobs.length} Applications
    </Badge>
  </div>

  {jobsLoading ? (
    <div className="flex items-center justify-center py-20">
       <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
    </div>
  ) : appliedJobs.length === 0 ? (
    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-zinc-900/20">
      <p className="text-gray-500 italic">No jobs applied yet. Start your journey today!</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {appliedJobs.map((job) => (
        <Card
          key={job._id}
          className="group bg-zinc-900/40 border-white/5 hover:border-violet-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/5 overflow-hidden"
        >
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
            <div className="space-y-1.5">
              {/* UPDATED JOB TITLE: Larger, bolder, and pure white */}
              <CardTitle className="text-xl font-extrabold text-white tracking-tight group-hover:text-violet-400 transition-colors duration-300">
                {job.job?.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                 <Building2 className="w-4 h-4 text-violet-500/70" />
                 <span>{job.job?.company?.name}</span>
              </div>
            </div>
            <Badge
              className={
                job.status === "Selected"
                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  : job.status === "Rejected"
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : "bg-amber-500/10 text-amber-500 border-amber-500/20"
              }
            >
              {job.status || "Pending"}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-[11px] text-zinc-500 uppercase tracking-widest font-bold">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.job?.location || "Remote"}
                </div>
              </div>
              
              {/* Visual Progress Line */}
              <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div 
                   className={`h-full transition-all duration-700 ease-out ${
                     job.status === "Selected" ? "w-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : 
                     job.status === "Rejected" ? "w-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "w-1/3 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                   }`} 
                 />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )}
</div>
      </div>

      {/* PHOTO PREVIEW */}
      {isPhotoPreviewOpen && profilePhotoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsPhotoPreviewOpen(false)}
        >
          <button className="absolute top-5 right-5">
            <X className="w-8 h-8 text-white hover:text-red-500" />
          </button>
          <img
            src={profilePhotoUrl}
            alt="Profile"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
        </div>
      )}

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;