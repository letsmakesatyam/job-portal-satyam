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
import AdminJobs from './components/components_lite/AdminJobs'
import PostJob from './components/components_lite/PostJob'
import JobApplicants from './components/components_lite/JobApplicants'
import ProtectedRoute from './components/components_lite/ProtectedRoute'
const App = () => {
  checkUserLoggedIn();
  useGetAllJobs();
  
  return (
    <div>
        <Navbar/>
        <Routes>
            {/* --- Public Routes (Accessible to everyone) --- */}
            
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/privacy" element={<PrivacyPolicy/>}/>
            <Route path="/terms" element={<TermsAndCondition/>}/>

            {/* --- Protected Student/User Routes --- */}
            <Route path="/jobs" element={
                <ProtectedRoute><Jobs/></ProtectedRoute>
            }/>
            <Route path="/" element={
                <ProtectedRoute><Home/></ProtectedRoute>
            }/>
            <Route path="/browse" element={
                <ProtectedRoute><Browse/></ProtectedRoute>
            }/>
            <Route path="/description/:id" element={
                <ProtectedRoute><JobDescription /></ProtectedRoute>
            } />
            <Route path="/profile" element={
                <ProtectedRoute><Profile/></ProtectedRoute>
            }/>

            {/* --- Protected Admin Routes --- */}
            <Route path="/admin/companies" element={
                <ProtectedRoute><Company/></ProtectedRoute>
            }/>
            <Route path="/admin/companies/create" element={
                <ProtectedRoute><CreateCompany/></ProtectedRoute>
            }/>
            <Route path="/admin/companies/:id" element={
                <ProtectedRoute><CompanySetup /></ProtectedRoute>
            } />
            <Route path="/admin/jobs" element={
                <ProtectedRoute><AdminJobs/></ProtectedRoute>
            }/>
            <Route path="/admin/jobs/create" element={
                <ProtectedRoute><PostJob/></ProtectedRoute>
            }/>
            <Route path="/admin/jobs/:id/applicants" element={
                <ProtectedRoute><JobApplicants /></ProtectedRoute>
            } />
        </Routes>
    </div>
  )
}
export default App


