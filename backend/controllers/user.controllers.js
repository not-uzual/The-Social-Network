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
    const currentUser = await User.findById(userId).select("following");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingIds = currentUser.following.map(id => id.toString());
    const users = await User.find({ 
      _id: { 
        $ne: userId,
        $nin: followingIds
      } 
    }).select("-password");
    
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


