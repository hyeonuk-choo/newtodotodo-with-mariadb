import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../../utils/Layout";

const PrevLogin = () => {
  //카카오 로그인
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const onKakaoLoginHandler = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  //구글 로그인

  const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const onGoogleLoginHandler = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline&flowName=GeneralOAuthFlow`;
  };

  return (
    <Layout>
      <StLoginContainer>
        {/* 고등학생을 위한 투두리스트 텍스트로 변경하기 */}
        <StPhrases>고등학생을 위한 투두리스트</StPhrases>
        <StLogobox>
          <StLogoPencil />
        </StLogobox>

        <StLoginBtnbox>
          <StKakaoBtn onClick={onKakaoLoginHandler}>
            <StBtnBox>
              <div>
                <StKakaoBtnImg alt="kakaoUnionIcon" />
              </div>
              <StKakaoBtnFont>카카오 로그인</StKakaoBtnFont>
            </StBtnBox>
          </StKakaoBtn>
          {/* <Naver /> */}
          <StGoogleBtn onClick={onGoogleLoginHandler}>
            <StBtnBox>
              <div>
                <StGoogleBtnImg alt="googleUnionIcon" />
              </div>
              <StGoogleBtnFont>구글 로그인</StGoogleBtnFont>
            </StBtnBox>
          </StGoogleBtn>
        </StLoginBtnbox>
      </StLoginContainer>
    </Layout>
  );
};

export default PrevLogin;

const layoutShow = keyframes`
  0% {
    display:block;
    opacity:0;
  }
  25% {
    display:block;
    opacity:0.25;
  }
  50% {
    display:block;
    opacity:0.5;
  }
  75% {
    display:block;
    opacity:0.75;
  }
  100% {
    display:block;
    opacity:1;
  }
`;

const StLoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const StLogobox = styled.div``;

const StLogo = styled.img`
  width: 150px;
  height: 40px;
  position: relative;
  left: 15px;
  top: 10px;
`;

const StLogoPencil = styled.img`
  width: 38px;
  height: 38px;
  position: relative;
  left: 20px;
  bottom: 10px;
`;
const StPhrases = styled.div`
  width: 180px;
  height: 20px;
  padding-top: 180px;
  padding-bottom: 16px;
  box-sizing: border-box;
  /* position: relative;
  top: 150px; */
`;
const StLoginBtnbox = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StKakaoBtn = styled.button`
  width: 280px;
  height: 50px;
  border: 1px solid #e8e8e8;
  background: #ffe768;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin-bottom: 5%;
`;

const StKakaoBtnImg = styled.img`
  position: relative;
  right: 10px;
`;

const StKakaoBtnFont = styled.span`
  position: relative;
  left: 5px;
  font-size: 16px;
  color: #111;
`;
const StNaverBtn = styled.button`
  margin-bottom: 5%;
`;
const StGoogleBtn = styled.button`
  width: 280px;
  height: 50px;

  background: #ffffff;

  border: 1px solid #e8e8e8;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  vertical-align: center;
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StGoogleBtnImg = styled.img`
  position: relative;
  right: 15px;
  vertical-align: center;
`;

const StGoogleBtnFont = styled.span`
  position: relative;
  left: 5px;
  font-size: 16px;
  color: #111;
`;
