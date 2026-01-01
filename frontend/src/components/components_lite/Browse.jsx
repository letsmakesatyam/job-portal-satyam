import React from 'react';
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JobTemplate from './JobTemplate';

const BROWSE_RESULTS = [
  {
    id: 1,
    role: "Fullstack Developer",
    company: "Aura Systems",
    industry: "SaaS",
    location: "Remote",
    salary: "140k-180k",
    experience: "Senior",
    type: "Full-time",
    posted: "12h ago",
    description: "Architect and scale high-performance web applications using the T3 stack and AWS serverless infrastructure."
  },
  {
    id: 2,
    role: "Lead UI Engineer",
    company: "PixelCraft",
    industry: "Design",
    location: "New York",
    salary: "160k-210k",
    experience: "Lead",
    type: "Full-time",
    posted: "2d ago",
    description: "Bridge the gap between design and engineering. You will lead the development of our open-source component library."
  },
  {
    id: 3,
    role: "DevOps Architect",
    company: "SecureLink",
    industry: "Fintech",
    location: "Austin, TX",
    salary: "150k-190k",
    experience: "Senior",
    type: "Contract",
    posted: "5h ago",
    description: "Secure and automate our CI/CD pipelines while managing multi-cloud Kubernetes deployments."
  }
];

const Browse = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30">
      {/* Sticky Search Header 
          top-16: Adjust this to match your navbar height (top-20 for 80px)
          z-40: Keeps it above job cards (z-0) but below navbar (usually z-50)
      */}
      <section className="border-b border-zinc-900 bg-black sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-violet-500 transition-colors" />
              <Input 
                placeholder="Search job titles..." 
                className="pl-12 bg-zinc-900 border-zinc-800 text-white h-12 focus-visible:ring-violet-600 focus-visible:ring-offset-0 placeholder:text-zinc-600"
              />
            </div>
            <div className="relative w-full md:w-64 group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
              <Input 
                placeholder="Location" 
                className="pl-12 bg-zinc-900 border-zinc-800 text-white h-12 focus-visible:ring-red-600 focus-visible:ring-offset-0 placeholder:text-zinc-600"
              />
            </div>
            <Button className="w-full md:w-auto h-12 px-8 bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Search Results <span className="text-zinc-500 font-medium ml-2 text-lg">({BROWSE_RESULTS.length})</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BROWSE_RESULTS.map((job) => (
            <JobTemplate key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;