import React, { useState } from 'react'
import './Post.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Comments from "../../components/Comments/Comments"
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({data}) =>{
    const [commentOpen, setcommentOpen] = useState(false)
    const {user} = useSelector((state)=>state.authReducer.authData)
    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)

    const handleLike = ()=> {
        setLiked((prev)=>!prev);
        likePost(data._id, user._id);
        liked? setLikes((prev)=>prev-1) : setLikes((prev)=>prev+1)
    };
    return(
        <div className="Post">
            
            <div className="detail"
            style={{color: "var(--textColor)"}}
            >
                <span><b>{data.name}</b></span>
                <MoreHorizOutlinedIcon/>
            </div>

            <span style={{color: "var(--textColor)"}}> {data.desc}</span>
            <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER + data.image: ""} alt="" />

            <div className="info">
                <div className="item" onClick={handleLike}> 
                    {liked? <ThumbUpIcon/>: <ThumbUpOutlinedIcon/>}
                    <span>{likes}</span>
                </div>
                <div className="item" onClick={()=>setcommentOpen(!commentOpen)}>
                    <TextsmsOutlinedIcon/>
                    Comment
                </div>
                <div className="item">
                    <ShareOutlinedIcon/>
                    Share
                </div>
            </div>
            {commentOpen && <Comments/>}
        </div>
    )
}

export default Post