import React from "react";
import styled, { keyframes } from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
  width: 60vh;
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
