// 라이브러리
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// 컴포넌트
import {
  Container,
  Form,
  Input,
  Button,
  Title,
  LoginTitle,
} from "./Login.styles";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      const { token } = response.data;
      console.log("token", token);
      if (token) {
        onLogin(token);
        navigate("/main");
      } else {
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
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
        <LoginTitle>로그인</LoginTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">로그인</Button>
        </Form>
        <Link to="/signup">회원가입</Link>
      </div>
    </Container>
  );
};

export default Login;
