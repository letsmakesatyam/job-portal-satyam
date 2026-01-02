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
import axios from 'axios'
import { USER_API_ENDPOINT } from './utils/data'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/authSlice'
import Profile from './components/components_lite/Profile'
const App = () => {
  const dispatch = useDispatch();
  useEffect( ()=>{
    const fetchUser = async ()=>{
      const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
        withCredentials: true,
      })
      dispatch(setUser(res.data.user));
    }
    fetchUser();
  },[])
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
        </Routes>
    </div>
  )
}

export default App


