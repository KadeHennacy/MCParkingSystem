import { useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ProtectRoutes } from "./components/ProtectedRoutes";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import NotFound from "./scenes/notFound";
import { Box, dividerClasses, Typography } from "@mui/material";
import Topbar from "./scenes/navigation/Topbar";
import Sidebar from "./scenes/navigation/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import img from "./assets/loginBackground.jpg";
import { useSelector } from "react-redux";

export default function App() {
  const authenticated = useSelector((state) => state.auth.token);
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const backgroundImage = location.pathname === "/login" ? `url(${img})` : "";

  return (
    // todo get the email in this class and pass to header as prop, and convert to typescript
    // TODO use redux rather than contexts for the color mode
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="app"
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {authenticated ? <Sidebar /> : <></>}
          <main className="content">
            <Topbar />
            <Routes>
              <Route
                path="/login"
                element={authenticated ? <Navigate to="/" /> : <Login />}
              />
              <Route element={<ProtectRoutes />}>
                <Route path="/" element={<Dashboard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
