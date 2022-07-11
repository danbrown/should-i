import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { reducer as blogReducer } from "./slices/blog";
import { reducer as userReducer } from "./slices/user";
import { reducer as settingsReducer } from "./slices/settings";
import { reducer as cakeReducer } from "./slices/cake";

export const rootPersistConfig = {
  key: "root",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["settings"],
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  cake: cakeReducer,
  blog: blogReducer,
  user: userReducer,
});

export default rootReducer;
