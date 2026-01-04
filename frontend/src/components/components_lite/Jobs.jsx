import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import JobTemplate from './JobTemplate';
import { useSelector } from 'react-redux';

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      // Split the combined query into individual domain values
      const [loc, ind, sal] = searchedQuery.split(",");

      const filteredJobs = allJobs.filter((job) => {
        // Condition checks: If a filter isn't selected, it defaults to 'true'
        const matchesLocation = loc ? job?.location?.toLowerCase() === loc.toLowerCase() : true;
        
        // Check industry against job title or description
        const matchesIndustry = ind ? (
          job?.title?.toLowerCase().includes(ind.toLowerCase()) || 
          job?.description?.toLowerCase().includes(ind.toLowerCase())
        ) : true;

        const matchesSalary = sal ? job?.salary?.toString().toLowerCase().includes(sal.toLowerCase()) : true;

        // "AND" Logic: All conditions must be true
        return matchesLocation && matchesIndustry && matchesSalary;
      });

      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-violet-500/30">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-zinc-900 pb-10">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">
              Find <span className="text-violet-600">Work</span>
            </h1>
            <p className="text-zinc-500 font-medium mt-2 max-w-md">
              The premier board for high-impact roles.
            </p>
          </div>
          <div className="bg-zinc-900 px-4 py-2 rounded-full border border-zinc-800">
             <p className="text-xs font-mono text-zinc-400">Matching Positions: {filterJobs?.length || 0}</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-80 shrink-0">
            <Filter />
          </aside>
          <main className="flex-1">
            {filterJobs?.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filterJobs.map((job) => (
                  <div key={job._id}><JobTemplate job={job} /></div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 rounded-3xl text-zinc-500">
                No jobs match all selected criteria.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;