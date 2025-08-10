import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthMessages } from "../../actions/AuthAction";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, errorMessage, successMessage } = useSelector(
    (state) => state.authReducer
  );
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    message: "",
    severity: "info",
  });

  const validate = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(forgotPassword({ email }));
    }
  };

  useEffect(() => {
    if (error && errorMessage) {
      setSnackbarContent({ message: errorMessage, severity: "error" });
      setOpenSnackbar(true);
    } else if (successMessage) {
      setSnackbarContent({ message: successMessage, severity: "success" });
      setOpenSnackbar(true);
    }
  }, [error, errorMessage, successMessage]);

  useEffect(() => {
    return () => {
      dispatch(clearAuthMessages());
    };
  }, [dispatch]);

  return (
    <div className="Auth">
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>
          <div>
            <input
              type="email"
              className="infoInput"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email)
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: undefined,
                  }));
              }}
              value={email}
              required
            />
            {errors.email && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                }}
              >
                {errors.email}
              </span>
            )}
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Reset"}
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
          <span
            style={{ fontSize: "12px", cursor: "pointer", marginTop: "10px" }}
            onClick={() => {
              navigate("/auth");
              dispatch(clearAuthMessages());
            }}
          >
            Back to Login
          </span>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
