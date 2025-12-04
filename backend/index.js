import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5121',
    credentials: true,
};
app.use(cors(corsOptions));



const PORT=5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
