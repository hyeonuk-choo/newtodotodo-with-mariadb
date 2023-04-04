import styled from "styled-components";

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

export const SignupTitle = styled.div`
  font-size: 4vh;
  font-weight: bold;
`;

export const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  box-sizing: border-box;
  padding-bottom: 0.5vh;

  label {
    box-sizing: border-box;
    margin-bottom: 0.5vh;
    display: inline-block;
  }

  .input-Button-container {
    position: relative;
  }
`;

export const CheckButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5vh;
  color: rgb(0, 172, 193);
  font-weight: bold;

  &:hover {
    color: ${orange};
  }
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 5vh;
  padding: 1.5vh;
  font-size: 1.8vh;
  border: none;
  border-radius: 0.25rem;
  background-color: rgb(255 242 207);
  font-family: "Gowun Dodum", sans-serif;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const Button = styled.button`
  height: 5vh;
  font-size: 1.8vh;
  color: white;
  background-color: #00acc1;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${orange};
  }
  &:focus {
    outline: none;
  }
`;

export const UserMessage = styled.div`
  color: ${(props) => (props.usernameValid ? "rgb(0, 172, 193)" : "red")};
  font-size: 1.3vh;
  font-weight: bold;
  text-align: right;
`;

export const EmailMessage = styled.div`
  color: ${(props) => (props.emailValid ? "rgb(0, 172, 193)" : "red")};
  font-size: 1.3vh;
  font-weight: bold;
  text-align: right;
`;

export const PasswordMessage = styled.div`
  box-sizing: border-box;
  padding-bottom: 1vh;

  color: ${(props) => (props.passwordMatch ? "rgb(0, 172, 193)" : "red")};
  font-size: 1.3vh;
  font-weight: bold;
  text-align: right;
`;

export const SuccessMsg = styled.div`
  color: green;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;
