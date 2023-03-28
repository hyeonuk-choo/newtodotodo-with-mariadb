import Router from "./shared/Router";
import todoSvg from "./assets/img/todoSvg.svg";
import styled, { keyframes } from "styled-components";

function App() {
  return (
    <StContainer>
      <Router />
    </StContainer>
  );
}

const StContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ccc;

  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

export default App;
