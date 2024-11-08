const express = require("express");
const bcrypt = require("bcrypt"); //for hashing passwords
const router = express.Router();
const User = require("../models/user");

//Register route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {   
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        if(error.code === 11000) {
            return res.status(400).send({ error: "Email already registered" });
        }
        res.status(500).send({ error: "Failed to register user" });
    }
});

//Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ error: "Invalid email or password" });
        }
        res.send({ message: "Login successful" });
    } catch (error) {
        res.status(500).send({ error: "Failed to login"});
    }
});

//List all users
router.get("/users", async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        res.status(500).send({ error: "Error when searching for users" });
    }
});

//Request password reset
router.post("/reset-password", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: "User not found" });
        }

        user.password = password;
        await user.save();

        res.send({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).send({ error: "Failed to reset password" });
    }
});        

module.exports = router;