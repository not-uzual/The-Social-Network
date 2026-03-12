import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { name, userName, email, password } = req.body;

  try {
    if (!name || !userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const existingUserName = await User.findOne({ userName });

    if (existingUserName) {
      return res.status(400).json({ message: "Username already in use" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = User.create({
      name,
      userName,
      email,
      password: hasedPassword,
    });

    const token = await genToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



export const signIn = async (req, res) => {

  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields Required" });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Password Incorret" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "User Logged in" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
