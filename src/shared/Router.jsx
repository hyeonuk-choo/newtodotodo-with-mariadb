import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import PlannerPage from "../pages/PlannerPage";
import StatisticsPage from "../pages/StatisticsPage";
import MyPage from "../pages/MyPage";
import KakaoLogin from "../components/login/KakaoLogin";
import GoogleLogin from "../components/login/GoogleLogin";
import NaverLogin from "../components/login/NaverLogin";
import ProfileInfoPage from "../pages/ProfileInfoPage";
import PlannerCategoryAdd from "../components/planner/PlannerCategoryAdd";
import FollowerPage from "../pages/FollowerPage";
import FollowingPage from "../pages/FollowingPage";
import Setting from "../components/my/Setting";
import ProfileEdit from "../components/my/ProfileEdit";
import Planner from "../components/planner/Planner";
import PlannerCategoryDate from "../components/planner/PlannerCategoryDate";
import OtherMyPage from "../pages/OtherMyPage";
import Loading from "../components/login/Loading";
import ProfilePlanner from "../components/my/ProfilePlanner";
import Layout from "../components/utils/Layout";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const Router = () => {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <StContainer>
        <Layout>
          <Routes>
            <Route
              path='/login'
              element={token !== null ? <Navigate replace to='/' /> : <LoginPage />}
            />
            <Route path='/' element={token === null ? <Navigate replace to='/login' /> : <MainPage />} />
            <Route path='/my' element={token === null ? <Navigate replace to='/login' /> : <MyPage />} />
            <Route path='/my/planner' element={token === null ? <Navigate replace to='/login' /> : <ProfilePlanner />} />
            <Route path='/othermy/:id' element={token === null ? <Navigate replace to='/login' /> : <OtherMyPage />} />
            <Route path='/follower/:id' element={token === null ? <Navigate replace to='/login' /> : <FollowerPage />} />
            <Route path='/following/:id' element={token === null ? <Navigate replace to='/login' /> : <FollowingPage />} />
            <Route path='/profileedit' element={token === null ? <Navigate replace to='/login' /> : <ProfileEdit />} />
            <Route path='/setting' element={token === null ? <Navigate replace to='/login' /> : <Setting setToken={setToken} />} />
            <Route path='/planner' element={token === null ? <Navigate replace to='/login' /> : <PlannerPage />} />
            <Route path='/planner/date' element={token === null ? <Navigate replace to='/login' /> : <PlannerCategoryDate />} />
            <Route path='/planner/category' element={token === null ? <Navigate replace to='/login' /> : <PlannerCategoryAdd />} />
            <Route path='/planner/category/todolist' element={token === null ? <Navigate replace to='/login' /> : <Planner />} />
            <Route path='/statistics' element={token === null ? <Navigate replace to='/login' /> : <StatisticsPage />} />
            {/* <Route path='/profileinfo' element={token !== null ? <Navigate replace to="/" /> : <ProfileInfoPage />} /> */}
            <Route path='/profileinfo' element={<ProfileInfoPage />} />
            <Route path='/user/kakao/callback' element={<KakaoLogin setToken={setToken} />} />
            <Route path='/user/google/callback' element={<GoogleLogin setToken={setToken} />} />
            <Route path='/user/naver/callback' element={<NaverLogin />} />
          </Routes>
        </Layout>
      </StContainer>
    </BrowserRouter>
  );
};

const StContainer = styled.div`
  width:100vw;
  height:850px;
  display: flex;
  /* background-color: #fafafa; */
  justify-content:center;
  box-sizing:border-box;


  @media screen and (min-height: 850px) {
  height:1180px;
  }

  @media screen and (min-height: 915px) {
  height:1024px;
  }

  @media screen and (min-height: 1024px) {
  height:1180px;
  }
  @media screen and (min-height: 1180px) {
  height:1366px;
  }
`

export default Router;
