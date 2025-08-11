import React, { useRef } from "react";
import "./Comments.css";
import { useSelector } from "react-redux";

export const Comments = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts } = useSelector((state) => state.postReducer);
  const text = useRef();

  const handleSend = (e) => {
    e.preventDefault();

    const newComment = {
      userId: user._id,
      text: text.current.value,
      postId: posts._id,
    };

    console.log(newComment);
  };

  return (
    // CommentBox container
    <div className="comments">
      <div className="write">
        <img src={user.profilePicture} alt="" />
        <input ref={text} required type="text" placeholder="Write a comment" />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
