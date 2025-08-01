import React from "react";
import "./story.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StoryCard = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  return (
    <div className="stories-container" style={{ marginLeft: "1rem", cursor: "pointer" }} onClick={() => navigate("/story")}>
      <div className="stories-image-container" style={{ height: "16.5rem" }}>
        <img
          src={
            data.image
              ? serverPublic + data.image
              : serverPublic + "defaultProfile.png"
          }
          alt="Story"
          className="stories-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = serverPublic + "defaultProfile.png";
          }}
        />

        <div className="profile-picture-overlay">
          <div className="profile-picture-overlay-inner">
            <img
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="Profile"
              className="stories-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = serverPublic + "defaultProfile.png";
              }}
            />
          </div>
        </div>

        <div className="gradient-text-container">{data.firstname} {data.lastname}</div>
      </div>
    </div>
  );
};

export default StoryCard;
