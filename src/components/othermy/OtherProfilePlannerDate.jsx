import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getTodo } from "../../redux/modules/plannerSlice";
import Navbar from "../utils/Navbar";
import dayjs from "dayjs";
import PlannerDate from "../planner/PlannerDate";
import toggleSvg from "../../assets/img/toggleSvg.svg";
import doneSvg from "../../assets/img/doneSvg.svg";
import notDoneSvg from "../../assets/img/notDoneSvg.svg";
import { useParams } from "react-router-dom";

const OtherProfilePlannerDate = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectDate, setSelectDate] = useState(null);

  const { dateTodo, date } = useSelector((state) => state.planner);

  const [calenderdate, setCalenderdate] = useState(null);
  const [dateTodoObj, setDateTodoObj] = useState({});
  const [category, setCategory] = useState([]);
  const [categoryTodoList, setCategoryTodoList] = useState([]);
  const [categoryTodoComplete, setCategoryTodoComplete] = useState({});
  // const [selectedCategoryName, setSelectedCategoryName] = useState("");


  // const onClickSelectCategoryToTodoListHandler = (e) => {
  //   const { title } = e.currentTarget;
  //   setSelectedCategoryName(title);
  // };

  const onClickShowTodoHandler = (e) => {
    if (e.currentTarget.childNodes[2].style.display === "block") {
      e.currentTarget.childNodes[1].childNodes[1].style.transform =
        "rotate(0deg)";
      e.currentTarget.childNodes[2].style.display = "none";
    } else {
      e.currentTarget.childNodes[1].childNodes[1].style.transform =
        "rotate(-180deg)";
      e.currentTarget.childNodes[2].style.display = "block";
    }
  };

  useEffect(() => {
    console.log("dateTodo", dateTodo, "date", date);
    const obj = {};
    let arr = [];
    const newArr = [];

    const arrComplete = {};
    if (dateTodo.length > 0) {
      const completeTodo = dateTodo.filter((data) => data["complete"] === true);

      for (let i = 0; i < dateTodo.length; i++) {
        obj[`${dateTodo[i].category}`] =
          (obj[`${dateTodo[i].category}`] || 0) + 1;
      }

      for (let i = 0; i < completeTodo.length; i++) {
        arrComplete[`${completeTodo[i].category}`] =
          (arrComplete[`${completeTodo[i].category}`] || 0) + 1;
      }
    }

    arr = Object.keys(obj);
    console.log("arr", arr);

    for (let i = 0; i < arr.length; i++) {
      const newData = dateTodo.filter((data) => data.category === arr[i]);
      console.log("data", newData);
      newArr.push(newData);
    }

    console.log("newArr", newArr);
    setCategory(arr);
    setCategoryTodoComplete(arrComplete);
    setCategoryTodoList(newArr);
    setDateTodoObj(obj);
  }, [dateTodo]);

  console.log("dateTodoObj", dateTodoObj, "categoryTodoList", categoryTodoList);

  useEffect(() => {
    let date = localStorage.getItem("date");
    setCalenderdate(date);
  }, [date]);

  console.log("calenderdate", calenderdate, "selectDate", selectDate);

  useEffect(() => {
    console.log("localStorage.getItem", localStorage.getItem("date"));
    let date = localStorage.getItem("date");
    let nickname = localStorage.getItem("nickname");
    console.log("date", date, "nickname", nickname);

    dispatch(__getTodo({ date: date, nickname: params.id }));
  }, [dispatch]);

  return (
    <>
      <StDiv>
        <StCategoryContainer>
          {category.length > 0 &&
            category.map((data, index) => (
              <StCategoryItem
                key={index}
                id={index}
                onClick={onClickShowTodoHandler}
              >
                <div
                  className='top'
                  title={data}
                >
                  <p className='title'>{data}</p>
                  {category.length > 0 && (
                    <p onClick={(e) => e.stopPropagation()}>
                      {categoryTodoComplete[`${category[index]}`] === undefined
                        ? 0
                        : categoryTodoComplete[`${category[index]}`]}
                      /{dateTodoObj[`${category[index]}`]}
                    </p>
                  )}
                </div>
                <StToggleBox>
                  <StProgressBarBox onClick={(e) => e.stopPropagation()}>
                    <StProgressBar
                      width={
                        isNaN(
                          categoryTodoComplete[`${category[index]}`] /
                          dateTodoObj[`${category[index]}`]
                        )
                          ? 0
                          : (categoryTodoComplete[`${category[index]}`] /
                            dateTodoObj[`${category[index]}`]) *
                          100
                      }
                      backgroundColor='#74E272'
                    ></StProgressBar>
                  </StProgressBarBox>
                  <StToggleImgBox>
                    <img src={toggleSvg} alt='toggleIcon' />
                  </StToggleImgBox>
                </StToggleBox>

                <StTodoToggleBox>
                  <StTodoContainer>
                    {categoryTodoList.length > 0 &&
                      categoryTodoList[index]
                        .filter((data) => data.complete === false)
                        .map((data) => (
                          <StTodoItem key={data.todoId} name={data.title}>
                            <div className='top' id={data.todoId}>
                              <div
                                className='content'
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img src={notDoneSvg} alt='notDoneIcon' />
                                <StTodoTitle className='title'>
                                  {data.content}
                                </StTodoTitle>
                              </div>
                            </div>
                          </StTodoItem>
                        ))}
                  </StTodoContainer>

                  <StTodoContainer>
                    {categoryTodoList.length > 0 &&
                      categoryTodoList[index]
                        .filter((data) => data.complete === true)
                        .map((data) => (
                          <StTodoItem key={data.todoId} name={data.title}>
                            <div className='top' id={data.todoId}>
                              <div
                                className='content'
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img src={doneSvg} alt='doneIcon' />
                                <StTodoTitle className='title' color='#E8E8E8'>
                                  {data.content}
                                </StTodoTitle>
                              </div>
                            </div>
                          </StTodoItem>
                        ))}
                  </StTodoContainer>
                </StTodoToggleBox>
              </StCategoryItem>
            ))}
        </StCategoryContainer>
      </StDiv>

      {/* 
      <PlannerDate
        selectedCategoryName={selectedCategoryName}
        dateTodo={dateTodo}
        display={display}
        setDisplay={setDisplay}
      /> */}
    </>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  height: 100vh;
  font-family: "SUIT-Regular", sans-serif;

  & div.header {
    /* width: 100%; */
    height: 50px;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem;
    border-bottom: 1px solid #f1f3f5;

    .categoryBox {
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      img.category {
        width: 24px;
        height: 24px;
      }
    }
  }
`;

const StCategoryContainer = styled.div`
  padding: 20px;
`;

const StCategoryItem = styled.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 15px 20px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);

  & .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    p {
      margin: 0;
    }
  }
`;

const StProgressBarBox = styled.div`
  width: 100%;
  height: 13px;
  border-radius: 10px;
  background-color: #ececec;
`;

const StProgressBar = styled.div`
  ${({ width }) => {
    if (width < 33) {
      return css`
        width: ${width}%;
        background-color: #d34c4c;
      `;
    } else if (width < 66) {
      return css`
        width: ${width}%;
        background-color: #ffdb80;
      `;
    } else if (width <= 100) {
      return css`
        width: ${width}%;
        background-color: #74e272;
      `;
    }
  }};
  /* transition: all 0.3s; */
  height: 13px;
  border-radius: 10px;
`;

const StToggleBox = styled.div`
  display: flex;
  align-items: center;
`;

const StToggleImgBox = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  transition: all 0.3s;
`;

const StTodoToggleBox = styled.div`
  display: none;
`;

const StTodoContainer = styled.div`
  padding: 20px;
`;

const StTodoItem = styled.div`
  width: 100%;
  height: 52px;
  border-radius: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 16px 0;
  padding: 15px 20px;
  -webkit-box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1);

  & .top {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;

    div.content {
      width: 90%;
    }

    div.option {
      width: 10%;
    }
  }
`;

const StTodoTitle = styled.p`
  padding-left: 10px;
  margin: 0;
  color: ${(props) => props.color || "#111"};
`;

export default OtherProfilePlannerDate;
