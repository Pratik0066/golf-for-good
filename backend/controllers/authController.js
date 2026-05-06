import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, charityId, charityPercentage = 10 } = req.body;

    // PRD 08: Enforce 10% minimum charity contribution[cite: 52]
    const activePercentage = Math.max(charityPercentage, 10);

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      name, 
      email, 
      password: hash,
      selectedCharity: charityId,
      charityPercentage: activePercentage
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


export const getMe = async (req, res) => {
  // Finds the user by the ID provided by the 'protect' middleware
  const user = await User.findById(req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  // Sends the full user object (including role and balance) back to the frontend
  res.json(user); 
};