// 라이브러리
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// 컴포넌트
import {
  Container,
  Form,
  SignupTitle,
  Title,
  Input,
  Button,
  SuccessMsg,
  InputContainer,
  CheckButton,
  UserMessage,
  EmailMessage,
  PasswordMessage,
} from "./Signup.styles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [username, setUsername] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const onClickUsernameCheck = async (e) => {
    e.preventDefault();

    // Validation
    // const regex = /^(?=.*[가-힣a-zA-Z0-9]).{2,10}$/;
    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    // 입력이 없을 때, 입력이 있을 때
    if (username.length < 1) {
      setUsernameMsg("사용자 이름을 입력하세요");
      return;
    } else if (!regex.test(username)) {
      setUsernameMsg("이름은 2자이상 10자이내, 한글/영문/숫자만 가능");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/username-check`, {
        username,
      });
      if (response.data.exists) {
        setUsernameMsg("이미 사용중인 사용자 이름입니다.");
        setUsernameValid(false);
      } else {
        setUsernameMsg("사용 가능한 사용자 이름입니다.");
        setUsernameValid(true);
      }
    } catch (error) {
      console.error("Username check failed:", error);
    }
  };

  const onClickEmailCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/email-check`, {
        email,
      });
      if (response.data.exists) {
        setEmailValid(false);
        setEmailMsg("이미 사용중인 이메일입니다.");
      } else {
        setEmailValid(true);
        setEmailMsg("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("Email check failed:", error);
    }
  };

  const handlePasswordCheck = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!regex.test(password)) {
      setPasswordMsg("비밀번호는 8자 이상, 영문/숫자/특수문자 포함.");
      setPasswordValid(false);
    } else {
      setPasswordMsg("");
      setPasswordValid(true);
    }
  };

  const handleUsernameChange = (e) => {
    // 입력자체도 10자까지만 가능하게함
    const inputVal = e.target.value;
    setUsername(inputVal.slice(0, 10));

    // 입력하는 동안에 유효성 검증 초기화
    setUsernameValid(false);

    // 입력하는 동안 Validation 및 메세지 안내
    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    if (!regex.test(username)) {
      setUsernameMsg("이름은 2자이상 10자이내, 한글/영문/숫자만 가능");
    } else {
      setUsernameMsg("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(false);
    setEmailMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(false);
    setPasswordMsg("");
    handlePasswordCheck(e.target.value);
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameValid) {
      setUsernameMsg("사용자 이름 중복 확인이 필요합니다.");
      return;
    }
    if (!emailValid) {
      setEmailMsg("이메일 중복 확인이 필요합니다.");
      return;
    }
    if (!passwordValid) {
      setPasswordMsg("비밀번호 유효성 검사를 통과해야 합니다.");
      return;
    }
    if (!passwordMatch) {
      setPasswordMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("https://example.com/api/signup", {
        email,
        password,
        username,
      });

      console.log("Signup successful:", response.data);
      setSuccessMsg("회원가입이 완료되었습니다.");
    } catch (error) {
      console.error("Signup failed:", error);
    }
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
        <SignupTitle>회원가입</SignupTitle>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <label htmlFor="username">사용자 이름*</label>
            <div className="input-Button-container">
              <Input
                type="text"
                id="username"
                placeholder="영문/한글/숫자 2자이상 10자이내"
                value={username}
                onChange={handleUsernameChange}
              />
              <CheckButton onClick={onClickUsernameCheck}>중복체크</CheckButton>
            </div>
          </InputContainer>

          <UserMessage usernameValid={usernameValid}>{usernameMsg}</UserMessage>

          <InputContainer>
            <label htmlFor="email">이메일*</label>
            <div className="input-Button-container">
              <Input
                type="text"
                id="email"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
              />
              <CheckButton onClick={onClickEmailCheck}>중복체크</CheckButton>
            </div>
          </InputContainer>

          <EmailMessage emailValid={emailValid}>{emailMsg}</EmailMessage>

          <InputContainer>
            <label htmlFor="password">비밀번호*</label>
            <Input
              type="password"
              id="password"
              placeholder="비밀번호"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="password">비밀번호 확인*</label>
            <Input
              type="password"
              id="password-confirm"
              placeholder="비밀번호 확인"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </InputContainer>

          <PasswordMessage>{passwordMsg}</PasswordMessage>

          <Button type="submit">회원가입</Button>
        </Form>
        <Link to="/">로그인</Link>
        <SuccessMsg>{successMsg}</SuccessMsg>
      </div>
    </Container>
  );
};

export default Signup;
