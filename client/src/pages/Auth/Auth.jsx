import { useState, useEffect } from "react";
import "./Auth.css";
import Logo from "../../img/cit log_1.gif";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp, clearAuthMessages } from "../../actions/AuthAction";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Auth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, errorMessage, success, successMessage } = useSelector(
    (state) => state.authReducer
  );
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    message: "",
    severity: "info",
  });
  console.log(loading);
  console.log("Error:", error, "Message:", errorMessage);
  console.log("Success:", success);
  console.log("Success Message:", successMessage);

  useEffect(() => {
    if (error && errorMessage) {
      setSnackbarContent({ message: errorMessage, severity: "error" });
      setOpenSnackbar(true);
    } else if (success && successMessage) {
      setSnackbarContent({ message: successMessage, severity: "success" });
      setOpenSnackbar(true);
    } else if (success && !loading) {
      setSnackbarContent({
        message: isSignUp ? "Sign Up Successful!" : "Login Successful!",
        severity: "success",
      });
      setOpenSnackbar(true);
    }
  }, [error, errorMessage, success, successMessage, loading, isSignUp]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (isSignUp) {
      if (!data.firstname) newErrors.firstname = "First Name is required";
      if (!data.lastname) newErrors.lastname = "Last Name is required";
      if (!data.username) newErrors.username = "Username is required";
      if (!data.password) newErrors.password = "Password is required";
      if (data.password !== data.confirmpass) {
        newErrors.confirmpass = "Passwords do not match";
      }
    } else {
      if (!data.username) newErrors.username = "Username is required";
      if (!data.password) newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: undefined,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (isSignUp) {
        dispatch(signUp(data));
      } else {
        dispatch(logIn(data, rememberMe));
      }
    }
  };

  const resetForm = () => {
    setErrors({});
    setData({
      username: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
    });
  };
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>TeknoKonek</h1>
          <h6>Connecting peeps, one click, one wink.</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Login"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              {errors.firstname && (
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                    marginRight: "5px",
                  }}
                >
                  {errors.firstname}
                </span>
              )}
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
              {errors.lastname && (
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                    marginRight: "5px",
                  }}
                >
                  {errors.lastname}
                </span>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              className="infoInput"
              name="username"
              placeholder="Username or Email"
              onChange={handleChange}
              value={data.username}
              required
            />
            {errors.username && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {errors.username}
              </span>
            )}
          </div>

          <div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="infoInput"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </span>
            </div>
            {errors.password && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {errors.password}
              </span>
            )}
            {isSignUp && (
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="infoInput"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={data.confirmpass}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <VisibilityOffOutlinedIcon />
                  ) : (
                    <VisibilityOutlinedIcon />
                  )}
                </span>
              </div>
            )}
            {isSignUp && errors.confirmpass && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {errors.confirmpass}
              </span>
            )}
          </div>
          {!isSignUp && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "5px",
              }}
            >
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                style={{ cursor: "pointer" }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" style={{ fontSize: "12px" }}>
                Remember Me
              </label>
            </div>
          )}
          <>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
                dispatch(clearAuthMessages());
              }}
            >
              {isSignUp
                ? "Already have an account? Log In!"
                : "Don't have an account? Sign Up!"}
            </span>
          </>
          {!isSignUp && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </span>
          )}
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Log In"
            )}
          </button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarContent.severity}
              elevation={6}
              variant="filled"
            >
              {snackbarContent.message}
            </MuiAlert>
          </Snackbar>
        </form>
      </div>
    </div>
  );
};

export default Auth;
