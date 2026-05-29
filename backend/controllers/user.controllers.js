import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  const userId = req.userId;

  try {
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


