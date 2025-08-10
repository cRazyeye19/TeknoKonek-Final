import * as StoryApi from "../api/StoryRequest";

export const uploadStory = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_STORY_START" });
  try {
    const newStory = await StoryApi.uploadStory(data);
    dispatch({ type: "UPLOAD_STORY_SUCCESS", data: newStory.data });
    dispatch(getStories());
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_STORY_FAIL" });
  }
};

export const getStories = () => async (dispatch) => {
  dispatch({ type: "RETRIEVING_STORIES_START" });
  try {
    const { data } = await StoryApi.getStories();
    dispatch({ type: "RETRIEVING_STORIES_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETRIEVING_STORIES_FAIL" });
  }
};

export const getStory = (id) => async (dispatch) => {
  dispatch({ type: "GET_STORY_START" });
  try {
    const { data } = await StoryApi.getStory(id);
    dispatch({ type: "GET_STORY_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_STORY_FAIL" });
  }
};

export const getUserStories = (userId) => async (dispatch) => {
  dispatch({ type: "GET_USER_STORIES_START" });
  try {
    const { data } = await StoryApi.getUserStories(userId);
    dispatch({ type: "GET_USER_STORIES_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_USER_STORIES_FAIL" });
  }
};