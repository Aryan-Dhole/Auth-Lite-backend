import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅MongoDB Connected");

    } catch (err) {
        console.log("MongoDB error :", err.message);

    }
}


export default connectDB

