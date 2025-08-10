import * as AuthApi from "../api/AuthRequest";

export const logIn = (formData, rememberMe) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData, rememberMe);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_FAIL",
      message: error.response?.data?.message || "An unexpected error occurred",
    });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_FAIL",
      message: error.response?.data?.message || "An unexpected error occurred",
    });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};

export const forgotPassword = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.forgotPassword(formData);
    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", message: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_FAIL",
      message: error.response?.data?.message || "An unexpected error occurred",
    });
  }
};

export const clearAuthMessages = () => (dispatch) => {
  dispatch({ type: "CLEAR_AUTH_MESSAGES" });
};

export const resetPassword = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.resetPassword(formData);
    dispatch({ type: "RESET_PASSWORD_SUCCESS", message: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_FAIL",
      message: error.response?.data?.message || "An unexpected error occurred",
    });
  }
};
