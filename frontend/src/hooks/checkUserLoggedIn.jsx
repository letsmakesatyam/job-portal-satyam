import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data.js";
import { setUser } from '../redux/authSlice.js'

// Example logic for your hook
// hooks/checkUserLoggedIn.js
const checkUserLoggedIn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/me`, {
          withCredentials: true,
        });
        
        console.log("Auth Response Data:", res.data); // DEBUGGING

        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (err) {
        console.error("Auth Hook Error:", err.response?.data || err.message);
        dispatch(setUser(null));
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default checkUserLoggedIn;