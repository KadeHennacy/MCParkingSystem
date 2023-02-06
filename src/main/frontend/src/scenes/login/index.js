import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/reducers/auth";
import { useLoginMutation } from "../../store/reducers/auth";

export default function Login() {
  const theme = useTheme();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        setErrMsg("No Server Response");
      } else if (err.originalStatus === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePwdInput = (e) => setPwd(e.target.value);

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
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          type="text"
          label="Email"
          ref={userRef}
          onChange={handleUserInput}
          value={user}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          label="Password"
          onChange={handlePwdInput}
          value={pwd}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        Login
      </Button>
    </Box>
  );
}
