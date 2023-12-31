import React, { useState } from 'react'
import './Post.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { Comments } from '../Comments/Comments';

const Post = ({ data }) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)
    const [commentOpen, setCommentOpen] = useState(false)

    // Handle Like
    const handleLike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    };
    return (
        <div className="Post">
            <div className="detail"
                style={{ color: "var(--textColor)" }}
            >
                <span style={{ color: "var(--textColor)" }}> {data.desc}</span>
                <MoreHorizOutlinedIcon />
            </div>

            <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />

            <div className="info">
                <div className="item" onClick={handleLike}>
                    {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    <span>{likes}</span>
                </div>
                <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                    <TextsmsOutlinedIcon />
                    Comment
                </div>
                <div className="item">
                    <ShareOutlinedIcon />
                    Share
                </div>
            </div>
            {commentOpen && <Comments />}
        </div>
    )
}

export default Post