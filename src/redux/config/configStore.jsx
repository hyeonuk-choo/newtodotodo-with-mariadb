// 리덕스툴킷 스토어함수
import { configureStore } from "@reduxjs/toolkit";
// 리듀서
import mainSlice from "../modules/mainSlice";
import statisticsSlice from "../modules/statisticsSlice";
import PlannerSlice from "../modules/plannerSlice";
import loginSlice from "../modules/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    main: mainSlice,
    statistics: statisticsSlice,
    planner: PlannerSlice,
  },
});
