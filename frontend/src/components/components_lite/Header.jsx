import React from 'react';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="relative bg-black pt-16 pb-32 lg:pt-24 lg:pb-48 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full -z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-red-600/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-violet-950/40 text-violet-400 border-violet-500/20 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 mr-2" />
            #1 Job Portal for Tech Talent
          </Badge>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">Next Big</span> Opportunity
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connecting the world's best developers with top-tier companies.
          </p>

          <div className="mt-12 p-2 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-1 w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-violet-500" />
              <Input placeholder="Job title..." className="h-14 pl-12 bg-transparent border-none text-white focus-visible:ring-0" />
            </div>
            <div className="relative flex-1 w-full group border-t md:border-t-0 md:border-l border-white/10">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-red-500" />
              <Input placeholder="Location..." className="h-14 pl-12 bg-transparent border-none text-white focus-visible:ring-0" />
            </div>
            <Button className="w-full md:w-auto h-14 px-10 bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 font-bold">
              Search Jobs
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;