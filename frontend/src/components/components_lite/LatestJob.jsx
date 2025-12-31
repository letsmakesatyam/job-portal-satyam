import React from 'react'
import JobCard from './JobCard'

const latestJobs = [1, 2, 3, 4, 5, 6]; // Placeholder data for UI

const LatestJob = () => {
  return (
    <section className="max-w-7xl mx-auto my-20 px-4">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white">
          Latest & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">Top</span> Job Openings
        </h1>
        <div className="h-1.5 w-20 bg-violet-600 mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          latestJobs.map((item, index) => (
            <JobCard key={index} />
          ))
        }
      </div>
    </section>
  )
}

export default LatestJob