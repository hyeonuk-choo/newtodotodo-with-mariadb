import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MiniModal = () => {
  const navigate = useNavigate();
  return (
    <StRootDiv
      onClick={() => {
        localStorage.removeItem("token");
        navigate("/");
      }}
    >
      Logout
    </StRootDiv>
  );
};

export default MiniModal;

const StRootDiv = styled.div`
  position: absolute;
  box-shadow: rgba(19, 19, 19, 0.15) 0px 4px 15px;
  border-radius: 10px;
  width: 30vw;
  height: 11vw;

  right: 0;
  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
