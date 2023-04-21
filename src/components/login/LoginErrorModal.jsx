import React from "react";
import styled from "styled-components";
// 아이콘
import ModalBasic from "../utils/ModalBasic";
import infoSvg from "../../assets/img/mainpage/info.svg";

const LoginErrorModal = ({ setErrorModal }) => {
  return (
    <ModalBasic
      modalWidth="60%"
      modalHeight="40%"
      modalTop={(100 - 40) / 2 + "%"}
      modalLeft={(100 - 60) / 2 + "%"}
      modalImage={infoSvg}
      modalContent="이메일 또는 비밀번호를 다시 확인해주세요"
      modalButton={true}
      setErrorModal={setErrorModal}
    />
  );
};
export default LoginErrorModal;
