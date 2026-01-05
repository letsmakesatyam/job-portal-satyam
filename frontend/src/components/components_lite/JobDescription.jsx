import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from '@/utils/data';
import { ArrowLeft, MapPin, Briefcase, IndianRupee, Users, Calendar, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const JobDescription = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // IMPORTANT: Ensure this ID matches the one in your database for the logged-in user
    // Ideally, get this from your Redux store or Auth Context
    const user = { _id: "current_user_id" }; 
    const isApplied = job?.applications?.some(app => app.applicant === user?._id || app === user?._id) || false;

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setJob(res.data.job);
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetail();
    }, [id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(`${APPLICATION_API_ENDPOINT}/apply`, 
                { jobId: id }, 
                { withCredentials: true }
            );
    
            // Check for status 201 or res.data.success
            if (res.status === 201 || res.data.success) {
                toast.success(res.data.message || "Applied successfully!");
                
                // Update local state to increment applicant count and disable button
                setJob(prev => ({ 
                    ...prev, 
                    applications: [...(prev.applications || []), { applicant: user._id }] 
                }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
        </div>
    );
    
    if (!job) return <div className="text-white text-center mt-20">Job not found.</div>;

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 pt-10 relative z-10">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-8 text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
                </Button>

                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <Badge className="bg-violet-950/40 text-violet-400 border-violet-500/20 px-4 py-1">
                                <Sparkles className="h-3 w-3 mr-2" />
                                {job.company?.name || "Premium Company"}
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap gap-3">
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-3 py-1">{job.position} Positions</Badge>
                                <Badge className="bg-red-500/10 text-red-400 border-red-500/20 px-3 py-1">{job.jobType}</Badge>
                                <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 px-3 py-1">{job.salary} LPA</Badge>
                            </div>
                        </div>

                        <Button 
                            disabled={isApplied}
                            onClick={applyJobHandler}
                            className={`h-16 px-10 text-lg font-bold rounded-2xl transition-all duration-300 shadow-lg 
                                ${isApplied 
                                    ? 'bg-zinc-800 text-gray-500 cursor-not-allowed border border-white/10 shadow-none' 
                                    : 'bg-gradient-to-r from-red-600 to-violet-600 hover:scale-105 hover:brightness-110 active:scale-95 shadow-violet-600/20'
                                }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="p-2 bg-white/5 rounded-lg"><MapPin size={18} className="text-red-500"/></div>
                            <div><p className="text-xs">Location</p><p className="text-white font-medium">{job.location}</p></div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="p-2 bg-white/5 rounded-lg"><Briefcase size={18} className="text-violet-500"/></div>
                            <div><p className="text-xs">Experience</p><p className="text-white font-medium">{job.experience} Years</p></div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="p-2 bg-white/5 rounded-lg"><Users size={18} className="text-red-500"/></div>
                            <div><p className="text-xs">Applicants</p><p className="text-white font-medium">{job.applications?.length || 0}</p></div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="p-2 bg-white/5 rounded-lg"><Calendar size={18} className="text-violet-500"/></div>
                            <div><p className="text-xs">Posted Date</p><p className="text-white font-medium">{job.createdAt?.split("T")[0]}</p></div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-8 px-4">
                    <section>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <div className="w-1.5 h-8 bg-gradient-to-b from-red-600 to-violet-600 rounded-full" />
                            Role Description
                        </h2>
                        <div className="mt-6 text-gray-400 leading-relaxed text-lg whitespace-pre-line">
                            {job.description}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;