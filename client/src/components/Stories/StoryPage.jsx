import React, { useEffect, useState } from "react";
import "./story.css";
import Sidebar from "./Sidebar";
import StoryCarousel from "./StoryCarousel";
import { useLocation } from "react-router-dom";

const StoryPage = () => {
  const location = useLocation();
  const [storyId, setStoryId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    setStoryId(id);
  }, [location]);

  return (
    <>
      <div className="story-page">
        <Sidebar />
        <StoryCarousel storyId={storyId} />
      </div>
    </>
  );
};

export default StoryPage;
