import * as StoryApi from "../api/StoryRequest";

export const uploadStory = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_STORY_START" });
  try {
    const newStory = await StoryApi.uploadStory(data);
    dispatch({ type: "UPLOAD_STORY_SUCCESS", data: newStory.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_STORY_FAIL" });
  }
};

export const getStories = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_STORIES_START" });
  try {
    const { data } = await StoryApi.getStories();
    dispatch({ type: "RETREIVING_STORIES_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_STORIES_FAIL" });
  }
};