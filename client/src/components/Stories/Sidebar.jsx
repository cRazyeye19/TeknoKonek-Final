/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { UilTimes } from "@iconscout/react-unicons";
import { UilPlus } from "@iconscout/react-unicons";
import Logo from "../../img/SchoolLogo.png";
import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <button className="sidebar-button" onClick={() => navigate("/home")}>
          <UilTimes size="1.5rem" color="#000" />
        </button>
        <img src={Logo} className="sidebar-logo" alt="School Logo" />
      </div>

      <div className="stories-section-wrapper">
        <h2 className="stories-section-header">Stories</h2>
        <div className="stories-section-links">
          <a href="#" className="stories-link" style={{ marginRight: "1rem" }}>
            Archive
          </a>
          <a href="#" className="stories-link">
            Settings
          </a>
        </div>
        <h3 className="your-stories-header">Your Story</h3>
        <div className="your-story-wrapper">
          <button className="your-story-plus">
            <UilPlus color="#000" />
          </button>
          <div className="your-story-text-wrapper">
            <p className="your-story-text">Create Story</p>
            <p className="your-story-subtext">
              Share a photo or write something.
            </p>
          </div>
        </div>

        <h3 className="all-stories-header">All Stories</h3>
        <UserItem
          name="Sheila May Oca"
          newStories="4 new"
          time="3h"
          imageUrl="https://placehold.co/100x100/A78BFA/ffffff?text=SMO"
        />
        <UserItem
          name="John Doe"
          newStories="4 new"
          time="3h"
          imageUrl="https://placehold.co/100x100/A78BFA/ffffff?text=JD"
        />
        <UserItem
          name="Jane Doe"
          newStories="4 new"
          time="3h"
          imageUrl="https://placehold.co/100x100/A78BFA/ffffff?text=JD"
        />
        <UserItem
          name="Lorem Ipsum"
          newStories="4 new"
          time="3h"
          imageUrl="https://placehold.co/100x100/A78BFA/ffffff?text=LI"
        />
      </div>
    </div>
  );
};

export default Sidebar;
