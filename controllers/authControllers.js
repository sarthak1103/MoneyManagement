const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// Signup user
const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await UserModel.create({ userName, email, password: hashedPassword });
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchedPassword) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);
        res.status(201).json({ user: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, login };
