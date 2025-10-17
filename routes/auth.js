import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"
import { generateToken } from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User already exists" })

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashed });
        const token = generateToken(user._id)

        res.status(201).json({ message: "Registered", id: user._id, token });

    } catch (err) {
        console.error(err)
        res.status(501).json({ msg: "Error", error: err.message });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

    const token = generateToken(user._id);
    res.json({ message: "Login successful", token })
})


router.get("/profile", protect, (req, res) => {
    res.json(
        { message: "Profile accessed", user: req.user }
    )
})

export default router;

