import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, MapPin, DollarSign, BriefcaseBusiness } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const JobCard = () => {
  return (
    /* Glassmorphism effect: bg-white/5 and backdrop-blur */
    <div className="p-6 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-2xl hover:border-red-500/50 transition-all duration-500 group relative overflow-hidden">
      
      {/* Subtle hover glow inside the card */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-violet-600/10 blur-[80px] group-hover:bg-red-600/20 transition-all duration-700"></div>

      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs font-medium text-zinc-500">Posted 12h ago</span>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-zinc-400 hover:text-violet-400">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-6 relative z-10">
        <Avatar className="h-12 w-12 rounded-xl border border-white/10">
          <AvatarImage src="https://logo.clearbit.com/netflix.com" />
          <AvatarFallback>NX</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold text-white text-lg">Netflix</h3>
          <div className="flex items-center text-zinc-500 text-xs">
            <MapPin className="w-3 h-3 mr-1" /> Los Angeles, CA
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-violet-500 transition-all">
          Senior UI Designer
        </h2>
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          We are looking for a creative visionary to lead our design systems and user experience.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6 relative z-10">
        <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20 transition-colors">
          <BriefcaseBusiness className="w-3 h-3 mr-1" /> Full Time
        </Badge>
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20 transition-colors">
          <DollarSign className="w-3 h-3 mr-1" /> 180k - 240k
        </Badge>
      </div>

      <Button className="w-full mt-6 bg-zinc-900 border border-white/10 text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-violet-600 hover:border-transparent transition-all duration-500 py-6 rounded-2xl font-bold">
        Apply Now
      </Button>
    </div>
  )
}

export default JobCard