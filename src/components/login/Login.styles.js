import styled from "styled-components";

const flexCenterMixin = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const peach = "rgb(255, 233, 213);";
const lightOrange = "#FFC846";
const orange = "rgb(255, 123, 0);";

export const Container = styled.div`
  background: ${lightOrange};

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
  width: 50%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgb(255 242 207);

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
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
