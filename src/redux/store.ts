import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer, { rootPersistConfig } from "./rootReducer";

// Middleware options for each environment
const middleware = (getDefaultMiddleware) => {
  return process.env.NODE_ENV !== "production"
    ? getDefaultMiddleware().concat(logger, thunk)
    : getDefaultMiddleware().concat(thunk);
};

// Store configuration
const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: middleware,
  devTools: process.env.NODE_ENV !== "production",
});

// Persist store for persist provider
const persistor = persistStore(store);

export { persistor, store };
