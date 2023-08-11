import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setResetError(null);
      setResetSuccess(true);
    } catch (error) {
      setResetError(error.message);
      setResetSuccess(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb="15px">
        Reset Password
      </Typography>
      <Typography>
        Enter your email address to receive a password reset link.
      </Typography>
      <TextField
        placeholder="Enter your email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={resetError !== null}
        helperText={
          resetError || (resetSuccess ? "Password reset email sent!" : "")
        }
      />
      <Button variant="contained" onClick={handleForgotPassword}>
        Send Reset Link
      </Button>
    </Box>
  );
}

export default ForgotPassword;
