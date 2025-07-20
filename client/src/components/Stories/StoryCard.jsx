import React from "react";
import "./story.css";
import { useSelector } from "react-redux";

const StoryCard = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="stories-image-container">
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

      <div className="gradient-text-container">Lorem Ipsum</div>
    </div>
  );
};

export default StoryCard;
