const storyReducer = (
  state = {
    story: null,
    userStories: [], 
    allStories: [], 
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_STORY_START":
      return { ...state, uploading: true, error: false };
    case "UPLOAD_STORY_SUCCESS":
      return { ...state, uploading: false, error: false };
    case "UPLOAD_STORY_FAIL":
      return { ...state, uploading: false, error: true };

    case "GET_STORY_START":
      return { ...state, loading: true, error: false };
    case "GET_STORY_SUCCESS":
      return { ...state, story: action.data, loading: false, error: false };
    case "GET_STORY_FAIL":
      return { ...state, loading: false, error: true };

    case "RETRIEVING_STORIES_START":
      return { ...state, loading: true, error: false };
    case "RETRIEVING_STORIES_SUCCESS":
      return { ...state, allStories: action.data, loading: false, error: false };
    case "RETRIEVING_STORIES_FAIL":
      return { ...state, loading: false, error: true };

    case "GET_USER_STORIES_START":
      return { ...state, loading: true, error: false };
    case "GET_USER_STORIES_SUCCESS":
      return { ...state, userStories: action.data, loading: false, error: false };
    case "GET_USER_STORIES_FAIL":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default storyReducer;