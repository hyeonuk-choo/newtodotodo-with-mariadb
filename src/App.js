// eslint-disable-next-line
import Router from "./shared/Router";
import styled from "styled-components";
import bg5 from "./assets/img/bg5.jpg";

function App() {
  return (
    <StContainer>
      <Router />
    </StContainer>
  );
}

export default App;

const StContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url(${bg5});
  background-size: 50% 100%;
  background-position: left;
  display: flex;
  justify-content: center;
`;
