import React from "react";
import styled, { keyframes } from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
  width: 100vw;
  @media screen and (min-width: 550px) {
    max-width: 550px;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
  }
  height: 100vh;
  background-color: #fafafa;
  position: relative;
  opacity: 1;
  box-sizing: border-box;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Layout;
