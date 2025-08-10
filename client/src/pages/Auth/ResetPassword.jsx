import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthMessages } from "../../actions/AuthAction";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, errorMessage, successMessage } = useSelector(
    (state) => state.authReducer
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    message: "",
    severity: "info",
  });

  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setErrors({ token: "Password reset token is missing." });
    }
  }, [location]);

  const validate = () => {
    let newErrors = {};
    if (!password) newErrors.password = "New Password is required";
    if (!confirmPass) newErrors.confirmpass = "Confirm Password is required";
    if (password !== confirmPass) {
      newErrors.confirmpass = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() && token) {
      dispatch(resetPassword({ token, newPassword: password }));
    }
  };

  useEffect(() => {
    if (error && errorMessage) {
      setSnackbarContent({ message: errorMessage, severity: "error" });
      setOpenSnackbar(true);
    } else if (successMessage && !loading) {
      setSnackbarContent({ message: successMessage, severity: "success" });
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    }
  }, [error, errorMessage, successMessage, loading, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  return (
    <div className="Auth">
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Reset Password</h3>
          {errors.token && (
            <span
              style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}
            >
              {errors.token}
            </span>
          )}
          {!errors.token && (
            <>
              <div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="infoInput"
                    name="password"
                    placeholder="New Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          password: undefined,
                        }));
                    }}
                    value={password}
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
              </div>
              <div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="infoInput"
                    name="confirmpass"
                    placeholder="Confirm New Password"
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                      if (errors.confirmpass)
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          confirmpass: undefined,
                        }));
                    }}
                    value={confirmPass}
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
                {errors.confirmpass && (
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
              <button
                className="button infoButton"
                type="submit"
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : "Reset Password"}
              </button>
            </>
          )}
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

export default ResetPassword;
