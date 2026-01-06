import React , {useEffect} from 'react'
import Navbar from './components/components_lite/Navbar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy'
import TermsAndCondition from './components/components_lite/TermsAndCondition'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'
import Profile from './components/components_lite/Profile'
import checkUserLoggedIn from './hooks/checkUserLoggedIn'
import useGetAllJobs from './hooks/useGetAllJobs'
import JobDescription from './components/components_lite/JobDescription'
import Company from "./components/components_lite/Company"
import CreateCompany from './components/components_lite/CreateCompany'
import CompanySetup from './components/components_lite/CompanySetup'
const App = () => {
  checkUserLoggedIn();
  useGetAllJobs();
  
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/privacy" element={<PrivacyPolicy/>}/>
            <Route path="/terms" element={<TermsAndCondition/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
            <Route path="/browse" element={<Browse/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/description/:id" element={<JobDescription />} />
            <Route path="/admin/companies" element={<Company/>}/>
            <Route path="/admin/companies/create" element={<CreateCompany/>}/>
            <Route path="/admin/companies/:id" element={<CompanySetup />} />

        </Routes>
    </div>
  )
}

export default App


