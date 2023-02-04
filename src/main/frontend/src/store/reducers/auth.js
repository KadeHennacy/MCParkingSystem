import { createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:8080";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    token: getCookie("token"),
    email: getCookie("email"),
  },
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      setCookie("token", action.payload.token);
      setCookie("email", action.payload.email);
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = null;
      state.email = null;
      removeCookie("token");
      removeCookie("email");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
