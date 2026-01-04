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
  Loader2
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
        setAppliedJobs(data.jobs || []);
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

        {/* APPLIED JOBS */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold">Applied Jobs</h2>
          </div>

          {jobsLoading ? (
            <div className="text-gray-400 italic">Loading applied jobs...</div>
          ) : appliedJobs.length === 0 ? (
            <div className="text-gray-500 italic">No jobs applied yet</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appliedJobs.map((job) => (
                <Card
                  key={job._id}
                  className="bg-zinc-900 border-white/5 hover:border-red-500/50 transition-all"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-lg font-bold">
                      {job.job?.title}
                    </CardTitle>
                    <Badge
                      className={
                        job.status === "Selected"
                          ? "bg-green-500/20 text-green-400"
                          : job.status === "Rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }
                    >
                      {job.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span className="text-gray-300">
                        {job.job?.company?.name}
                      </span>
                      <span>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
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
