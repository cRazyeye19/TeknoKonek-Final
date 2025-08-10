import React, { useEffect, useState } from "react";
import "./story.css";
import Sidebar from "./Sidebar";
import StoryCarousel from "./StoryCarousel";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserStories } from "../../actions/StoryAction";

const StoryPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userStories, loading, error } = useSelector((state) => state.storyReducer);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      setCurrentUserId(id);
    }
  }, [location]);

  useEffect(() => {
    if (currentUserId) {
      dispatch(getUserStories(currentUserId));
    }
  }, [currentUserId, dispatch]);

  if (loading) {
    return <div>Loading Stories...</div>;
  }

  if (error) {
    return <div>Error loading stories.</div>;
  }

  return (
    <>
      <div className="story-page">
        <Sidebar setCurrentUserId={setCurrentUserId} /> {/* Pass setter to Sidebar */}
        <StoryCarousel userStories={userStories} currentUserId={currentUserId} /> {/* Pass userStories and currentUserId */}
      </div>
    </>
  );
};

export default StoryPage;
