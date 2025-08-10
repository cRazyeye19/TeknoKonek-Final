import React, { useEffect } from "react";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { UilArrowRight } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { getStory } from "../../actions/StoryAction";

const StoryCarousel = ({ storyId }) => {
  const dispatch = useDispatch();
  const { story, loading, error } = useSelector((state) => state.storyReducer);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    if (storyId) {
      dispatch(getStory(storyId));
    }
  }, [storyId, dispatch]);

  if (loading) {
    return <div>Loading Story...</div>;
  }

  if (error) {
    return <div>Error loading story.</div>;
  }

  if (!story) {
    return <div>No story selected or found.</div>;
  }

  const currentStory = story.stories;

  if (!currentStory) {
    return <div>No story content available.</div>;
  }

  const createdAt = new Date(currentStory.createdAt).toLocaleString();

  return (
    <div className="story-carousel-background">
      <button className="carousel-next-button">
        <UilArrowLeft className="carousel-left" />
      </button>

      <div className="story-container">
        <div className="story-header">
          <div className="story-header-subcontainer">
            <div className="story-header-textcontainer">
              <img src={serverPublic + story.userDetails.profilePicture} alt="Story Owner" className="story-ownerpic" />
              <div>
                <p className="story-owner">{story.userDetails.firstname} {story.userDetails.lastname}</p>
                <p className="story-timestamp">{createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="story-content">
          <img src={serverPublic + currentStory.image} alt="Story" className="story-image" />
        </div>
      </div>

      <button className="carousel-prevbutton">
        <UilArrowRight className="carousel-right" />
      </button>
    </div>
  );
};

export default StoryCarousel;
