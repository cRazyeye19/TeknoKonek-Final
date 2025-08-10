import "./story.css";
import { useNavigate } from "react-router-dom";

const StoryCard = ({ data }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const handleStoryClick = () => {
    const userId = data?.userId;
    
    if (userId) {
      navigate(`/story?id=${userId}`);
    }
  };

  return (
    <div
      className="stories-container"
      style={{ marginLeft: "1rem", cursor: "pointer" }}
      onClick={handleStoryClick}
    >
      <div className="stories-image-container" style={{ height: "16.5rem" }}>
        <img
          src={
            data.stories?.[0]?.image
              ? serverPublic + data.stories[0].image
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
                data.profilePicture
                  ? serverPublic + data.profilePicture
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
