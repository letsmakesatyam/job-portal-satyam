import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice.js';

const filterData = [
  {
    id: "location",
    name: "Location",
    options: ["Remote", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    id: "industry",
    name: "Industry",
    options: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "Data Scientist", "Graphic Designer"],
  },
  {
    id: "salary",
    name: "Salary Range",
    options: ["0-4LPA", "5-12LPA", "13-24LPA", ">24LPA"],
  },
];

const Filter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    industry: "",
    salary: ""
  });
  
  const dispatch = useDispatch();

  const changeHandler = (id, value) => {
    setSelectedFilters(prev => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    const query = `${selectedFilters.location},${selectedFilters.industry},${selectedFilters.salary}`;
    dispatch(setSearchedQuery(query));
  }, [selectedFilters, dispatch]);

  const clearAllFilters = () => {
    setSelectedFilters({ location: "", industry: "", salary: "" });
  };

  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-2xl sticky top-24 h-fit">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-white tracking-tight">Filters</h2>
        <button 
          onClick={clearAllFilters} 
          className="text-xs font-semibold text-red-500 hover:text-red-400 uppercase transition-colors"
        >
          Clear All
        </button>
      </div>

      <ScrollArea className="h-[calc(100vh-350px)] pr-4">
        {filterData.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="text-sm font-bold text-violet-500 uppercase tracking-widest mb-4">
              {section.name}
            </h3>
            <RadioGroup 
              value={selectedFilters[section.id]} 
              onValueChange={(value) => changeHandler(section.id, value)}
            >
              <div className="space-y-3">
                {section.options.map((option) => (
                  <div key={option} className="flex items-center space-x-3 group">
                    <RadioGroupItem 
                      value={option} 
                      id={`${section.id}-${option}`} 
                      className="border-zinc-700 text-violet-600 shadow focus:ring-violet-600 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 transition-all"
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
            </RadioGroup>
            <Separator className="mt-6 bg-zinc-900" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Filter;