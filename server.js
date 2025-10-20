import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js"
import router from "./routes/auth.js"
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors"


dotenv.config();
connectDB();


const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use("/api/auth", router)
app.use(errorHandler)


app.listen(process.env.PORT || 5000, console.log("✅ Server Up"))

