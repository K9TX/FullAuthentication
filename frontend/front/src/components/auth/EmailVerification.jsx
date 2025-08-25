import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

const EmailVerification = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { verifyEmail, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or URL params
  const emailFromState = location.state?.email || "";

  const formik = useFormik({
    initialValues: {
      email: emailFromState,
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      otp: Yup.string()
        .required("Required")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        await verifyEmail(values.email, values.otp);
        setSuccess("Email verified successfully! You can now sign in.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to verify email");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleResendOTP = async () => {
    if (!formik.values.email) {
      setError("Please enter your email address first");
      return;
    }

    setResendLoading(true);
    setError("");
    setSuccess("");

    try {
      await sendVerificationEmail(formik.values.email);
      setSuccess(
        "Verification OTP sent successfully! Please check your email."
      );
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to send verification email"
      );
    } finally {
      setResendLoading(false);
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
            Verify Your Email
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, mb: 2, textAlign: "center" }}
          >
            We've sent a verification code to your email. Please enter it below
            to verify your account.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
              {success}
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
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={!!emailFromState} // Disable if email came from registration
            />
            <TextField
              margin="normal"
              fullWidth
              id="otp"
              label="Verification Code"
              name="otp"
              autoComplete="off"
              autoFocus
              inputProps={{
                maxLength: 6,
                style: {
                  textAlign: "center",
                  fontSize: "1.2em",
                  letterSpacing: "0.5em",
                },
              }}
              value={formik.values.otp}
              onChange={formik.handleChange}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || resendLoading}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Verifying...
                </Box>
              ) : (
                "Verify Email"
              )}
            </Button>

            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                fullWidth
                variant="outlined"
                onClick={handleResendOTP}
                disabled={resendLoading || loading}
              >
                {resendLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} />
                    Sending...
                  </Box>
                ) : (
                  "Resend Verification Code"
                )}
              </Button>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <MuiLink component={Link} to="/login" variant="body2">
                  Back to Sign In
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EmailVerification;
