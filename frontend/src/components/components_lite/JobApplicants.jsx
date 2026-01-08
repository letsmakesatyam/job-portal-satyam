import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2, Mail, Download, MoreVertical, CheckCircle2, XCircle, Clock } from "lucide-react";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];

const JobApplicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]); 
  const [jobInfo, setJobInfo] = useState(null); 
  const [isDownloading, setIsDownloading] = useState(null);

  const getInitialData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${APPLICATION_API_ENDPOINT}/applicants/${params.id}`, {
        withCredentials: true,
      });
      const jobRes = await axios.get(`${JOB_API_ENDPOINT}/get/${params.id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setApplicants(res.data.applicants);
      }
      if (jobRes.data.success) {
        setJobInfo(jobRes.data.job);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applicants data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInitialData();
  }, [params.id]);

  // Download Logic from Profile
  const downloadResume = async (resumeUrl, originalName, applicantId) => {
    if (!resumeUrl) return;
    try {
      setIsDownloading(applicantId);
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", originalName || "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download started");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download resume");
    } finally {
      setIsDownloading(null);
    }
  };

  // Status Update Logic
  const statusHandler = async (status, id) => {
    try {
      const res = await axios.patch(`${APPLICATION_API_ENDPOINT}/status/${id}`, { status }, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        // Refresh data to show updated status
        getInitialData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/jobs")}
            className="text-gray-400 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applicants</h1>
            <p className="text-gray-400 text-sm">
              Review candidates for <span className="text-violet-400 font-semibold">{jobInfo?.title || "Loading..."}</span>
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-500 text-xs uppercase font-bold mb-1 tracking-widest">Total Applied</p>
            <p className="text-4xl font-black text-white">{applicants?.length || 0}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-500 text-xs uppercase font-bold mb-1 tracking-widest">Job Type</p>
            <p className="text-xl font-bold text-red-500">{jobInfo?.jobType || "N/A"}</p>
          </div>
          <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl">
            <p className="text-gray-500 text-xs uppercase font-bold mb-1 tracking-widest">Location</p>
            <p className="text-xl font-bold text-violet-500">{jobInfo?.location || "N/A"}</p>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/20 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-gray-300">Candidate</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Resume</TableHead>
                <TableHead className="text-gray-300">Applied Date</TableHead>
                <TableHead className="text-gray-300 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants && applicants.length > 0 ? (
                applicants.map((item) => (
                  <TableRow key={item._id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-600 to-red-600 flex items-center justify-center text-sm font-bold uppercase">
                          {item.applicant?.fullName?.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-white">{item.applicant?.fullName}</span>
                           <Badge variant="outline" className={`w-fit text-[10px] h-4 mt-1 ${
                                item.status === 'accepted' ? 'text-emerald-500 border-emerald-500/20' : 
                                item.status === 'rejected' ? 'text-red-500 border-red-500/20' : 
                                'text-blue-500 border-blue-500/20'
                            }`}>
                                {item.status || 'pending'}
                            </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-600" />
                        {item.applicant?.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.applicant?.profile?.resume ? (
                        <button
                          onClick={() => downloadResume(
                            item.applicant.profile.resume.data || item.applicant.profile.resume, 
                            item.applicant.profile.resumeOriginalName, 
                            item._id
                          )}
                          disabled={isDownloading === item._id}
                          className="text-violet-400 hover:text-violet-300 flex items-center gap-2 transition-colors w-fit disabled:opacity-50"
                        >
                          {isDownloading === item._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">Download</span>
                        </button>
                      ) : (
                        <span className="text-gray-600 italic">No Resume</span>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 bg-zinc-900 border-white/10 p-1 shadow-2xl">
                          <div className="flex flex-col gap-1">
                            {shortlistingStatus.map((status, index) => (
                              <div
                                key={index}
                                onClick={() => statusHandler(status.toLowerCase(), item._id)}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer rounded-md transition-colors"
                              >
                                {status === "Accepted" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                                <span>{status}</span>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center text-gray-500">
                    No applicants found for this job.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default JobApplicants;