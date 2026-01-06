import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Plus, Search, Building2, ExternalLink, Loader2 } from "lucide-react";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { setCompanies } from "@/redux/companySlice"; // Import the action

const Company = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get companies from Redux instead of local state
  const { companies } = useSelector((state) => state.company);
  
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          // Store in Redux
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        toast.error("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, [dispatch]);

  // Filter logic based on Redux state
  const filteredCompanies = companies?.filter((company) => {
    if (!filterText) return true;
    return company?.name?.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Registered{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-violet-500">
                Companies
              </span>
            </h1>
            <p className="text-gray-400 mt-1">Manage and register companies to post jobs.</p>
          </div>
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-gradient-to-r from-red-600 to-violet-600 hover:opacity-90 text-white gap-2"
          >
            <Plus className="w-4 h-4" /> New Company
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Filter by name..."
            className="pl-10 bg-zinc-900 border-white/10 text-white focus-visible:ring-violet-500 max-w-sm"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-gray-300">Logo</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-right text-gray-300">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-violet-500" />
                  </TableCell>
                </TableRow>
              ) : filteredCompanies?.length > 0 ? (
                filteredCompanies.map((company) => (
                  <TableRow key={company._id} className="border-white/10 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={company.logo} />
                        <AvatarFallback className="bg-zinc-800">
                          <Building2 className="w-5 h-5 text-gray-500" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(company.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="text-gray-400 hover:text-violet-400"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                    No companies found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Company;