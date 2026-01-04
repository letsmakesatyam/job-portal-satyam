import React, {useEffect} from "react";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/data.js";
import { useDispatch } from "react-redux";
import { setAllJobs } from "../redux/jobSlice.js";
const useGetAllJobs = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchJobs = async()=>{
            try{
                const response = await axios.get(`${JOB_API_ENDPOINT}/get`,
                    {
                        withCredentials: true,
                    },
                );
                if(response.data.success){
                    dispatch(setAllJobs(response.data.jobs));
                }
                console.log(response.data.jobs)
            }
            catch(error){
                console.log(error);
            }
           
            

        }
        fetchJobs();

    },[])
}
export default useGetAllJobs;