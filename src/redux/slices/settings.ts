import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { parseCookies, setCookie } from "nookies";

// ------------------------------------
// - Initial State
// ------------------------------------

const sliceKey = "settings";

const initialState = {
  loading: false,
  theme: "dark",
};

// ------------------------------------
// - Slice Reducers
// ------------------------------------

const slice = createSlice({
  name: sliceKey,
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.loading = true;
    },

    // Settings init
    settingsInit(state, action) {
      state.loading = false;
      state.theme = action.payload.theme;
    },

    // Current theme
    setCurrentTheme: (state, actions) => {
      state.theme = actions.payload;
    },
  },
});

// IN CASE TO USE PERSISTANCE
export const persistConfig = {
  key: sliceKey,
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["theme"],
};

export const reducer = persistReducer(persistConfig, slice.reducer); // use this in case of persist
export const actions = slice.actions;
// export const reducer = slice.reducer; // replace in case of persist

export default slice;

// ------------------------------------
// - Action Handlers
// ------------------------------------

export const setCurrentTheme = (theme) => (dispatch) => {
  dispatch(actions.setCurrentTheme(theme));
  setCookie({}, "theme", theme, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
    domain:
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
        : "localhost",
  });
};

export const settingsInit = () => {
  return (dispatch) => {
    dispatch(actions.startLoading());
    const cookies = parseCookies();
    const theme = cookies.theme;
    if (theme) {
      dispatch(actions.setCurrentTheme(theme));
    } else {
      setCookie({}, "theme", initialState.theme, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN
            : "localhost",
      });
      dispatch(actions.setCurrentTheme(initialState.theme));
    }
  };
};
