import React from 'react'
import Navbar from './components/components_lite/Navbar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy'
import TermsAndCondition from './components/components_lite/TermsAndCondition'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/privacy" element={<PrivacyPolicy/>}/>
            <Route path="/terms" element={<TermsAndCondition/>}/>
        </Routes>
    </div>
  )
}

export default App


