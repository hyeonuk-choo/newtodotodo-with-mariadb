import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import Layout from "../components/utils/Layout";
import Login from "../components/login/Login";
import Signup from "../components/login/Signup";

const Router = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={token ? <MainPage /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/main"
            element={token ? <MainPage /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/statistics"
            element={
              token ? <StatisticsPage /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/planner-main"
            element={token ? <PlannerPage /> : <Login onLogin={handleLogin} />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
