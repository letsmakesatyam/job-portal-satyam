import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data.js";
import { setUser } from '../redux/authSlice.js'

const checkUserLoggedIn = ()=>{
    const dispatch= useDispatch();
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
              withCredentials: true,
            })
            dispatch(setUser(res.data.user));
            console.log(res.data.user)
            
          }
          fetchUser();
    },[])
}

export default checkUserLoggedIn;