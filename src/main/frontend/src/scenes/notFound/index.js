import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box m={3}>
      <h1>Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Home</Link>
    </Box>
  );
}
