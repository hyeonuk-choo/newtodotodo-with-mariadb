import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;



const nickname = localStorage.getItem("nickname");

const initialState = {
  rankScoreData: [{}, {}, {}],
  barData: [{}, {}],
  lineData: [{}, {}],
  heatmapData: [],
  isLoading: false,
  error: null,
};

export const __getRankScoreData = createAsyncThunk(
  "__getRankScoreData",
  async (payload, thunkAPI) => {
    try {

      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const lastWeekData = await axios.get(
        `${BASE_URL}/rank/lastweek/member`,
        config
      );
      const weeklyData = await axios.get(
        `${BASE_URL}/rank/weekly/member/${payload}`,
        config
      );
      const monthlyData = await axios.get(
        `${BASE_URL}/rank/monthly/member/${payload}`,
        config
      );
      console.log("lastWeekData.data", lastWeekData.data);
      console.log("thisWeekData.data", weeklyData.data);
      console.log("monthlyData.data", monthlyData.data);
      return thunkAPI.fulfillWithValue([
        lastWeekData.data,
        weeklyData.data,
        monthlyData.data,
      ]);
    } catch (error) {
      console.log("error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getLineChartData = createAsyncThunk(
  "getLineChartData",
  async (payload, thunkAPI) => {
    // console.log("payload", payload);
    try {
      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/todo/achievement/thisweek`,
        config
      );
      console.log("linechart", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getHeatMapData = createAsyncThunk(
  "getHeatMapData",
  async (payload, thunkAPI) => {
    // console.log("payload", payload);
    try {

      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/todo/achievement/dayly`,
        config
      );
      console.log("Heatmap", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getRankScoreData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getRankScoreData.fulfilled]: (state, action) => {
      // console.log("extraReducers action.payload", action.payload);
      state.isLoading = false;
      state.rankScoreData = action.payload;
    },
    [__getRankScoreData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },

    [__getLineChartData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getLineChartData.fulfilled]: (state, action) => {
      console.log("linechart/action.payload", action.payload);
      state.isLoading = false;
      state.lineData = action.payload;
    },
    [__getLineChartData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },

    [__getHeatMapData.pending]: (state) => {
      state.isLoading = true;
    },
    [__getHeatMapData.fulfilled]: (state, action) => {
      // console.log("action.payload", action.payload);
      state.isLoading = false;
      state.heatmapData = action.payload;
    },
    [__getHeatMapData.rejected]: (state, action) => {
      state.isLoading = false;
      console.log("rejected action", action);
      state.error = action.payload.message;
    },
  },
});

export default statisticsSlice.reducer;
