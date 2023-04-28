import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem("token");

const initialState = {
  userInfo: null,
  thisMonthRate: [],
  totalRate: [],
  totalTodo: [],
  mainRankList: [],
  mainRankListMonthly: [],
  mainRankListSchool: [],
  isLoading: false,
  error: null,
};

export const getUserInfo = createAsyncThunk(
  "mainSlice/getUserInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/userinfo`, {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });

      return thunkAPI.fulfillWithValue(data.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editProfile = createAsyncThunk(
  "mainSlice/editProfile",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_URL}/edit-profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data[0]);
      return thunkAPI.fulfillWithValue(response.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("editProfile action.payload", action.payload);
        state.userInfo = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

export default mainSlice.reducer;
