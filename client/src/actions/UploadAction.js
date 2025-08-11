import * as UploadApi from "../api/UploadRequest";

export const uploadImage = (data) => async () => {
  try {
    const { data: imageUrl } = await UploadApi.uploadImage(data);
    return imageUrl; // Return the Cloudinary URL
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error so the component can catch it
  }
};

export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
