import styled, { css } from "styled-components";

export const StTodo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  width: 85%;
  height: 14%;
  // 위아래 마진을 주면, border-box인데도 공간을 더 밀어낸다.
  margin: 0 auto 1rem auto;
  box-shadow: 0px 4px 15px rgba(19, 19, 19, 0.15);
  border-radius: 1rem;
  background-color: ${(props) =>
    props.isCompleted ? "rgb(250, 250, 250)" : "white"};

  input[type="checkbox"] {
    width: 13%;
    height: 20%;
    cursor: pointer;
  }

  .titleDivBox {
    // calc 빼기할 때, -마이너스 양옆 공백중요
    width: calc(100% - 13%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .adjust {
      box-sizing: border-box;
      height: 30%;
      padding-left: 2%;
      font-size: 1.4vh;
      color: red;
      font-weight: 600;

      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    label {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      height: 40%;
      width: 95%;
    }

    input {
      height: 100%;
      width: 100%;
      font-size: 100%;
      border: 0.5vh solid rgb(255, 233, 213);
      border-radius: 0.5rem;
      font-family: "Gowun Dodum", sans-serif;
    }

    input:focus {
      outline: none;
    }

    & button {
      cursor: pointer;
    }

    .rightButton {
      position: absolute;
      top: 0;
      right: 0.6vh;

      background-color: rgb(255, 143, 39);
      border: none;
      height: 100%;
      width: 17%;
      color: white;
      border-radius: 0.5rem;

      font-family: "Gowun Dodum", sans-serif;
    }

    .leftButton {
      position: absolute;
      top: 0;
      right: calc(0.8vh + 17%);

      background-color: rgb(255, 143, 39);
      border: none;
      height: 100%;
      width: 17%;
      color: white;
      border-radius: 0.5rem;

      font-family: "Gowun Dodum", sans-serif;
    }

    .titleDiv {
      width: 100%;
    }

    .complete {
      text-decoration: line-through;
    }

    img {
      cursor: pointer;
      position: absolute;
      right: 2%;
    }
  }
`;

export const StBody = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 10vh - 10vh);
  padding-top: 1.3rem;
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  .imgBox {
    background-color: transparent;
    width: 30%;
    height: 23%;
    cursor: pointer;
    border-radius: 10%;
    position: relative;

    img.picture {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .camera {
      position: absolute;
      width: 19%;
      right: 1%;
      bottom: 3%;
    }
  }

  .edit-profile {
    margin: 5%;
    width: 45%;
  }
  .edit-profile .row {
    margin-bottom: 1rem;
  }
  textarea {
    width: 100%;
    height: 17vh;
  }

  button {
    font-family: "Gowun Dodum", sans-serif;
    font-size: 1.7vh;
    cursor: pointer;

    width: 10vh;
    height: 5vh;
    color: white;

    background: #ff8f27;
    border: 1px solid #ff8f27;
    border-radius: 44px;
    span {
      color: white;
    }
  }
`;

export const StRootDiv = styled.div`
  background-color: #fafafa;
  overflow: hidden auto;

  & .header {
    box-sizing: border-box;
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #ffffff;
    border-bottom: 1px solid #f1f3f5;
    position: relative;

    span {
      font-size: 3vh;
      font-weight: 600;
    }

    .actionButton {
      position: absolute;
      right: 3%;
      padding: 0.5rem 1rem 0 1rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: 0.3s;
      background-color: transparent;
    }

    .logoutButton {
      @media screen and (max-width: 500px) {
        display: none;
      }
      @media screen and (min-width: 500px) {
        display: block;
      }
    }

    .logoutButton:hover {
      color: #ff5353;
    }

    .threeDotsBox {
      position: absolute;
      right: 1%;
      margin: 0.5rem 1rem 0 1rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: 0.3s;
      background-color: transparent;
      @media screen and (max-width: 500px) {
        display: block;
      }
      @media screen and (min-width: 500px) {
        display: none;
      }
    }
  }
`;
