import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User2 } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation & Profile */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-gray-600">
            <Link to="/"><li className="hover:text-[#F83002] cursor-pointer transition-colors">Home</li></Link>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Browse</li>
            <li className="hover:text-[#F83002] cursor-pointer transition-colors">Jobs</li>
          </ul>
           {!user?<div className="flex items-center gap-2">
             <Link to="/login"><Button variant="ghost">Login</Button></Link>
             <Link to="/register"><Button className="bg-[#F83002] text-white hover:bg-[#F83002]/90">Register</Button></Link>
           </div> : <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer border border-gray-200">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 shadow-lg mr-4">
              <div className="flex gap-4 space-y-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-lg">Satyam Revgade</h4>
                  <p className="text-sm text-muted-foreground leading-none">
                    Software Developer
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 text-gray-600">
                <div className="flex w-full items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-all">
                  <User2 className="w-4 h-4" />
                  <Button variant="link" className="p-0 h-auto font-normal focus-visible:ring-0 focus-visible:ring-offset-0">View Profile</Button>
                </div>
                <div className="flex w-full items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-all text-red-600">
                  <LogOut className="w-4 h-4" />
                  <Button variant="link" className="p-0 h-auto font-normal text-red-600">Logout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>}

          
        </div>
      </div>
    </div>
  );
};

export default Navbar;