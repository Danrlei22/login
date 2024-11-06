const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error when searching for users" });
    }
});

module.exports = router;