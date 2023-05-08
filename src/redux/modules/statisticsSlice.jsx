import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token");

export const __getLineChartData = createAsyncThunk(
  "getLineChartData",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/achievement/thisweek`);

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

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

const initialState = {
  rank: {}, // console destructure에러때문에 object초기값 할당
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
      .addCase(__getLineChartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getLineChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lineData = action.payload;
      })
      .addCase(__getLineChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
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
      });
  },
});

export default statisticsSlice.reducer;
