import React, { useState } from 'react';
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import JobTemplate from './JobTemplate';
import { useSelector } from 'react-redux';

const Browse = () => {
  const allJobs = useSelector((state) => state.job.allJobs);
  
  // Local state for search queries
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Filter logic
  const filteredJobs = allJobs?.filter((job) => {
    const matchesTitle = job?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = job?.location?.toLowerCase().includes(locationQuery.toLowerCase());
    
    return matchesTitle && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30">
      {/* Sticky Search Header */}
      <section className="border-b border-zinc-900 bg-black sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Title Search */}
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-violet-500 transition-colors" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job titles (e.g. Frontend, Backend)..." 
                className="pl-12 bg-zinc-900 border-zinc-800 text-white h-12 focus-visible:ring-violet-600 focus-visible:ring-offset-0 placeholder:text-zinc-600"
              />
            </div>

            {/* Location Search */}
            <div className="relative w-full md:w-64 group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
              <Input 
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location..." 
                className="pl-12 bg-zinc-900 border-zinc-800 text-white h-12 focus-visible:ring-red-600 focus-visible:ring-offset-0 placeholder:text-zinc-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Search Results <span className="text-zinc-500 font-medium ml-2 text-lg">({filteredJobs?.length || 0})</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            filteredJobs?.length > 0 ? (
              filteredJobs.map((job) => (
                <JobTemplate key={job._id} job={job} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-zinc-500 text-xl font-medium">No jobs found matching your criteria.</p>
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
};

export default Browse;