import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"
import { generateToken } from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";
import { body, validationResult } from "express-validator";


const router = express.Router()

router.post("/register",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be 6+ chars")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: "Validation error", errors: errors.array() });

        const { email, password } = req.body
        try {
            const existing = await User.findOne({ email });
            if (existing) return res.status(400).json({ message: "Email already registered" });

            const user = await User.create({ email, password });
            const token = generateToken(user._id);
            res.status(201).json({ message: "Registered", id: user._id, token });

        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
)

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

router.get("/test-error", (req, res, next) => {
    next(new Error("This is a test error for middleware"));
});


export default router;

