import React, { useEffect } from "react";
import "./story.css";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../../actions/StoryAction";
import CreateStory from "./CreateStory";
import StoryCard from "./StoryCard";

const Stories = () => {
  useSelector((state) => state.authReducer.authData);
  const { stories, retrievingStories } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <div className="stories-container">
      {/* Create Story Section */}
      <CreateStory />

      {/* Other Users' Stories */}
      {retrievingStories ? (
        <div>Fetching Stories...</div>
      ) : (
        stories && stories.length > 0 ? (
          stories.map((story) => (
            <StoryCard data={story} key={story._id} />
          ))
        ) : (
          <div>No stories to display.</div>
        )
      )}
    </div>
  );
};

export default Stories;
