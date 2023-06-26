// 리덕스툴킷 스토어함수
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// 리듀서
import mainSlice from "../modules/mainSlice";
import statisticsSlice from "../modules/statisticsSlice";
import PlannerSlice from "../modules/plannerSlice";
import loginSlice from "../modules/loginSlice";

// 라이브러리
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  login: loginSlice,
  main: mainSlice,
  statistics: statisticsSlice,
  planner: PlannerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
