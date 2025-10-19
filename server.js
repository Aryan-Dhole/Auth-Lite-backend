import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js"
import authRoutes from "./routes/auth.js"
import { errorHandler } from "./middleware/errorHandler.js";


dotenv.config();
connectDB();


const app = express()
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use(errorHandler)


app.listen(process.env.PORT || 5000, console.log("✅ Server Up"))

