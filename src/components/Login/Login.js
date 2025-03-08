import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import "./Login.scss";
import { loginApiCall } from "../../utils/Api";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material"; // Import MUI's Link separately

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState(""); // State to store API error

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = async () => {
    let isValid = true;
    setApiError(""); // Clear previous API error

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // if (!passwordRegex.test(password)) {
    //   setPasswordError(
    //     "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
    //   );
    //   isValid = false;
    // } else {
    //   setPasswordError("");
    // }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      loginApiCall({ email, password })
        .then((res) => {
          console.log("Login successful:", res);
          navigate("/dashboard/notes");
        })
        .catch((err) => {
          console.error("Login error:", err.message);
          setApiError("Invalid email or password. Please try again."); // Set API error message
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <Paper elevation={3} className="login-paper">
        <Typography variant="h5" className="login-title">
          Fundo
        </Typography>
        <Typography variant="h6">Sign in</Typography>
        <Typography variant="body2" color="textSecondary">
          Use your Fundo Account
        </Typography>

        <Box component="form" className="login-form">
          <TextField
            fullWidth
            label="Email or phone"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />

          {/* Display API error message */}
          {apiError && (
            <Typography color="error" variant="body2" className="api-error">
              {apiError}
            </Typography>
          )}

          <MuiLink
            component={RouterLink}
            to="#"
            variant="body2"
            className="forgot-password"
            sx={{ textDecoration: "none" }}
          >
            Forgot password
          </MuiLink>

          <Box className="login-actions">
            <MuiLink
              component={RouterLink}
              to="/signup"
              variant="body2"
              className="create-account"
              sx={{ textDecoration: "none" }}
            >
              Create account
            </MuiLink>
            <Button
              variant="contained"
              color="primary"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box className="footer-container">
        <Typography variant="caption" className="language-selection">
          English (United States)
        </Typography>
        <Box className="footer-links">
          <MuiLink component={RouterLink} to="#" variant="caption">
            Help
          </MuiLink>
          <MuiLink component={RouterLink} to="#" variant="caption">
            Privacy
          </MuiLink>
          <MuiLink component={RouterLink} to="#" variant="caption">
            Terms
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
