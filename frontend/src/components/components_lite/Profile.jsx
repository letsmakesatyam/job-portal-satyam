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
  Building2,
  MapPin,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
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

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);

  const initials =
    user?.fullName?.split(" ").map(n => n[0]).join("").toUpperCase() || "JP";

  const resumeUrl = user?.profile?.resume?.data || null;
  const profilePhotoUrl = user?.profile?.profilePhoto?.data || "";
  useEffect(() => {
    // UPDATED CONDITION: Only fetch if user exists AND is not an employer
    if (user && user?.role !== 'employer') {
        const fetchAppliedJobs = async () => {
          try {
            setJobsLoading(true);
            const res = await fetch(
              `${APPLICATION_API_ENDPOINT}/applied-jobs`,
              { credentials: "include" }
            );
    
            if (!res.ok) throw new Error("Failed to fetch applied jobs");
    
            const data = await res.json();
            setAppliedJobs(data.applications || []);
          } catch (error) {
            console.error(error);
            // This won't trigger now during logout because of the 'user' check above
            toast.error("Unable to load applied jobs");
          } finally {
            setJobsLoading(false);
          }
        };
    
        fetchAppliedJobs();
    }
  }, [user]); // Use the whole user object or user?.role as dependency

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
                  {user?.role === 'employer' && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Employer Account</Badge>
                  )}
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

          {/* SECTION HIDDEN FOR EMPLOYER */}
          {user?.role !== 'employer' && (
            <>
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
                      className="bg-zinc-800 border-white/10 gap-2 rounded-xl text-white"
                    >
                      {isPreviewOpen ? <X className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4 text-violet-400" />}
                      {isPreviewOpen ? "Close Preview" : "Preview"}
                    </Button>
                    <Button
                      onClick={downloadResume}
                      disabled={isDownloading}
                      className="bg-gradient-to-r from-red-600 to-violet-600 gap-2 rounded-xl text-white"
                    >
                      {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      {isDownloading ? "Downloading..." : "Download Resume"}
                    </Button>
                  </div>
                ) : (
                  <span className="text-gray-500 italic text-sm">Resume not uploaded</span>
                )}
              </div>
            </>
          )}

          {isPreviewOpen && resumeUrl && user?.role !== 'employer' && (
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="w-full h-[600px] border border-white/10 rounded-2xl overflow-hidden bg-white">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={resumeUrl} />
                </Worker>
              </div>
            </div>
          )}
        </div>

        {/* APPLIED JOBS TABLE SECTION - HIDDEN FOR EMPLOYER */}
        {user?.role !== 'employer' && (
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

            <div className="rounded-2xl border border-white/10 bg-zinc-900/30 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Job Role</TableHead>
                    <TableHead className="text-gray-400">Company</TableHead>
                    <TableHead className="text-right text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobsLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10">
                        <Loader2 className="w-6 h-6 animate-spin mx-auto text-violet-500" />
                      </TableCell>
                    </TableRow>
                  ) : appliedJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-gray-500 italic">
                        No jobs applied yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    appliedJobs.map((job) => (
                      <TableRow key={job._id} className="border-white/10 hover:bg-white/5 transition-colors">
                        <TableCell className="text-zinc-400 text-xs">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="font-bold text-white">
                          {job.job?.title}
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-violet-500/70" />
                            {job.job?.company?.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
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
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
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