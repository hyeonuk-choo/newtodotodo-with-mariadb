import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { StTodo, StBody, StRootDiv } from "./My.styles";
import Navbar from "../utils/Navbar";
import { getUserInfo } from "../../redux/modules/mainSlice";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";
import cameraSvg from "../../assets/img/cameraSvg.svg";

// My.jsx
const My = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const { userInfo } = useSelector((state) => state.main); // mainSlice

  useEffect(() => {
    dispatch(getUserInfo(token));
  }, []);

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [school, setSchool] = useState("");
  const [username, setUsername] = useState("");

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("School:", school);
    console.log("Username:", username);
    // 여기서 API 호출 등으로 서버에 변경 사항을 저장하세요.
    setEditMode(false);
  };

  const [editMode, setEditMode] = useState(false);

  return (
    <StRootDiv>
      {/* ------------ 헤더 -------------*/}
      <div className="header">
        <span>{userInfo?.username}님의 마이페이지</span>
        <button
          className="actionButton logoutButton"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* -------- 바디부분 시작 ---------*/}
      <StBody>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="imageUpload"
        />
        {imagePreview ? (
          <div
            className="imgBox"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <img className="picture" src={imagePreview} alt="preview" />
            <img className="camera" src={cameraSvg} alt="cameraSvg" />
          </div>
        ) : (
          <div
            className="imgBox"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <img className="picture" src={profileImgSvg} alt="defaultimg" />
            <img className="camera" src={cameraSvg} alt="cameraSvg" />
          </div>
        )}
        <div className="edit-profile">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="row">이번달 순위: {userInfo?.monthRank}</div>
              <div className="row">E-mail: {userInfo?.email}</div>
              <div className="row">
                <label htmlFor="school">유저 이름: </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={school}
                  onChange={handleSchoolChange}
                  placeholder="누구신지?"
                />
              </div>
              <div className="row">
                <label htmlFor="username">학교 이름: </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="어디 학교 다니나요?"
                />
              </div>
              <div className="row">
                <label htmlFor="grade">학년 입력: </label>
                <select
                  id="grade"
                  name="grade"
                  value={username}
                  onChange={handleUsernameChange}
                >
                  <option value="">학년을 선택하세요</option>
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                </select>
              </div>
              <div className="row">
                <label htmlFor="username">자기소개: </label>
                <textarea
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="자기소개를 자세히 해보세요"
                />
              </div>

              <button type="submit">저장</button>
            </form>
          ) : (
            <>
              <div className="row">이번달 순위: {userInfo?.monthRank}</div>
              <div className="row">E-mail: {userInfo?.email}</div>
              <div className="row">유저 이름: {userInfo?.username}</div>
              <div className="row">학교 이름: {userInfo?.highschool}</div>
              <div className="row">학년: {userInfo?.grade}</div>
              <div className="row">자기소개: </div>
              <button onClick={() => setEditMode(true)}>수정하기</button>
            </>
          )}
        </div>
      </StBody>
      {/* --------- 바디부분 끝 ----------*/}

      {/* --------- 네비게이션바 ----------*/}
      <Navbar my={true} />
    </StRootDiv>
  );
};

export default My;
