import React from "react";
import "./story.css";
import { UilPlus } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { uploadStory } from "../../actions/StoryAction";
import { uploadImage } from "../../actions/UploadAction";

const Stories = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      handleUpload(img);
    }
  };

  const handleUpload = async (img) => {
    const newStory = {
      userId: user._id,
    };

    if (img) {
      const data = new FormData();
      const fileName = Date.now() + img.name;
      data.append("name", fileName);
      data.append("file", img);
      newStory.image = fileName;
      console.log(newStory);
      try {
        await dispatch(uploadImage(data));
        dispatch(uploadStory(newStory));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="stories-container">
      <div className="stories-image-container">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
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

      <div className="stories-text-section">
        <p className="stories-text">Create a Story</p>

        <div className="stories-button-container">
          <button className="stories-button" onClick={() => imageRef.current.click()}>
            <UilPlus className="stories-icon" />
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
