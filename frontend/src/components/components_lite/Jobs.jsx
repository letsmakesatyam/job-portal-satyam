import React from 'react';
import Filter from './Filter';
import JobTemplate from './JobTemplate';

const ALL_JOBS = [
  {
    id: 1,
    role: "Senior React Developer",
    company: "Nexus Labs",
    industry: "SaaS",
    location: "Remote",
    salary: "120k-200k",
    experience: "Senior",
    type: "Full-time",
    posted: "1d ago",
    description: "We are looking for a performance-oriented React developer to lead our frontend architecture and optimize core user workflows.",
    requirements: ["5+ years React experience", "Expertise in TypeScript", "State management (Zustand/Redux)"]
  },
  {
    id: 2,
    role: "Product Designer",
    company: "Vortex UI",
    industry: "E-commerce",
    location: "New York",
    salary: "80k-120k",
    experience: "Intermediate",
    type: "Contract",
    posted: "4h ago",
    description: "Join our design team to craft high-conversion e-commerce experiences for global fashion brands using Figma and Protopie.",
    requirements: ["Strong portfolio in UI/UX", "Experience with Design Systems", "User research skills"]
  },
  {
    id: 3,
    role: "Backend Engineer",
    company: "CloudCore",
    industry: "Fintech",
    location: "San Francisco",
    salary: "200k+",
    experience: "Lead / Management",
    type: "Full-time",
    posted: "2d ago",
    description: "Scale our financial transaction engine. You will be responsible for low-latency systems and high-availability database clusters.",
    requirements: ["Go or Rust mastery", "PostgreSQL optimization", "Microservices architecture"]
  },
];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-zinc-900 pb-10">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">
              Find <span className="text-violet-600">Work</span>
            </h1>
            <p className="text-zinc-500 font-medium mt-2 max-w-md">
              The premier board for high-impact roles in engineering and design.
            </p>
          </div>
          <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
             <p className="text-xs font-mono text-zinc-400">Total Positions: {ALL_JOBS.length}</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-80 shrink-0">
            <Filter />
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {ALL_JOBS.map((job) => (
                <JobTemplate key={job.id} job={job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;