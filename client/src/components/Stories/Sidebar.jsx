/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import { UilPlus } from "@iconscout/react-unicons";
import Logo from "../../img/SchoolLogo.png";
import { useNavigate } from "react-router-dom";
import UserItem from "./UserItem";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../../actions/StoryAction";

const Sidebar = ({ setCurrentUserId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allStories, loading, error } = useSelector((state) => state.storyReducer);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (allStories.length === 0) {
      dispatch(getStories());
    }
  }, [dispatch, allStories.length]);

  if (loading) {
    return <div>Loading users with stories...</div>;
  }

  if (error) {
    return <div>Error loading users with stories.</div>;
  }

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
        {allStories.length > 0 ? (
          allStories.map((userStoryGroup) => (
            <UserItem
              key={userStoryGroup.userId}
              name={`${userStoryGroup.firstname} ${userStoryGroup.lastname}`}
              newStories={`${userStoryGroup.stories.length} new`}
              time={new Date(userStoryGroup.stories[0].createdAt).toLocaleTimeString()}
              imageUrl={serverPublic + userStoryGroup.profilePicture}
              onClick={() => setCurrentUserId(userStoryGroup.userId)}
            />
          ))
        ) : (
          <div>No stories from other users.</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
