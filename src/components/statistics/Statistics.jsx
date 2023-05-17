// 라이브러리
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

// 이미지
import trophy from "../../assets/img/mainpage/trophy.svg";
import info from "../../assets/img/mainpage/info.svg";
import school from "../../assets/img/mainpage/school.svg";
import infoSvg from "../../assets/img/mainpage/info.svg";

// 컴포넌트
import Navbar from "../utils/Navbar";
import ModalBasic from "../utils/ModalBasic";
import { getUserInfo } from "../../redux/modules/mainSlice";
import {
  getAchievementRate,
  getRank,
} from "../../redux/modules/statisticsSlice";
import Charts from "./Charts";

const Statistics = () => {
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { total_rows, user } = useSelector((state) => state.main.userInfo);
  const { monthRank, totalRank } = useSelector(
    (state) => state.statistics.rank
  );
  const {
    thisMonth_count,
    thisMonth_completed_count,
    lastMonth_count,
    lastMonth_completed_count,
  } = useSelector((state) => state.statistics.achievementRate);

  const [scoreExplain, setScoreExplain] = useState(false);
  const [graphExplain, setGraphExplain] = useState(false);
  const token = localStorage.getItem("token");

  const modalHandler = (param) => {
    if (param === "score") setScoreExplain(true);
    if (param === "graph") setGraphExplain(true);
  };

  useEffect(() => {
    dispatch(getUserInfo(token));
    dispatch(getRank(token));
    dispatch(getAchievementRate(token));
  }, []);

  return (
    <StRootDiv>
      <div id="header">
        <span>{user?.username}님의 순위</span>
      </div>
      <div id="body">
        {/* -- 바디의 상단 파트 -- */}
        <div id="upperPart">
          <div className="subTitle">
            <p>나의 Rank</p>
            <img
              src={info}
              onClick={() => modalHandler("score")}
              alt="infoImg"
            />
          </div>
          <div className="scoreContainer">
            <div id="weekScore">
              <div>월간순위</div>
              <div className="scoreText">
                {monthRank}위&nbsp;/&nbsp;
                {total_rows}명중
              </div>
            </div>
            <div id="monthScore">
              <div>종합순위</div>
              <div className="scoreText">
                {totalRank}위&nbsp;/&nbsp;
                {total_rows}명중
              </div>
            </div>
          </div>
          <div className="graphContainer">
            <div id="graphContainerText">
              <div className="change-weekRank">월간 달성률 변화</div>
              <div>
                <span className="lastweek">지난달 {}</span>
                &nbsp;&nbsp;
                <span className="thisweek">이번달 {}</span>
              </div>
              <div id="thisWeekStatus">
                <div>이번달도 시작해볼까요?</div>
              </div>
            </div>

            <div id="fistBarChart">
              <div className="eachBarContainer">
                <div className="eachBar">
                  <StLastWeekChart
                    height={
                      isNaN(lastMonth_completed_count / lastMonth_count)
                        ? 0
                        : (lastMonth_completed_count / lastMonth_count) * 100
                    }
                  >
                    <StChartScore className="lastScore">
                      {isNaN(lastMonth_completed_count / lastMonth_count)
                        ? 0
                        : Math.floor(
                            (lastMonth_completed_count / lastMonth_count) * 100
                          )}
                    </StChartScore>
                  </StLastWeekChart>
                </div>
              </div>

              <div className="eachBarContainer">
                <div className="eachBar">
                  <StThisWeekChart
                    height={
                      isNaN(thisMonth_completed_count / thisMonth_count)
                        ? 0
                        : (thisMonth_completed_count / thisMonth_count) * 100
                    }
                  >
                    <StChartScore className="thisScore">
                      {isNaN(thisMonth_completed_count / thisMonth_count)
                        ? 0
                        : Math.floor(
                            (thisMonth_completed_count / thisMonth_count) * 100
                          )}
                    </StChartScore>
                  </StThisWeekChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* -- 바디의 하단파트 -- */}
        <div id="lowerPart">
          <div className="subTitle">
            <div>최근 플래너 작성량</div>
            <img
              src={info}
              onClick={() => modalHandler("graph")}
              alt="infoImg"
            />
          </div>

          <div id="chartContainer">
            <Charts user={user} />
          </div>
        </div>
      </div>

      {/* ------------- 모달창 ------------ */}
      {scoreExplain ? (
        <ModalBasic
          setScoreExplain={setScoreExplain}
          modalWidth={70 + "%"}
          modalHeight={50 + "%"}
          modalLeft={(100 - 70) / 2 + "%"}
          modalTop={(100 - 50) / 2 + "%"}
          modalTitle="나의 Rank 설명"
          modalImage={school}
          modalContent="작성한 플래너중 달성완료한 비율(달성률)에 따라 월간순위 및 종합순위를 계산했습니다. 순위 하단에는 지난달과 이번달의 달성률을 비교했습니다."
        />
      ) : null}
      {graphExplain ? (
        <ModalBasic
          setGraphExplain={setGraphExplain}
          modalWidth={70 + "%"}
          modalHeight={50 + "%"}
          modalTop={(100 - 50) / 2 + "%"}
          modalLeft={(100 - 70) / 2 + "%"}
          modalTitle="최근 플래너란?"
          modalImage={school}
          modalContent="최근 5일간의 플래너 작성량을 나타내는 그래프입니다. 핑크색은 자신의 최근 플래너 작성량, 녹색은 현재 1등의 플래너 최근 작성량을 나타냅니다."
        />
      ) : null}
      {/* ---------- 네비게이션바 --------- */}
      <Navbar statistics={true} />
    </StRootDiv>
  );
};
export default Statistics;

