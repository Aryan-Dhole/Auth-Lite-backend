import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"


const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User already exists" })

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed });

        res.status(201).json({ message: "Registered", id: user._id });

    } catch (err) {
        console.error(err)
        res.status(501).json({ msg: "Error", error: err.message });
    }
})

router.get("/api/ping", (req, res) => {
    res.json(
        { message: "still alive. day 108 active" }
    )
})

export default router;

