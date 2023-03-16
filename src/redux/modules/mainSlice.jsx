import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
// const nickname = localStorage.getItem("nickname");

export const __getUserInfo = createAsyncThunk(
  // extraReducer 미동작 이유: 다른 Thunk함수의 이름과 중복!
  "getUserInfo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/userinfo`);
      console.log(data.data[0]);
      return thunkAPI.fulfillWithValue(data.data[0]);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getThisMonthRate = createAsyncThunk(
  "getThisMonthRate",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/todo/achievement/thismonth`,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTotalRate = createAsyncThunk(
  "getTotalRate",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/todo/achievement/total/${payload}`,
        config
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getTotalTodo = createAsyncThunk(
  "getTotalTodo",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(`${BASE_URL}/todo/total`, config);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMainRank = createAsyncThunk(
  "getMainRank",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/rank/weekly?page=${payload}&size=${3}`,
        // payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getMainRankMonthly = createAsyncThunk(
  "getMainRankMonthly",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.get(
        `${BASE_URL}/rank/monthly?page=${payload}&size=${3}`,
        // payload,
        config
      );
      return thunkAPI.fulfillWithValue(data.data.content);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __getDday = createAsyncThunk(
  "getDday",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(`${BASE_URL}/dday`);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateDday = createAsyncThunk(
  "updateDday",
  async (payload, thunkAPI) => {
    try {
      let accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const data = await axios.put(`${BASE_URL}/d-day`, payload, config);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  userInfo: [],
  dday: [],
  thisMonthRate: [],
  totalRate: [],
  totalTodo: [],
  mainRankList: [],
  mainRankListMonthly: [],
  mainRankListSchool: [],
  isLoading: false,
  error: null,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getUserInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getUserInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    [__getUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [__getThisMonthRate.pending]: (state) => {
      state.isLoading = true;
    },
    [__getThisMonthRate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.thisMonthRate = action.payload;
    },
    [__getThisMonthRate.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [__getTotalRate.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTotalRate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalRate = action.payload;
    },
    [__getTotalRate.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },

    [__getTotalTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTotalTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.totalTodo = action.payload;
    },
    [__getTotalTodo.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },

    [__getMainRank.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMainRank.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mainRankList.push(...action.payload);
      state.mainRankListMonthly = [];
    },
    [__getMainRank.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },
    [__getMainRankMonthly.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMainRankMonthly.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mainRankListMonthly.push(...action.payload);
      state.mainRankList = [];
    },
    [__getMainRankMonthly.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload.message;
    },
    [__getDday.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDday.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dday = action.payload[0];
    },
    [__getDday.rejected]: (state, action) => {
      state.isLoading = false;

      state.error = action.payload;
    },

    [__updateDday.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateDday.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dday.title = action.meta.arg.title;
      state.dday.selectedDate = action.meta.arg.selectedDate;
    },
    [__updateDday.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default mainSlice.reducer;
