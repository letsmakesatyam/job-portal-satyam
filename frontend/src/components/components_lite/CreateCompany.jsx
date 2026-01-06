import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Building2, ArrowLeft, Loader2, Rocket, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State updated to include email as per your controller requirements
  const [input, setInput] = useState({
    name: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);

  const registerNewCompany = async () => {
    // Validation aligned with your backend: if (!name || !email)
    if (!input.name.trim() || !input.email.trim()) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { 
          name: input.name,   // Changed from companyName to name
          email: input.email  // Added email
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to register company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-2xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/companies")}
          className="mb-8 text-gray-400 hover:text-white hover:bg-white/5 gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Button>

        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-black tracking-tight">
            Register{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">
              Company
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Provide the basic details to get started with your hiring portal.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <div className="space-y-6">
            {/* COMPANY NAME INPUT */}
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Company Name
              </Label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="e.g. Microsoft"
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white text-lg focus-visible:ring-violet-500 rounded-2xl"
                  value={input.name}
                  onChange={(e) => setInput({...input, name: e.target.value})}
                />
              </div>
            </div>

            {/* COMPANY EMAIL INPUT (Required by your controller) */}
            <div className="space-y-3">
              <Label className="text-sm font-bold uppercase tracking-widest text-gray-500">
                Official Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="hr@company.com"
                  className="pl-12 h-14 bg-white/5 border-white/10 text-white text-lg focus-visible:ring-violet-500 rounded-2xl"
                  value={input.email}
                  onChange={(e) => setInput({...input, email: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/companies")}
                className="flex-1 h-12 border-white/10 bg-transparent text-white hover:bg-white/5 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={registerNewCompany}
                disabled={loading}
                className="flex-[2] h-12 bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 text-white font-bold rounded-xl gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Continue
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;