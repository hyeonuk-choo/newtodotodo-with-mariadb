// 라이브러리
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// 컴포넌트
import {
  Container,
  Form,
  SignupTitle,
  Input,
  Button,
  Title,
} from "./Signup.styles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://example.com/api/signup", {
        email,
        password,
        username,
      });

      console.log("Signup successful:", response.data);
      // 회원가입 성공 후 처리 작업
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
          <Input
            type="text"
            placeholder="사용자 이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button type="submit">회원가입</Button>
        </Form>
        <Link to="/">로그인</Link>
      </div>
    </Container>
  );
};

export default Signup;
