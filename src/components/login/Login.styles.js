import styled from "styled-components";

const flexCenterMixin = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const peach = "rgb(255 227 174);";
const lightOrange = "#FFB400";
const orange = "rgb(255, 123, 0);";

export const Container = styled.div`
  background: ${peach};

  #upper {
    box-sizing: border-box;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  #lower {
    box-sizing: border-box;
    height: calc(100vh - 30vh);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2vh;
    padding-top: 7vh;
  }
`;

export const Title = styled.div`
  box-sizing: border-box;
  font-weight: bold;

  #upper-upper {
    font-size: 3vh;
    color: #ff8c0a;
  }

  #upper-lower {
    font-size: 8vh;
    color: ${orange};
  }
`;

export const LoginTitle = styled.div`
  box-sizing: border-box;
  font-size: 4vh;
  font-weight: bold;
`;

export const Form = styled.form`
  width: 55%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;
export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 5vh;
  padding: 1.5vh;
  font-size: 1.8vh;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgb(255 242 207);
  font-family: "Gowun Dodum", sans-serif;
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(255, 182, 96, 0.6),
      0 0 20px rgba(255, 182, 96, 0.4);
  }
`;

export const Button = styled.button`
  height: 5vh;
  font-size: 1.8vh;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #00acc1;
  &:hover {
    background-color: ${orange};
  }
  &:focus {
    outline: none;
  }
`;
