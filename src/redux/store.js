import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";

import { persistStore, persistReducer } from "redux-persist";

import { parentPersistConfig, parentReducer } from "./parentReducer";

const store = configureStore({
  reducer: persistReducer(parentPersistConfig, parentReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useDispatch, useSelector };
