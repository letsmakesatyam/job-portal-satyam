import React from 'react'
import Navbar from './components/components_lite/Navbar'
import { Routes, Route } from 'react-router-dom'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import Home from './components/components_lite/Home'
const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default App


