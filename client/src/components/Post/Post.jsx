import { useState } from "react";
import "./Post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
import { Snackbar, Alert } from "@mui/material";
import { Comments } from "../Comments/Comments";
import { format } from "timeago.js";
import { deletePost } from "../../actions/PostAction";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [commentOpen, setCommentOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDelete = async () => {
    try {
      dispatch(deletePost(data._id, user._id));
      setSnackbarMessage("Post deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Failed to delete post.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="Post">
      <div className="postHeader">
        <img
          src={
            data.userId?.profilePicture
              ? process.env.REACT_APP_PUBLIC_FOLDER + data.userId.profilePicture
              : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
          }
          alt="Profile"
          className="followerImage"
        />
        <div className="name">
          <span>
            {data.userId?.firstname} {data.userId?.lastname}
          </span>
          <span className="postTimestamp">{format(data.createdAt)}</span>
        </div>
        <div className="postMenu">
          <MoreHorizOutlinedIcon onClick={() => setShowMenu(!showMenu)} />
          {showMenu && (
            <div className="dropdownMenu">
              {data.userId._id === user._id && (
                <div className="dropdownItem" onClick={handleDelete}>
                  Delete
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="detail" style={{ color: "var(--textColor)" }}>
        <span style={{ color: "var(--textColor)" }}> {data.desc}</span>
      </div>

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Post;
