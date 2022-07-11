import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// ------------------------------------
// - Initial State
// ------------------------------------

const sliceKey = "cake";

const initialState = {
  numberOfCakes: 10,
};

// ------------------------------------
// - Slice Reducers
// ------------------------------------

const slice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    buyCake: (state) => {
      state.numberOfCakes -= 1;
    },
  },
});

// IN CASE TO USE PERSISTANCE
export const persistConfig = {
  key: sliceKey,
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["numberOfCakes"],
};

export const reducer = persistReducer(persistConfig, slice.reducer); // use this in case of persist
export const actions = slice.actions;
// export const reducer = slice.reducer; // replace in case of persist

export default slice;

// ------------------------------------
// - Action Handlers
// ------------------------------------

export const { buyCake } = slice.actions; // default action handlers
