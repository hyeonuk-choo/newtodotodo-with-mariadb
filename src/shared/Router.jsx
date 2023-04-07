// 라이브러리
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

// 컴포넌트
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/utils/Layout";
import Login from "../components/login/Login";
import Signup from "../components/login/Signup";
import { logout } from "../redux/modules/loginSlice";

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
          <Route path="/" element={token ? <MainPage /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={token ? <MainPage /> : <Login />} />
          <Route
            path="/statistics"
            element={token ? <StatisticsPage /> : <Login />}
          />
          <Route
            path="/planner-main"
            element={token ? <PlannerPage /> : <Login />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
