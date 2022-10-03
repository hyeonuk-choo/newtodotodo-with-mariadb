import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import PlannerCalender from "./PlannerCalender";
import categorySvg from "../../assets/img/categorySvg.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __getCategory,
  __getTodayTodo,
} from "../../redux/modules/plannerSlice";
import dayjs from "dayjs";
import Planner from "./Planner";
import { __getDday } from "../../redux/modules/mainSlice";

const PlannerCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState(null);

  const [calenderdate, setCalenderdate] = useState(
    dayjs(Date.now()).format("YYYY-MM-DD")
  );
  const [categoryTodoList, setCategoryTodoList] = useState([]);
  const [categoryTodoComplete, setCategoryTodoComplete] = useState([]);

  const { category, todos, dateTodo, date } = useSelector(
    (state) => state.planner
  );
  console.log(
    "category",
    category,
    "todos",
    todos,
    "dateTodo",
    dateTodo,
    "date",
    date
  );

  const onClickAddCategoryHandler = () => {
    navigate("/planner/category");
  };

  const onClickSelectCategoryToTodoListHandler = (e) => {
    const { innerText } = e.target.children[0];
    const { id } = e.target.parentElement;
    localStorage.setItem("category", innerText);
    localStorage.setItem("categoryId", id);
    navigate("/planner/category/todolist");
  };

  useEffect(() => {
    const arr = [];
    const arrRate = [];

    // length를 구해놓고 for문을 돌리면 성능이 빨라짐 -> 코드 수정하기
    if (todos.length > 0) {
      for (let i = 0; i < category.length; i++) {
        const data = todos.filter((data) => data.category === category[i].title);
        arr.push(data);
      }
    }

    console.log('arr', arr)

    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const rate = (
          (arr[i].filter((data) => data.complete === true).length /
            arr[i].length) *
          100
        ).toFixed();
        arrRate.push(rate);
      }
    }

    setCategoryTodoComplete(arrRate);
    setCategoryTodoList(arr);
  }, [category, todos]);

  console.log("categoryTodoList", categoryTodoList);
  console.log("categoryTodoComplete", categoryTodoComplete);

  useEffect(() => {
    let nickname = localStorage.getItem("nickname");
    dispatch(__getCategory(nickname));
    dispatch(__getTodayTodo(nickname));
  }, [dispatch]);

  return (
    <>
      <StDiv>
        <div className='header'>
          <PlannerCalender
            calenderdate={calenderdate}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
          <div className='categoryBox'>
            <img
              className='category'
              src={categorySvg}
              alt='categoryIcon'
              onClick={onClickAddCategoryHandler}
            />
          </div>
        </div>

        <StCategoryContainer>
          {category.length > 0 &&
            category.map((data, index) => (
              <StCategoryItem key={data.id} id={data.id} name={data.title}>
                <div
                  className='top'
                  onClick={onClickSelectCategoryToTodoListHandler}
                >
                  <p className='title'>{data.title}</p>
                  {/* filter undefined 에러 확인하기 */}
                  <p onClick={(e) => e.stopPropagation()}>
                    {
                      categoryTodoList.length === 0 ? 0 : categoryTodoList[index].filter(
                        (data) => data.complete === true
                      ).length
                    }
                    /{categoryTodoList.length === 0 ? 0 : categoryTodoList[index].length}
                  </p>
                </div>
                <StProgressBarBox onClick={(e) => e.stopPropagation()}>
                  <StProgressBar
                    width={
                      categoryTodoComplete[index] === "NaN"
                        ? 0
                        : categoryTodoComplete[index]
                    }
                  ></StProgressBar>
                </StProgressBarBox>
              </StCategoryItem>
            ))}
        </StCategoryContainer>
      </StDiv>
      {/* <Planner x={x} setX={setX} /> */}
    </>
  );
};

const StDiv = styled.div`
  background-color: #fafafa;
  height: 100%;
  overflow: hidden auto;
  font-family: "SUIT-Regular", sans-serif;
  -ms-overflow-style: none;
  &::-webkit-scrollbar{
  display:none;
  }

  & .header {
    position: sticky;
    top: 0;

    width: 100%;
    height: 71px;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    /* align-items: center; */
    padding: 10px;
    border-bottom: 1px solid #f1f3f5;
    box-sizing: border-box;

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
  transition: all 0.3s;
  height: 13px;
  border-radius: 10px;
`;

export default PlannerCategory;
