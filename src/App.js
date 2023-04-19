import Router from "./shared/Router";
import todoSvg from "./assets/img/todoSvg.svg";
import styled, { keyframes } from "styled-components";
import bg5 from "./assets/img/bg5.jpg";

function App() {
  return (
    <StContainer>
      <div className="wrap">
        <Router />
      </div>
    </StContainer>
  );
}

export default App;

const StContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${bg5}) no-repeat;
  background-size: 60% 100%;
  background-position: left;

  display: flex;
  justify-content: center;
  box-sizing: border-box;

  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
    left: 50%;
  }
`;
