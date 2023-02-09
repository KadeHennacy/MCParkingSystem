import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "./auth";

// this will be used to create the base url for all requests and add the token to the header
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    const refreshToken = getState().auth.refreshToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else if (refreshToken) {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }
    return headers;
  },
});

// now we must wrap the baseQuery with a function that will handle the 401 response and send a refresh token request

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // 403 is returned when the token is invalid/expired, 401 is returned when no token is present
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token request");
    // nullify the token in the state before sending the refresh token request so that baseQuery knows to send the refresh token rather than the old token
    api.dispatch(setCredentials({ token: null }));
    const refreshResult = await baseQuery(
      "/api/v1/auth/refresh",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ user, token: refreshResult.data }));
      // retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if the refresh token request fails, log the user out
      api.dispatch(logout());
    }
  }
  return result;
};

// this is a template for all API requests, just inject different endpoints to this slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
