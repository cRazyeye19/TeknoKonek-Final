import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        ref: 'Users',
        required: true,
    },
    postId: {
        type: String,
        ref: 'Posts',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
var CommentModel = mongoose.model("Comments", commentSchema)
export default CommentModel