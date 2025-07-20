import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import Stories from '../Stories/Stories'

const PostSide = () => {
    return (
        <div className="PostSide">
            <Stories />
            <PostShare />
            <Posts />
        </div>
    )
}

export default PostSide