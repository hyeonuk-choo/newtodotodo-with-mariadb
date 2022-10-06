import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { __googleLogin } from "../../redux/modules/loginSlice";
import todoSvg from "../../assets/img/todoSvg.svg";
import styled, { keyframes } from "styled-components";

// 구글 로그인만 렌더링 최적화 - useCallback, useEffect 적용
const GoogleLogin = ({ setToken }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const GOOGLE_CODE = location.search.split("=")[1].split("&")[0];
  const { user } = useSelector((state) => state.login);

  const timeFunc = (url) => {
    setTimeout(() => {
      navigate(url);
    }, 4500);
  };

  // 회원가입해서 nickname 없을 때 회원정보 등록하면 작업해줘야 유저정보 없다는 에러가 안나옴
  const nicknameCheck = useCallback(
    (user) => {
      if (user.nickname) {
        timeFunc("/");
        // navigate('/')
      } else {
        timeFunc("/profileinfo");
        // navigate("/profileinfo");
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (user) {
      let token = localStorage.getItem("accessToken");
      nicknameCheck(user);
      setToken(token);
    }
  }, [user]);

  useEffect(() => {
    dispatch(__googleLogin(GOOGLE_CODE));

    return () => {
      clearTimeout(timeFunc);
    };
  }, []);

  return (
    <StContainer>
      <StTitleBox>
        <StImgBox1>
          <img src={todoSvg} alt='todoSvg' />
        </StImgBox1>
      </StTitleBox>
    </StContainer>
  );
};

const titleFade = keyframes`
  0% {
    display:block;
  }

  100% {
    display:none;
  }
`;
const titleShow = keyframes`
  0% {
    opacity: 1;
  }
  10% {
    opacity: 1;
    bottom:55%;
  }
  20% {
    opacity: 1;
    bottom:53%;
  }
  30% {
    opacity: 1;
    bottom:55%;
  }
  40% {
    opacity: 1;
    bottom:55%;
  }
  50% {
    opacity: 1;
    bottom:55%;
  }
  60% {
    opacity: 1;
    bottom:55%;
  }
  70% {
    opacity: 1;
    bottom:55%;
  }
  80% {
    opacity: 1;
    bottom:55%;
  }
  100% {
    opacity: 0;
    bottom:1400px;
  }
`;

const backgroundChange = keyframes`
  0% {
    opacity:1;
  }
  50% {
    background: #fafafa;
    opacity:0;
  }
  75% {
    background: #fafafa;
    opacity:0.5;
  }
  100% {
    background: #fafafa;
    opacity:1;
  }
`;

const StContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 360px;
  height: 100vh;
  overflow: hidden;
  background: #ff8f27;
  animation: ${backgroundChange} 1s 4s alternate both;

  @media screen and (min-width: 768px) {
    width: 600px;
  }
`;

const StTitleBox = styled.div`
  animation: ${titleFade} 1s 4s alternate both;
`;

const StImgBox1 = styled.div`
  position: absolute;
  width: 400px;
  left: 50%;
  bottom: -400px;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  animation: ${titleShow} 3s 0.5s alternate ease-in both;

  & img {
    opacity: 0;
    width: 100%;
    animation: ${titleShow} 4s 1s alternate ease both;
    /* background-size: contain; */
  }

  @media screen and (max-width: 768px) {
    /* display:none; */
    width: 300px;
  }
`;

export default GoogleLogin;
