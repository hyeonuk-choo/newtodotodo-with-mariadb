// 라이브러리
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

// 컴포넌트
import Layout from "../components/utils/Layout";
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import MyPage from "../pages/MyPage";
import Login from "../components/login/Login";
import Signup from "../components/login/Signup";
import { logout } from "../redux/modules/loginSlice";

// Router.jsx
const Router = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // 중앙상태관리로 token변화를 실시간으로 감지, 반영
  // Store의 state를 변경을 감지해서 Router컴포넌트 자체를 리렌더링시키고
  // 리렌더링시, 업데이트된 localStorage를 갖고온다.
  const { token2 } = useSelector((s) => s.login);

  function isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      localStorage.removeItem("token");
      dispatch(logout()); // 로그아웃 액션 디스패치
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/planner-main" element={<PlannerPage />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
