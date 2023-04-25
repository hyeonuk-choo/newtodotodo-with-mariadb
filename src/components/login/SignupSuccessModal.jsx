import React from "react";
import styled from "styled-components";
// 아이콘
import ModalBasic from "../utils/ModalBasic";
import manSvg from "../../assets/img/men/mstile-70x70.png";

const SignupSuccessModal = ({ onClose }) => {
  return (
    <ModalBasic
      modalWidth="60%"
      modalHeight="40%"
      modalTop={(100 - 40) / 2 + "%"}
      modalLeft={(100 - 60) / 2 + "%"}
      modalImage={manSvg}
      modalContent="환영합니다! 회원가입이 정상적으로 완료되었습니다!"
      modalButton={true}
      onClose={onClose}
    />
  );
};
export default SignupSuccessModal;
