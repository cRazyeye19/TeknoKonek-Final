import React from "react";
import "./story.css";

const UserItem = ({ name, newStories, time, imageUrl, onClick }) => {
  return (
    <div className="all-stories-wrapper" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ position: "relative" }}>
        <img src={imageUrl} alt={name} className="all-stories-image" />
      </div>
      <div className="your-story-text-wrapper">
        <p className="your-story-text">{name}</p>
        <p className="your-story-new-stories">
          {newStories} <span style={{ color: "#6b7280" }}>• {time}</span>
        </p>
      </div>
    </div>
  );
};

export default UserItem;
