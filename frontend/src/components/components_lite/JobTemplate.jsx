import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Briefcase, DollarSign, Zap, Building2 } from "lucide-react";

const JobTemplate = ({ job }) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800 hover:border-violet-500/50 transition-all duration-300 group overflow-hidden flex flex-col">
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start">
          <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-violet-500/30 transition-colors">
            <Building2 className="w-6 h-6 text-violet-500" />
          </div>
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            {job.type}
          </Badge>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-violet-400 transition-colors">
            {job.role}
          </h3>
          <p className="text-zinc-400 font-medium text-sm mt-1">{job.company} • {job.industry}</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-grow">
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-zinc-400 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-violet-500" /> {job.location}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-violet-500" /> {job.salary}
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-violet-500" /> {job.experience}
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-violet-500" /> {job.posted}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase text-zinc-500 tracking-widest">Description</h4>
          <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
            {job.description}
          </p>
        </div>
        {/* Key Requirements section removed here */}
      </CardContent>

      <CardFooter className="pt-4 border-t border-zinc-900">
        <Button className="w-full bg-violet-600 text-white hover:bg-violet-700 transition-all font-bold shadow-[0_0_20px_rgba(139,92,246,0.15)]">
          View Full Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobTemplate;