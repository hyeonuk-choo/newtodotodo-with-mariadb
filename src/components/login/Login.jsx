// 라이브러리
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import styled from "styled-components";

// 컴포넌트
import {
  Container,
  Form,
  Input,
  Button,
  Title,
  LoginTitle,
} from "./Login.styles";
import { getAuthentication } from "../../redux/modules/loginSlice";
import LoginErrorModal from "./LoginErrorModal";
import PrivacyPolicy from "./PrivacyPolicy";
import SignupSuccessModal from "./SignupSuccessModal";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (location.state && location.state.showSuccessModal) {
      setShowSuccessModal(true);
    }
  }, [location]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(getAuthentication({ email, password }));
    console.log("response", response);
    if (response.payload) {
      navigate("/main");
    } else {
      setErrorModal(true);
    }
  };

  const handlePasswordType = (e) => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      }
      return { type: "password", visible: false };
    });
  };

  const [iconSize, setIconSize] = useState(window.innerHeight * 0.023);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerHeight * 0.023);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 개인정보처리방침 모달
  const [privcayModal, setPrivacyModal] = useState(false);
  const showPrivacyModal = (e) => {
    e.preventDefault();
    setPrivacyModal(true);
  };

  return (
    <Container>
      <div id="upper">
        <Title>
          <div id="upper-upper">고등학생을 위한... </div>
          <div id="upper-lower">투두투두</div>
        </Title>
      </div>
      <div id="lower">
        <LoginTitle>로그인</LoginTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StPasswordInput>
            <Input
              type={passwordType.type}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StVisible onClick={handlePasswordType}>
              {passwordType.visible ? (
                <AiOutlineEye size={iconSize} />
              ) : (
                <AiOutlineEyeInvisible size={iconSize} />
              )}
            </StVisible>
          </StPasswordInput>
          <Button type="submit">로그인</Button>
        </Form>
        <Link to="/signup">회원가입</Link>
        <StPrivacy>
          회원가입시
          <StPrivacyText onClick={showPrivacyModal}>
            개인정보처리방침
          </StPrivacyText>
          동의로 간주됩니다
        </StPrivacy>
      </div>
      {errorModal && <LoginErrorModal setErrorModal={setErrorModal} />}
      {privcayModal && <PrivacyPolicy setPrivacyModal={setPrivacyModal} />}
      {showSuccessModal && (
        <SignupSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </Container>
  );
};

export default Login;

const StPasswordInput = styled.div`
  width: 100%;
  position: relative;
`;

const StVisible = styled.span`
  position: absolute;
  right: 3%;
  top: 50%;
  cursor: pointer;
  transform: translateY(-65%);
`;

const StPrivacy = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 4vh;
  display: flex;
  flex-direction: row;
  gap: 5px;
  color: #b3b3b3;
  font-weight: 400;
  justify-content: center;
  font-size: 2vh;
`;

const StPrivacyText = styled.div`
  color: #f7931e;
  text-decoration: underline;
  cursor: pointer;
`;
