import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import useRouter from "./routes/user.routes.js";
import useComponyRouter from "./routes/company.routes.js"
import useJobRouter from './routes/job.routes.js'
import ApplicationRouter from './routes/application.routes.js'
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173', "https://job-portal-satyam.onrender.com"],
    
    credentials: true,
};
app.use(cors(corsOptions));


//api 
app.use("/api/users", useRouter);
app.use("/api/company", useComponyRouter)
app.use("/api/job", useJobRouter)
app.use("/api/application", ApplicationRouter);


const PORT=process.env.PORT || 5001;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
startServer();
