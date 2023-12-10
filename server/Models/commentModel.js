import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
}
)
var CommentModel = mongoose.model("Comments", commentSchema)
export default CommentModel