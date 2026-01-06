import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import jobReducer from "./jobSlice.js"
import companyReducer from "./companySlice.js"
const store = configureStore({
    reducer: {
        auth : authReducer,
        job : jobReducer,
        company: companyReducer,
    }
});
export default store