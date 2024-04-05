import Publication from "../Models/publication.js";
import User from "../Models/user.js";

export const createPost = async (req, res) => {
  try {
    const { userId, title, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      title,
      description,
      userPicturePath: user.picturePath,
      picturePath,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, description, title, picturePath } = req.body;
    const user = await User.findById(userId);

    const updatedPost = {
      description,
      title,
      picturePath,
      _id: id,
    };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.status(201).json(updatePost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
