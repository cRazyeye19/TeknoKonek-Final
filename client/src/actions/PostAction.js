import * as PostApi from "../api/PostRequest"

export const getTimelinePosts = (id) => async(dispatch) => {
  dispatch({ type: "RETRIEVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETRIEVING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "RETRIEVING_FAIL" });
    console.log(error);
  }
};

export const deletePost = (id, userId) => async (dispatch) => {
  dispatch({ type: "DELETE_POST_START" });
  try {
    await PostApi.deletePost(id, userId);
    dispatch({ type: "DELETE_POST_SUCCESS", postId: id });
  } catch (error) {
    dispatch({ type: "DELETE_POST_FAIL", postId: id });
    console.log(error);
  }
};