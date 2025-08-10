const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    errorMessage: null,
    success: false,
    successMessage: null,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: null,
        success: false,
        successMessage: null,
      };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
        errorMessage: null,
        success: true,
        successMessage: null,
      };
    case "AUTH_FAIL":
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.message,
        success: false,
        successMessage: null,
      };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
        success: true,
        successMessage: action.message,
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: null,
        success: true,
        successMessage: action.message,
      };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };
    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true };
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false, errorMessage: null, success: false, successMessage: null };
    case "CLEAR_AUTH_MESSAGES":
      return { ...state, errorMessage: null, successMessage: null, error: false, success: false };
    default:
      return state;
  }
};

export default authReducer;
