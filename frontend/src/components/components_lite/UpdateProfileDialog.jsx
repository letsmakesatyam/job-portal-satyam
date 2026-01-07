import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Helper to determine role
  const isEmployer = user?.role === "employer";

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: user?.profile?.profilePhoto || null,
    resume: user?.profile?.resume || null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileEventHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const resumeEventHandler = (e) => {
    setInput({ ...input, resume: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    // Only append Seeker-specific fields if the user is not an employer
    if (!isEmployer) {
      formData.append("skills", input.skills);
      if (input.file) formData.append("profilePhoto", input.file);
      if (input.resume) formData.append("resume", input.resume);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_ENDPOINT}/update-profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="sm:max-w-[425px] bg-[#0a0a0a] border-white/10 text-white" 
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-500 to-violet-500 bg-clip-text text-transparent">
            Update Profile
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">Name</Label>
              <Input id="fullName" name="fullName" value={input.fullName} onChange={changeEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
              <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
            </div>

            {/* CONDITIONAL FIELDS FOR STUDENTS/SEEKERS ONLY */}
            {!isEmployer && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">Skills</Label>
                  <Input id="skills" name="skills" placeholder="React, Node, CSS" value={input.skills} onChange={changeEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Photo</Label>
                  <Input type="file" accept="image/*" onChange={fileEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Resume</Label>
                  <Input type="file" accept="application/pdf" onChange={resumeEventHandler} className="col-span-3 bg-zinc-900 border-white/10" />
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full bg-violet-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90">
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;