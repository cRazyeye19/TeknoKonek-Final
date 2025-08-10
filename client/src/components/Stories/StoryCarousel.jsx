import { useEffect, useState } from "react";
import { UilArrowLeft, UilArrowRight } from "@iconscout/react-unicons";

const StoryCarousel = ({ userStories, currentUserId }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    setCurrentStoryIndex(0);
  }, [userStories, currentUserId]);

  if (!userStories || userStories.length === 0) {
    return <div>No stories available for this user.</div>;
  }

  const currentStory = userStories[currentStoryIndex];

  if (!currentStory) {
    return <div>Error: Story not found at current index.</div>;
  }

  const createdAt = new Date(currentStory.createdAt).toLocaleString();

  const handleNextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % userStories.length);
  };

  const handlePrevStory = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex === 0 ? userStories.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="story-carousel-background">
      {userStories.length > 1 && (
        <button className="carousel-prev-button" onClick={handlePrevStory}>
          <UilArrowLeft className="carousel-left" />
        </button>
      )}

      <div className="story-container">
        <div className="story-header">
          <div className="story-header-subcontainer">
            <div className="story-header-textcontainer">
              <img
                src={serverPublic + currentStory.profilePicture}
                alt="Story Owner"
                className="story-ownerpic"
              />
              <div>
                <p className="story-owner">
                  {currentStory.firstname} {currentStory.lastname}
                </p>
                <p className="story-timestamp">{createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="story-content">
          <img
            src={serverPublic + currentStory.image}
            alt="Story"
            className="story-image"
          />
        </div>
      </div>

      {userStories.length > 1 && (
        <button className="carousel-next-button" onClick={handleNextStory}>
          <UilArrowRight className="carousel-right" />
        </button>
      )}
    </div>
  );
};

export default StoryCarousel;
