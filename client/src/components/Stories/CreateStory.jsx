import "./story.css";
import { UilPlus } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { uploadStory } from "../../actions/StoryAction";
import { uploadImage } from "../../actions/UploadAction";

const Stories = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      handleUpload(img);
    }
  };

  const handleUpload = async (img) => {
    const newStory = {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    if (img) {
      const data = new FormData();
      const fileName = Date.now() + img.name;
      data.append("name", fileName);
      data.append("file", img);
      newStory.image = fileName;
      console.log(newStory);
      try {
        const imageUrl = await dispatch(uploadImage(data));
        newStory.image = imageUrl;
        dispatch(uploadStory(newStory));
        setSnackbarMessage("Story created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.log(error);
        setSnackbarMessage("Failed to create story.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="stories-container">
      <div className="stories-image-container">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="stories-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "defaultProfile.png";
          }}
        />
      </div>

      <div className="stories-text-section">
        <p className="stories-text">Create a Story</p>

        <div className="stories-button-container">
          <button
            className="stories-button"
            onClick={() => imageRef.current.click()}
          >
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Stories;
