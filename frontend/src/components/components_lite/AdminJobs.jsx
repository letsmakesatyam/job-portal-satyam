import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit2, 
  Eye, 
  Check, 
  ChevronsUpDown,
  Briefcase
} from "lucide-react";
import { JOB_API_ENDPOINT, COMPANY_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AdminJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all admin jobs and companies for the filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobsRes, companiesRes] = await Promise.all([
          axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, { withCredentials: true }),
          axios.get(`${COMPANY_API_ENDPOINT}/get`, { withCredentials: true })
        ]);

        if (jobsRes.data.success) {
          setJobs(jobsRes.data.jobs);
          setFilteredJobs(jobsRes.data.jobs);
        }
        if (companiesRes.data.success) {
          setCompanies(companiesRes.data.companies);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = jobs;

    // Filter by Company
    if (selectedCompany) {
      result = result.filter(job => job.company?._id === selectedCompany._id || job.company === selectedCompany._id);
    }

    // Filter by Search Title/Role
    if (searchQuery.trim() !== "") {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [selectedCompany, searchQuery, jobs]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Jobs</h1>
            <p className="text-gray-400">Manage and track all your posted job opportunities.</p>
          </div>
          <Button 
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 text-white gap-2"
          >
            <Plus className="w-4 h-4" /> Post New Job
          </Button>
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-900/40 p-4 rounded-xl border border-white/5">
          {/* Search by Role */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Filter by job title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border-white/10 pl-10 focus:ring-violet-500"
            />
          </div>

          {/* Company Selector */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="justify-between bg-zinc-900 border-white/10 text-gray-400 hover:bg-zinc-800 hover:text-white"
              >
                {selectedCompany ? selectedCompany.name : "Select Company..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-zinc-950 border-white/10">
              <Command className="bg-zinc-950">
                <CommandInput placeholder="Search company..." className="text-white" />
                <CommandList>
                  <CommandEmpty>No company found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setSelectedCompany(null);
                        setPopoverOpen(false);
                      }}
                      className="text-white hover:bg-white/10"
                    >
                      <Check className={cn("mr-2 h-4 w-4", !selectedCompany ? "opacity-100" : "opacity-0")} />
                      All Companies
                    </CommandItem>
                    {companies.map((company) => (
                      <CommandItem
                        key={company._id}
                        onSelect={() => {
                          setSelectedCompany(company);
                          setPopoverOpen(false);
                        }}
                        className="text-white hover:bg-white/10"
                      >
                        <Check className={cn("mr-2 h-4 w-4", selectedCompany?._id === company._id ? "opacity-100" : "opacity-0")} />
                        {company.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Jobs Table */}
        <div className="rounded-xl border border-white/10 bg-zinc-900/20 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-gray-300">Job Role</TableHead>
                <TableHead className="text-gray-300">Company</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow key={job._id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-white">{job.title}</span>
                        <span className="text-xs text-gray-500">{job.position} Positions</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-violet-500/50 text-violet-400 bg-violet-500/5">
                        {job.company?.name || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-400 text-sm">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">
                        {job.jobType}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-800 text-gray-400">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-950 border-white/10 text-white">
                          <DropdownMenuItem 
                            onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                            className="gap-2 cursor-pointer focus:bg-white/10"
                          >
                            <Edit2 className="w-4 h-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                            className="gap-2 cursor-pointer focus:bg-white/10"
                          >
                            <Eye className="w-4 h-4" /> View Applicants
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <Briefcase className="w-10 h-10 opacity-20" />
                      <p>No jobs found matching your criteria.</p>
                    </div>
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

export default AdminJobs;