const StRootDiv = styled.div`
  #header {
    box-sizing: border-box;
    height: 10vh;
    background-color: #ffff;
    border-bottom: 1px solid #f1f3f5;
    font-weight: 600;
    font-size: 3vh;
    color: black;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  #body {
    img {
      cursor: pointer;
    }

    height: 80vh;
    font-size: 2.2vh;

    #upperPart {
      box-sizing: border-box;
      height: 50%;

      // 소제목
      .subTitle {
        box-sizing: border-box;
        padding: 3% 0 0 4%;
        gap: 1%;

        font-weight: 600;
        height: 15%;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          margin: 0;
        }
        img {
          height: 60%;
        }
      }

      // 주간점수, 월간점수 컨테이너
      .scoreContainer {
        box-sizing: border-box;
        height: 35%;
        width: 100%;

        display: flex;
        align-items: center;

        justify-content: space-evenly;

        & .scoreText {
          font-weight: 600;
        }

        #weekScore {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 45%;
          height: 80%;

          background: rgb(255, 255, 255);
          box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
          border-radius: 12px;
        }

        #monthScore {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          width: 45%;
          height: 80%;

          background: rgb(255, 255, 255);
          box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
          border-radius: 12px;
        }
      }

      // 첫번째, 막대그래프
      .graphContainer {
        box-sizing: border-box;
        height: calc(100% - 15% - 35%);
        width: 93%;
        margin: auto;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #ffffff;
        box-shadow: 0px 4px 15px rgba(17, 17, 17, 0.05);
        border-radius: 12px;

        #graphContainerText {
          width: 50%;
          height: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          & .lastweek {
            color: rgb(110 196 255);
          }

          & .thisweek {
            color: rgb(255, 123, 0);
          }

          div {
            height: calc(100% / 3);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          #thisWeekStatus {
            box-sizing: border-box;
            width: 100%;
            div {
              box-sizing: border-box;
              border-radius: 12px;
              padding: 1%;
              width: 90%;
              height: 100%;
              margin: 0;
              font-size: 80%;
              color: #ff7b00;
              font-weight: bold;

              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              background: #ffe9d5;
            }
          }
        }

        #fistBarChart {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: flex-end;
          gap: 2rem;

          .eachBarContainer {
            width: 20%;
            height: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;

            .eachBar {
              width: 100%;
              height: 75%;
              background-color: transparent;

              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
            }
          }
        }
      }
    }

    #lowerPart {
      box-sizing: border-box;
      height: 50%;

      .subTitle {
        box-sizing: border-box;
        height: 15%;
        width: 100%;
        padding: 3% 0 0 4%;
        gap: 1%;
        font-size: 2.2vh;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          margin: 0;
        }
        img {
          height: 60%;
        }
      }

      #chartContainer {
        box-sizing: border-box;
        height: calc(100% - 20%);
        width: 93%;
        margin: 1vh auto 0 auto;
        padding: 1vh 0 0 0;

        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(17, 17, 17, 0.05) 0px 4px 15px;
        background-color: white;
        border-radius: 15px;
      }
    }
  }
`;

const StLastWeekChart = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}%` || "1%"};
  background: rgb(110 196 255);
  border-radius: 6px 6px 0px 0px;
  transition: height 1.5s;
`;
const StThisWeekChart = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => `${props.height}%` || "1%"};
  background: #ff7b00;
  border-radius: 6px 6px 0px 0px;
  transition: height 1.5s;
`;

const StChartScore = styled.div`
  position: absolute;
  top: -4vh;
  box-sizing: border-box;
  height: auto;
  width: 100%;
  margin: 0;
  text-align: center;
  font-weight: 600;

  &.lastScore {
    color: rgb(110 196 255);
  }

  &.thisScore {
    color: #ff7b00;
  }
`;
