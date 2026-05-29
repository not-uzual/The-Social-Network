import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'author',
        select: '_id name profilePic'
      })
      .populate({
        path: 'likes',
        select: '_id'
      })
      .populate({
        path: 'comments.user',
        select: '_id name profilePic'
      })
      .populate({
        path: 'comments.likes',
        select: '_id'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fetchFollowingPosts = async (req, res) => {
  const userId = req.userId;

  try {
    // Get current user's following list
    const currentUser = await User.findById(userId).select("following");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch posts from users that current user is following
    const posts = await Post.find({ author: { $in: currentUser.following } })
      .populate({
        path: 'author',
        select: '_id name profilePic'
      })
      .populate({
        path: 'likes',
        select: '_id'
      })
      .populate({
        path: 'comments.user',
        select: '_id name profilePic'
      })
      .populate({
        path: 'comments.likes',
        select: '_id'
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
