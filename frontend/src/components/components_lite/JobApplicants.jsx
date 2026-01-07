import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Loader2, Mail, FileText, MoreVertical, ExternalLink } from "lucide-react";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const JobApplicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]); // Array of applications
  const [jobInfo, setJobInfo] = useState(null); // Separate state for job details

  useEffect(() => {
    const getInitialData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Applicants
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/applicants/${params.id}`, {
          withCredentials: true,
        });

        // 2. Fetch Job Details (to get title/type for the header)
        const jobRes = await axios.get(`${JOB_API_ENDPOINT}/get/${params.id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setApplicants(res.data.applicants);
          console.log(res.data.applicants);
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
    getInitialData();
  }, [params.id]);

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
                <TableHead className="text-gray-300 text-right">Status</TableHead>
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
                        <span className="text-white">{item.applicant?.fullName}</span>
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
    <a 
      href={item.applicant.profile.resume} 
      target="_blank" 
      rel="noopener noreferrer"
      // This prevents the click from bubbling up to the TableRow
      onClick={(e) => e.stopPropagation()} 
      className="text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors w-fit"
    >
      <FileText className="w-4 h-4" /> 
      <span>View Resume</span> 
      <ExternalLink className="w-3 h-3"/>
    </a>
  ) : (
    <span className="text-gray-600 italic">No Resume</span>
  )}
</TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${
                        item.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        item.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      } capitalize border`}>
                        {item.status || 'pending'}
                      </Badge>
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