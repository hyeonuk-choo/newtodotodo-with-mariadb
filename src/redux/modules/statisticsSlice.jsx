import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getRank = createAsyncThunk(
  "getRank",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/rank`, {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });
      console.log("getRank의 data", data);

      return thunkAPI.fulfillWithValue(data.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const getAchievementRate = createAsyncThunk(
  "getAchievementRate",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/achievement-rate`, {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });
      console.log("getAchievementRate data", data);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  rank: {}, // console destructure에러때문에 object초기값 할당
  achievementRate: {},
  rankScoreData: [{}, {}, {}],
  barData: [{}, {}],
  lineData: [{}, {}],
  heatmapData: [],
  isLoading: false,
  error: null,
};

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rank = action.payload;
      })
      .addCase(getRank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(getAchievementRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAchievementRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.achievementRate = action.payload;
      })
      .addCase(getAchievementRate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default statisticsSlice.reducer;
