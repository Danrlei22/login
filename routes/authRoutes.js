const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

//Register route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).send({ error: "User already registered" });
        }
        res.status(500).send({ error: "Failed to register user" });
    }
});

//Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        res.send({ message: "Login successful" });
    } catch (error) {
        res.status(500).send({ error: "Failed to login"});
    }
});

module.exports = router;