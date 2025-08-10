const storyReducer = (
  state = { story: null, loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    // get story
    case "GET_STORY_START":
      return { ...state, loading: true, error: false };
    case "GET_STORY_SUCCESS":
      return { ...state, story: action.data, loading: false, error: false };
    case "GET_STORY_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default storyReducer;