import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { loginService } from "../Services/LoginService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateRequest } from "../Services/Validation";
import "react-toastify/dist/ReactToastify.css";
import errorMessages from "../Constants/ErrorMessages";

const Login = () => {
  const navigate = useNavigate();
  const [olmid, setolmid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    usernameError: "",
    passwordError: "",
  });

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/"); // Redirect to Home if logged in
    }
  }, [navigate]);

  const setErrorState = (msg, time) => {
    setTimeout(() => {
      setError({ ...error, ...msg });
    }, time);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setError((prev) => ({ ...prev, [`${field}Error`]: "" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { errorMsgObj, showErrorFlag } = validateRequest(olmid, password);
    setErrorState(errorMsgObj, 1);

    if (showErrorFlag) {
      return;
    }

    setLoading(true);

    try {
      const details = await loginService(olmid, password);
      if (details && details.token && details.refreshToken) {
        localStorage.setItem("userToken", details.token);
        localStorage.setItem("username", details.username);
        // Store other user details if needed

        toast.success(errorMessages.loginSuccess);
        navigate("/"); // Redirect to home
      } else {
        toast.error(errorMessages.wrongCredentials, {
          theme: "colored",
        });
      }
    } catch (error) {
      //console.error("Error during login:", error);
      toast.error(errorMessages.loginError, {
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid
          container
          component={Paper}
          elevation={10}
          style={{ borderRadius: 20, width: "70%", padding: "0px" }}
        >
          <Grid
            item
            xs={12}
            md={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 60,
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/airtelLogo.jpg`}
              alt="Company Logo"
              style={{ maxWidth: "110%", height: "auto", marginLeft: "50px" }}
            />
          </Grid>
          <Grid item xs={12} md={7} style={{ padding: 60 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Admin Login
            </Typography>
            <Typography variant="body1" gutterBottom>
              Enter your Credentials to access your account
            </Typography>
            <TextField
              label="OLM ID"
              variant="outlined"
              fullWidth
              required
              size="small"
              margin="normal"
              value={olmid}
              onChange={handleInputChange(setolmid, "username")}
              onKeyDown={handleKeyPress}
            />
            {error.usernameError && (
              <Typography variant="body2" sx={{ color: "red" }}>
                {error.usernameError}
              </Typography>
            )}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              size="small"
              margin="normal"
              value={password}
              onChange={handleInputChange(setPassword, "password")}
              onKeyDown={handleKeyPress}
            />
            {error.passwordError && (
              <Typography variant="body2" sx={{ color: "red" }}>
                {error.passwordError}
              </Typography>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              sx={{
                marginTop: 4,
                backgroundColor: "#333333",
                "&:hover": { backgroundColor: "#555555" },
                display: "flex",
                alignItems: "center",
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
