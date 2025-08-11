import "./story.css";
import { useNavigate } from "react-router-dom";

const StoryCard = ({ data }) => {
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
          src={data.stories?.[0]?.image || "https://via.placeholder.com/150"}
          alt="Story"
          className="stories-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
        />

        <div className="profile-picture-overlay">
          <div className="profile-picture-overlay-inner">
            <img
              src={data.profilePicture || "https://ui-avatars.com/api/?name=User"}
              alt="Profile"
              className="stories-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://ui-avatars.com/api/?name=User";
              }}
            />
          </div>
        </div>

        <div className="gradient-text-container">
          {data.firstname} {data.lastname}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
