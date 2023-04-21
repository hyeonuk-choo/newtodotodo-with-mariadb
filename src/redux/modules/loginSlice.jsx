import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const KAKAO_BASE_URL = process.env.REACT_APP_KAKAO_BASE_URL;
const GOOGLE_BASE_URL = process.env.REACT_APP_GOOGLE_BASE_URL;

// 소셜 로그인
export const __kakaoLogin = createAsyncThunk(
  "kakao/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${KAKAO_BASE_URL}?code=${payload}`);

      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.alert("로그인에 실패하였습니다.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __googleLogin = createAsyncThunk(
  "google/login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${GOOGLE_BASE_URL}?code=${payload}`);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("nickname", data.nickname);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      window.alert("로그인에 실패하였습니다.");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 회원 정보 받기
export const __nicknameCheck = createAsyncThunk(
  "nickname/check",
  async (payload, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${BASE_URL}/check-nickname`,
        payload,
        config
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const getAuthentication = createAsyncThunk(
  "getAuthentication",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, payload);
      localStorage.setItem("token", response.data.token);
      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  token: "",
  user: [],
  nickname: [],
  nicknameCheck: [],
  isLoading: false,
  error: "",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthentication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("action.payload", action.payload);
        state.token = action.payload;
      })
      .addCase(getAuthentication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__kakaoLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__kakaoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = true;
      })
      .addCase(__kakaoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__googleLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.nickname = action.payload.nickname;
        state.token = true;
      })
      .addCase(__googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(__nicknameCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__nicknameCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nicknameCheck = action.payload;
      })
      .addCase(__nicknameCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.nicknameCheck = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
