import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null, // Used for CompanySetup and Edit
        companies: [],       // Used for the Companies list table
    },
    reducers: {
        // Sets the specific company data for setup/editing
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        // Sets the array of all companies for the admin dashboard
        setCompanies: (state, action) => {
            state.companies = action.payload;
        }
    }
});

export const { setSingleCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer;