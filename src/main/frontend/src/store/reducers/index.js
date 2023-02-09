import { combineReducers } from "redux";
import auth from "./auth";
import { apiSlice } from "./api";

const rootReducer = combineReducers({
  auth,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
