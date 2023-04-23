import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { StTodo, StBody, StRootDiv } from "./My.styles";
import Navbar from "../utils/Navbar";
import { getUserInfo } from "../../redux/modules/mainSlice";
import profileImgSvg from "../../assets/img/profileImgSvg.svg";

const My = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
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
  };

  return (
    <StRootDiv>
      {/* ------------ 헤더 -------------*/}
      <div className="header">
        <span>{userInfo?.username}님의 마이페이지</span>
        <button className="actionButton logoutButton">Logout</button>
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
          <img
            src={imagePreview}
            alt="preview"
            onClick={() => document.getElementById("imageUpload").click()}
          />
        ) : (
          <img
            src={profileImgSvg}
            alt="defaultimg"
            onClick={() => document.getElementById("imageUpload").click()}
          />
        )}
        <div className="edit-profile">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="school">학교 이름:</label>
              <input
                type="text"
                id="school"
                name="school"
                value={school}
                onChange={handleSchoolChange}
                placeholder="학교 이름을 입력하세요"
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">유저 이름:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="유저 이름을 입력하세요"
              />
            </div>
            <button type="submit">저장</button>
          </form>
        </div>
      </StBody>
      {/* --------- 바디부분 끝 ----------*/}

      {/* --------- 네비게이션바 ----------*/}
      <Navbar my={true} />
    </StRootDiv>
  );
};

export default My;
