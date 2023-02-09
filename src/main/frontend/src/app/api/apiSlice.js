import { createApi, fetchBaseQuery } from "@reduxjs/toolkit";
import { setCredentials, logOut } from "../../features/auth/authSlice";

// attach access token to header of every request. If we have a cookie, attach credentials every time
// change baseUrl in production
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// if our base query fails, we need to reattempt the request using a refresh token. We wrap the base query in a reAuth query to get a new access token

const baseQueryWithRequth = async (args, api, extraOptions) => {};
