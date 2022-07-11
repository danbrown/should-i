import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// ------------------------------------
// - Initial State
// ------------------------------------

const sliceKey = "blog";

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

// ------------------------------------
// - Slice Reducers
// ------------------------------------

const slice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getPosts: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    hasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// IN CASE TO USE PERSISTANCE
export const persistConfig = {
  key: sliceKey,
  storage: storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const reducer = persistReducer(persistConfig, slice.reducer); // use this in case of persist
export const actions = slice.actions;
// export const reducer = slice.reducer; // replace in case of persist

export default slice;

// ------------------------------------
// - Action Handlers
// ------------------------------------

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(actions.startLoading());
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => dispatch(actions.getPosts(data)))
      .catch((error) => dispatch(actions.hasError(error)));
  };
};
