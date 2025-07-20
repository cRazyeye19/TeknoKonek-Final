import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Story from '../Stories/Story'
import Posts from '../Posts/Posts'

const PostSide = () => {
    return (
        <div className="PostSide">
            <Story />
            <PostShare />
            <Posts />
        </div>
    )
}

export default PostSide