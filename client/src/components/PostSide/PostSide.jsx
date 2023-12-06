import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Stories from '../Stories/Stories'
import Posts from '../Posts/Posts'

const PostSide = () =>{
    return(
        <div className="PostSide">
            <Stories/>
            <PostShare/>
            <Posts/>
        </div>
    )
}

export default PostSide