import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PlannerMain from "../components/planner/PlannerMain";

import logoutAlert from "../assets/img/logoutAlert.png";

const PlannerPage = () => {
  // 토큰 만료되면 로그아웃
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loginOn, setLoginOn] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoginOn(false);
    }
  }, [loginOn]);
  return (
    <>
      {loginOn ? (
        ""
      ) : (
        <StNeedLogin>
          <StNeedLoginModal>
            <StLoginModalTop>자동 로그아웃 안내</StLoginModalTop>
            <StLoginModalImg>
              <StLogoutAlert src={logoutAlert} alt="로그인 필요" />
            </StLoginModalImg>
            <StLoginModaltxt>
              로그인 후 1시간이 경과되어
              <br />
              자동 로그아웃 되었습니다
            </StLoginModaltxt>
            <StNeedLoginBtn
              onClick={() => {
                navigate("/");
              }}
            >
              다시 로그인 하기
            </StNeedLoginBtn>
          </StNeedLoginModal>
        </StNeedLogin>
      )}
      <PlannerMain />
    </>
  );
};

export default PlannerPage;

const StNeedLogin = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(87, 87, 87, 0.3);
  z-index: 99999;
`;

const StNeedLoginBtn = styled.button`
  background: #ffffff;
  padding: 10px 0px;
  color: #f7931e;
  border-radius: 9px;
  margin-top: 17px;
  width: 85%;
  border: 1px solid #f7931e;
  border-radius: 12px;
  cursor: pointer;
`;

const StNeedLoginModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 240px;
  z-index: 99999;
  box-shadow: 0px 14px 24px -4px rgba(117, 146, 189, 0.32),
    inset 0px 8px 14px rgba(255, 255, 255, 0.3);
  border-radius: 21px;
  width: 80%;
  text-align: center;
`;

const StLoginModalTop = styled.div`
  width: 100%;
  height: 44px;
  background: #f7931e;
  font-weight: 700;
  font-size: 16px;
  border-radius: 16px 16px 0px 0px;
  color: #ffffff;
  line-height: 44px;
`;

const StLoginModalImg = styled.div`
  width: 100%;
  height: 70px;
  line-height: 70px;
`;

const StLogoutAlert = styled.img`
  width: 63px;
`;

const StLoginModaltxt = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
`;
