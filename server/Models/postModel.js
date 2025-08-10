import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    desc: String,
    likes: [],
    image: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    }]
},
{
    timestamps: true,
}
);
var PostModel = mongoose.model("Posts", postSchema)
export default PostModel