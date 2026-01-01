import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const filterData = [
  {
    id: "location",
    name: "Location",
    options: ["Remote", "New York", "San Francisco", "London", "Bangalore"],
  },
  {
    id: "industry",
    name: "Industry",
    options: ["Fintech", "Healthtech", "EdTech", "E-commerce", "SaaS"],
  },
  {
    id: "experience",
    name: "Experience Level",
    options: ["Entry Level", "Intermediate", "Senior", "Lead / Management"],
  },
  {
    id: "salary",
    name: "Salary Range",
    options: ["0-40k", "40-80k", "80-120k", "120k-200k", "200k+"],
  },
];

const Filter = () => {
  return (
    /* Changed top-8 to top-24 to account for Navbar height */
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-white tracking-tight">Filters</h2>
        <button className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors uppercase">
          Clear All
        </button>
      </div>

      <ScrollArea className="h-[calc(100vh-350px)] pr-4">
        {filterData.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="text-sm font-bold text-violet-500 uppercase tracking-widest mb-4">
              {section.name}
            </h3>
            <div className="space-y-3">
              {section.options.map((option) => (
                <div key={option} className="flex items-center space-x-3 group">
                  <Checkbox 
                    id={`${section.id}-${option}`} 
                    className="border-zinc-700 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                  />
                  <Label 
                    htmlFor={`${section.id}-${option}`} 
                    className="text-sm font-medium text-zinc-400 group-hover:text-zinc-100 cursor-pointer transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            <Separator className="mt-6 bg-zinc-900" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Filter;