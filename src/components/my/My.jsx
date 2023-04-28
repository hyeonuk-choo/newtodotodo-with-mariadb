import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { StTodo, StBody, StRootDiv } from "./My.styles";
import Navbar from "../utils/Navbar";
import { editProfile, getUserInfo } from "../../redux/modules/mainSlice";
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // // 서버에 이미지 업로드 API통신
      // const formData = new FormData();
      // formData.append("profileImage", file);
      // formData.append("userId", userInfo.id); // 필요한 경우 사용자 ID를 추가합니다.

      // try {
      //   await axios.post(`${BASE_URL}/upload`, formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${token}`, // JWT 토큰이 필요한 경우 헤더에 추가합니다.
      //     },
      //   });
      //   console.log("이미지 업로드 성공");
      //   // 서버에서 사용자 정보를 다시 가져옵니다.
      //   dispatch(getUserInfo(token));
      // } catch (error) {
      //   console.log("이미지 업로드 실패", error);
      // }
    }
  };

  const [userProfile, setUserProfile] = useState({
    username: userInfo?.username,
    school: userInfo?.school,
    grade: userInfo?.grade,
    myMotto: userInfo?.myMotto,
  });

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  console.log("함수 빠져나온 후", userProfile);
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기서 API 호출 등으로 서버에 변경 사항을 저장.
    dispatch(editProfile(userProfile));

    setEditMode(false);
  };

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
        <div
          className="imgBox"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          <img
            className="picture"
            src={imagePreview || profileImgSvg}
            alt="profile"
          />
          <img className="camera" src={cameraSvg} alt="cameraSvg" />
        </div>

        <div className="edit-profile">
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="row">이번달 순위: {userInfo?.monthRank}</div>
              <div className="row">E-mail: {userInfo?.email}</div>
              <div className="row">
                <label htmlFor="username">유저 이름: </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userProfile?.username}
                  onChange={handleUsernameChange}
                  placeholder="누구신지?"
                />
              </div>
              <div className="row">
                <label htmlFor="school">학교 이름: </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={userProfile?.school}
                  onChange={handleUsernameChange}
                  placeholder="어디 학교 다니나요?"
                />
              </div>
              <div className="row">
                <label htmlFor="grade">학년 입력: </label>
                <select
                  id="grade"
                  name="grade"
                  value={userProfile?.grade}
                  onChange={handleUsernameChange}
                >
                  <option value="">학년을 선택하세요</option>
                  <option value="1학년">1학년</option>
                  <option value="2학년">2학년</option>
                  <option value="3학년">3학년</option>
                </select>
              </div>
              <div className="row">
                <label htmlFor="myMotto">자기소개: </label>
                <textarea
                  type="text"
                  id="myMotto"
                  name="myMotto"
                  value={userProfile?.myMotto}
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
              <div className="row">학교 이름: {userInfo?.school}</div>
              <div className="row">학년: {userInfo?.grade}</div>
              <div className="row">자기소개: {userInfo?.myMotto}</div>
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
