import User from "../models/user.model.js";

export const addFriend = async (req, res) => {
  const currentUserId = req.userId;
  const { friendId } = req.body;

  try {
    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    if (currentUserId === friendId) {
      return res.status(400).json({ message: "You cannot add yourself as a friend" });
    }

    const currentUser = await User.findById(currentUserId);
    const friendUser = await User.findById(friendId);

    if (!currentUser || !friendUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(friendId)) {
      return res.status(400).json({ message: "Already added this friend" });
    }

    currentUser.following.push(friendId);

    friendUser.followers.push(currentUserId);

    await currentUser.save();
    await friendUser.save();

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFollowing = async (req, res) => {
  const currentUserId = req.userId;

  try {
    const user = await User.findById(currentUserId).populate({
      path: 'following',
      select: '_id name profilePic email'
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ following: user.following });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
