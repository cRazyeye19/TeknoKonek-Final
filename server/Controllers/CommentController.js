import mongoose from "mongoose";
import CommentModel from "../Models/commentModel";
import PostModel from "../Models/postModel";

//Create Comment
export const createComment = async(req, res)=>{
    try {
        const {user, post, text} = req.body;
        const comment = new CommentModel({user, post, text})
        await comment.save()
    
        await PostModel.findByIdAndUpdate(post, {$push: {comments: comment._id}});
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');    
    }
}

//Get Comment from Post
export const getComment = async(req, res)=> {
    try {
        const comments = await CommentModel.find({postId: req.params.id}).populate('userId')
        res.json(comments)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}