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
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const Register = () => {
  const [error, setError] = useState("");
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
      phone_number: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Required")
        .min(3, "Must be at least 3 characters"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "Must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      password2: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      phone_number: Yup.string().matches(
        /^\+?[1-9]\d{1,14}$/,
        "Invalid phone number"
      ),
    }),
    onSubmit: async (values) => {
      // Clear any previous errors and set loading
      setError("");
      setIsAlreadyRegistered(false);
      setLoading(true);

      try {
        await register(values);
        // Redirect to email verification with the email
        navigate("/verify-email", {
          state: {
            email: values.email,
            message:
              "Registration successful! Please check your email for verification code.",
          },
        });
      } catch (err) {
        const errorData = err.response?.data;

        // Handle specific error cases
        if (errorData?.email) {
          // Email already exists error
          if (
            errorData.email[0]?.includes("already exists") ||
            errorData.email[0]?.includes("unique") ||
            errorData.email[0]?.includes(
              "user with this email address already exists"
            )
          ) {
            setError("This email is already registered.");
            setIsAlreadyRegistered(true);
          } else {
            setError(errorData.email[0] || "Email validation error");
            setIsAlreadyRegistered(false);
          }
        } else if (errorData?.username) {
          // Username already exists error
          if (
            errorData.username[0]?.includes("already exists") ||
            errorData.username[0]?.includes("unique") ||
            errorData.username[0]?.includes(
              "user with this username already exists"
            )
          ) {
            setError(
              "This username is already taken. Please choose a different username."
            );
            setIsAlreadyRegistered(false);
          } else {
            setError(errorData.username[0] || "Username validation error");
            setIsAlreadyRegistered(false);
          }
        } else if (errorData?.non_field_errors) {
          // General validation errors
          setError(errorData.non_field_errors[0] || "Registration failed");
          setIsAlreadyRegistered(false);
        } else {
          // Generic error message
          setError(
            errorData?.error ||
              errorData?.detail ||
              "Failed to register. Please try again."
          );
          setIsAlreadyRegistered(false);
        }
      } finally {
        setLoading(false);
      }
    },
  });

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
            Sign up
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
              {isAlreadyRegistered && (
                <Box sx={{ mt: 1 }}>
                  <MuiLink
                    component={Link}
                    to="/login"
                    variant="body2"
                    sx={{ color: "inherit", textDecoration: "underline" }}
                  >
                    Click here to sign in instead
                  </MuiLink>
                </Box>
              )}
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="new-password"
              value={formik.values.password2}
              onChange={formik.handleChange}
              error={
                formik.touched.password2 && Boolean(formik.errors.password2)
              }
              helperText={formik.touched.password2 && formik.errors.password2}
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone_number"
              label="Phone Number"
              type="tel"
              id="phone_number"
              autoComplete="tel"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              error={
                formik.touched.phone_number &&
                Boolean(formik.errors.phone_number)
              }
              helperText={
                formik.touched.phone_number && formik.errors.phone_number
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Creating Account...
                </Box>
              ) : (
                "Sign Up"
              )}
            </Button>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                textAlign: "center",
              }}
            >
              <MuiLink component={Link} to="/login" variant="body2">
                Already have an account? Sign in
              </MuiLink>
              <MuiLink
                component={Link}
                to="/verify-email"
                variant="body2"
                sx={{ color: "primary.main" }}
              >
                Need to verify your email?
              </MuiLink>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
