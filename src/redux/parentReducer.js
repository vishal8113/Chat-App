import { combineReducers } from "redux";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import storage from "redux-persist/lib/storage";
// import conversationReducer from "./slices/conversation";
import chatReducer from "./slices/chat";

const parentPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "app-",
};

const parentReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  // conversation: conversationReducer,
  chat: chatReducer,
});

export { parentPersistConfig, parentReducer };
