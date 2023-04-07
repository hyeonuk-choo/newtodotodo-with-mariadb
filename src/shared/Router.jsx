import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/utils/Layout";
import Login from "../components/login/Login";
import Signup from "../components/login/Signup";

const Router = () => {
  const token1 = localStorage.getItem("token");
  // 중앙상태관리로 token변화를 실시간으로 감지, 반영
  // Store의 state를 변경을 감지해서 Router컴포넌트 자체를 리렌더링시키고
  // 리렌더링시, 업데이트된 localStorage를 갖고온다.
  const { token2 } = useSelector((s) => s.login);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={token1 ? <MainPage /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={token1 ? <MainPage /> : <Login />} />
          <Route
            path="/statistics"
            element={token1 ? <StatisticsPage /> : <Login />}
          />
          <Route
            path="/planner-main"
            element={token1 ? <PlannerPage /> : <Login />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
