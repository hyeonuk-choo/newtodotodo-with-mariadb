import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/utils/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/planner-main" element={<PlannerPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
