import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/data.js";
import { setUser } from '../redux/authSlice.js'

// Example logic for your hook
const checkUserLoggedIn = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Your API call here
        const res = await axios.get('/api/me');
        dispatch(setUser(res.data.user));
      } catch (err) {
        dispatch(setUser(null)); // This should set isLoading to false
      }
    };
    fetchUser();
  }, []);
};

export default checkUserLoggedIn;