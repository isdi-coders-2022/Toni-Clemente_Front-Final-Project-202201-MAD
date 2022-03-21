import { configureStore } from "@reduxjs/toolkit";
import { locationsReducer } from "./locations/locations-reducers";
import { userReducer } from "./user/user.reducer";
// import thunk from "redux-thunk";

const preloadedState = {
  counter: 0,
  locations: [],
};

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    user: userReducer,
  },
  preloadedState,
});
