import CommentModel from "../Models/commentModel.js";

// Create Comment
export const createComment = async (req, res) => {
    try {
        const { text, userId, postId } = req.body;
        const savedComment = await CommentModel.create({ text, userId, postId });
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get all comments for a specific post
export const getComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await CommentModel.find({ postId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
};