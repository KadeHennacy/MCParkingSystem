import React, { useState } from "react";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/auth";
import axios from "../../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/v1/auth/authenticate", {
        email,
        password,
      });
      const token = res.data.token;
      // Dispatch the login action with the token and email
      dispatch(login({ token, email }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="350px"
      height="350px"
      margin="auto"
      marginTop={20}
      padding={5}
      borderRadius={5}
      boxShadow={10}
      border={`1px solid ${theme.palette.primary.main}`}
      backgroundColor={theme.palette.background.lightPaper}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          type="text"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        Login
      </Button>
    </Box>
  );
}
