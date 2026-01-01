import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { logout } from "@/redux/authSlice";

const Navbar = () => {
  // In a real app, you'd get this from Redux (e.g., useSelector((state) => state.auth))
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogout = async () => {
  try {
    await axios.post(
      `${USER_API_ENDPOINT}/logout`,
      {},
      { withCredentials: true }
    )
    dispatch(logout())
    navigate("/login")
  } catch {
    // optional toast
    toast.error("Logout failed");
  }
}


  return (
    // Using a solid black background
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-violet-600 to-red-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">
            JOB
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">
              PORTAL
            </span>
          </h1>
        </Link>

        {/* Navigation & Profile */}
        <div className="flex items-center gap-8">
          {/* Desktop Menu */}
          <ul className="hidden md:flex font-medium items-center gap-8 text-gray-400">
            <li>
              <Link
                to="/"
                className="hover:text-red-500 transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="hover:text-violet-400 transition-colors relative group"
              >
                Browse
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="hover:text-violet-400 transition-colors relative group"
              >
                Jobs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all group-hover:w-full"></span>
              </Link>
            </li>
          </ul>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-red-500 hover:bg-white/5"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-red-600 to-violet-600 text-white hover:opacity-90 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer border-2 border-violet-500/50 hover:border-red-500 transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-slate-800 text-white">
                      SR
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-72 mt-2 p-0 bg-zinc-900 border-white/10 shadow-2xl overflow-hidden">
                  {/* Popover Header */}
                  <div className="bg-gradient-to-r from-violet-900/50 to-red-900/50 p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-white leading-none">
                          Satyam Revgade
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Software Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Popover Actions */}
                  <div className="p-2 space-y-1">
                    <Link to="/profile">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                        <User2 className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-medium">
                          View Profile
                        </span>
                      </div>
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-md
             text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
