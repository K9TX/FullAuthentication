import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Link as MuiLink,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import authService from "../../services/auth";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        await login(values.email, values.password);
        navigate("/dashboard");
      } catch (err) {
        const errorData = err.response?.data;

        if (errorData?.requires_verification) {
          // User needs to verify email first
          setError(errorData.message || "Email verification required");
          // Optionally redirect to verification page
          setTimeout(() => {
            navigate("/verify-email", {
              state: {
                email: values.email,
                message: "Please verify your email before signing in",
              },
            });
          }, 2000);
        } else {
          setError(errorData?.error || "Invalid credentials");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleGoogleLogin = async (credentialResponse) => {
    setGoogleLoading(true);
    setError("");

    try {
      // Use the Google credential token directly
      const result = await authService.googleLogin(
        credentialResponse.credential
      );

      // Update auth context with the user data
      setUser(result.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || googleLoading}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Signing In...
                </Box>
              ) : (
                "Sign In"
              )}
            </Button>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <MuiLink component={Link} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </MuiLink>
              <MuiLink component={Link} to="/forgot-password" variant="body2">
                Forgot password?
              </MuiLink>
            </Box>
          </Box>

          <Divider sx={{ mt: 3, mb: 2 }}>OR</Divider>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {googleLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
                <CircularProgress size={20} />
                <Typography variant="body2">
                  Signing in with Google...
                </Typography>
              </Box>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  setError("Google login failed. Please try again.");
                }}
                theme="outline"
                size="large"
                text="signin_with"
                useOneTap={false}
                auto_select={false}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
