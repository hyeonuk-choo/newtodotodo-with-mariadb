import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import info from "../../assets/img/mainpage/info.svg";
import trophy from "../../assets/img/mainpage/trophy.svg";
import bigTrophy from "../../assets/img/mainpage/bigTrophy.svg";
import plannerCntSvg from "../../assets/img/mainpage/plannerCntSvg.svg";
import todoCntSvg from "../../assets/img/mainpage/todoCntSvg.svg";
import Modal from "../utils/Modal";
import InfiniteScroll from "./InfiniteScroll";
import InfiniteScrollMonthly from "./InfiniteScrollMonthly";
import {
  __getThisMonthRate,
  __getTotalRate,
  __getTotalTodo,
} from "../../redux/modules/mainSlice";
import { __getMyInfo } from "../../redux/modules/mySlice";
import Dday from "./Dday";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Navbar from "../utils/Navbar";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyInfo());
    dispatch(__getTotalRate());
    dispatch(__getTotalTodo());
    dispatch(__getThisMonthRate());
  }, []);

  const { userinfo } = useSelector((state) => state.my);

  const [month, setMonth] = useState(false);
  const [weekly, setWeekly] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // let nickname = localStorage.getItem("nickname");

  const onClickWeekly = () => {
    setWeekly(true);
    setMonth(false);
  };

  const onClickMonth = () => {
    setWeekly(false);
    setMonth(true);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <StRootDiv>
      <StSubDiv1>
        <div className="mainTopSentenceBox">
          <span>투두투두</span>
          <div className="mainTopSentence">
            {userinfo?.nickname === undefined
              ? "닉네임을 설정해주세요^^"
              : `${userinfo.nickname}님, 오늘도 힘내세요!`}
          </div>
        </div>

        <div>
          <Dday />
        </div>
      </StSubDiv1>
      <StSubDiv2>
        <div className="achievementBox">
          <div className="nicknamePart">
            {userinfo?.nickname === undefined
              ? "닉네임이 미설정 상태입니다."
              : `${userinfo.nickname}님의 기록`}
          </div>
          <div className="todoCnt">
            <img src={plannerCntSvg} alt="todoCntSvgImg" />
            <span>
              {userinfo?.totalCnt === undefined ? 0 : userinfo?.totalCnt}
            </span>
            <img src={todoCntSvg} alt="todoCntSvgImg" />
            <span>
              {userinfo?.completeCnt === undefined ? 0 : userinfo?.completeCnt}
            </span>
          </div>
        </div>
        <div className="achievementSecondBox">
          <div className="thisMonthGauge">
            <div className="gaugeText">
              이번달 플래너 달성률
              <div>{Math.round(userinfo.achievementRate?.thisMonthRate)} %</div>
            </div>

            <StProgressBarBox>
              <StProgressBar
                width={
                  userinfo.achievementRate?.thisMonthRate === undefined
                    ? 0
                    : Math.round(userinfo.achievementRate?.thisMonthRate)
                }
              ></StProgressBar>
            </StProgressBarBox>
          </div>

          <div className="totalGauge">
            <div className="gaugeText">
              플래너 총 달성률
              <div>{Math.round(userinfo.achievementRate?.totalRate)} %</div>
            </div>

            <StProgressBarBox>
              <StProgressBar
                width={
                  userinfo.achievementRate?.totalRate === undefined
                    ? 0
                    : Math.round(userinfo.achievementRate?.totalRate)
                }
              ></StProgressBar>
            </StProgressBarBox>
          </div>
        </div>
      </StSubDiv2>

      {/* -------------------- 랭킹 --------------------*/}
      <StSubDiv3>
        <StRankingPhrases>
          <img src={trophy} alt="trophyImg" />
          <span>랭킹</span>
          <img src={info} onClick={openModal} alt="infoImg" />
        </StRankingPhrases>

        <StRankingBtnBox>
          {weekly ? (
            <StWeeklyRankingBtn onClick={onClickWeekly}>
              <span>주간 랭킹</span>
            </StWeeklyRankingBtn>
          ) : (
            <StWeeklyRankingBtn2nd onClick={onClickWeekly}>
              <span>주간 랭킹</span>
            </StWeeklyRankingBtn2nd>
          )}
          {month ? (
            <StMonthRankingBtn onClick={onClickMonth}>
              <span>월간 랭킹</span>
            </StMonthRankingBtn>
          ) : (
            <StMonthRankingBtn2nd onClick={onClickMonth}>
              <span>월간 랭킹</span>
            </StMonthRankingBtn2nd>
          )}
        </StRankingBtnBox>
      </StSubDiv3>
      <StSubDiv4
        className="scrollBox"
        style={{ width: "100%", overflow: "auto" }}
      >
        {weekly ? <InfiniteScroll /> : null}
        {month ? <InfiniteScrollMonthly /> : null}
      </StSubDiv4>
      <Navbar home={true} />
      {/* -------------- 모달창 ---------------*/}
      <Modal
        visible={modalVisible}
        closable={true}
        maskClosable={true}
        onClose={closeModal}
        width="290px"
        height="320px"
        radius="48px"
        top="40%"
        backgroundcolor="rgba(17, 17, 17, 0.6)"
      >
        <StModalTop>
          <span>투두투두 랭킹 산정 방법</span>
        </StModalTop>
        <Swiper
          className="banner"
          spaceBetween={50}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <StModalBottom>
              <StModalExplainDiv>
                <span>주간/월간 랭킹</span>
                <img src={bigTrophy} alt="bigTrophyImg" />
                <div>
                  주간 랭킹은 일주일/한달 간 측정한 투두 달성률 평균이 높은
                  순으로 순위가 결정됩니다.
                </div>
              </StModalExplainDiv>
            </StModalBottom>
          </SwiperSlide>
          {/* <SwiperSlide>
        <StModalBottom>
          <StModalExplainDiv>
            <span>학교 랭킹</span>
            <img src={schoolSvg} />
            <div>
              학교 랭킹은 같은 학교에 소속돼 있는 학생들의 한달 간 측정한
              투두 달성률의 평균이 높은 순으로 순위가 결정됩니다.
            </div>
          </StModalExplainDiv>
        </StModalBottom>
      </SwiperSlide> */}
        </Swiper>

        <StCloseBtnContainer>
          <StModalCloseBtn onClick={closeModal}>확인</StModalCloseBtn>
        </StCloseBtnContainer>
      </Modal>
    </StRootDiv>
  );
};

export default Main;

const StRootDiv = styled.div`
height: 100vh; // 본문 90vh, 내비게이션바 10vh
font-family: "SUIT-Regular", sans-serif;
overflow: hidden auto;

// ::-webkit-scrollbar {
  //   background-color: #fafafa;
  //   width: 0.5rem;
  //   height: 1rem;
  // }
  // ::-webkit-scrollbar-thumb {
    //   background-color: rgb(255, 233, 213);
    //   border-radius: 1rem;
    //   width: 0.1rem;
    // }
    // ::-webkit-scrollbar-track {
    }
    `;

const StSubDiv1 = styled.div`
  width: 90%;
  height: 11vh;
  margin: auto;
  margin-top: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  span {
    color: #ff7b00;
    font-weight: 700;
    /* font-size: 14px; */
    line-height: 16px;
  }

  .mainTopSentenceBox {
    padding-left: 0.4rem;
    font-size: 2.5vh;
  }

  .mainTopSentence {
    margin-top: 8px;
    font-weight: 600;
  }
`;

const StSubDiv2 = styled.div`
  height: 26vh;
  width: 90%;
  margin: 0 auto 0 auto;
  box-shadow: 0px 4px 15px 0px rgba(17, 17, 17, 0.05);
  border-radius: 16px;
  background-color: white;

  .achievementBox {
    height: 6vh;
    width: 100%;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px 12px 0 0;
    background-color: #ffe9d5;

    div {
      font-size: 2vh;
      color: #ff7b00;
    }

    .nicknamePart {
      margin-left: 1rem;
    }

    .todoCnt {
      display: flex;
      gap: 0.3rem;
      margin-right: 1rem;
    }
  }

  .achievementSecondBox {
    font-size: 2.1vh;
    height: 20vh;
    width: 100%;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15%;

    .thisMonthGauge {
      width: 90%;
    }

    .totalGauge {
      width: 90%;
    }

    .gaugeText {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const StSubDiv3 = styled.div`
  height: 12vh;
`;

const StSubDiv4 = styled.div`
  height: 36vh;
  padding-top: 1rem;
`;

const StProgressBarBox = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #ececec;
`;

const StProgressBar = styled.div`
  ${({ width }) => {
    if (width === 0) {
      return css`
        width: ${width}%;
        background-color: none;
      `;
    } else if (width < 33) {
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

const StGaugeText = styled.div``;

const StRankingPhrases = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: sticky;
  z-index: 1;
  top: 0;
  left: 10;
  background-color: #fafafa;
  padding: 1rem 0 1rem 0;
  padding-left: 2.3rem;

  span {
    padding-top: 1rem;
    margin-left: 7px;
    margin-right: 7px;
    font-weight: 600;
    font-size: 20px;
    background-color: #fafafa;
  }

  img {
    padding-top: 1rem;
    background-color: #fafafa;
    margin-left: 0;
  }
`;

const StRankingBtnBox = styled.div`
  font-weight: 600;
  background-color: #fafafa;
  position: sticky;
  z-index: 1;
  top: 2.6em;
  padding: 0 0 0 2rem;
`;

const StWeeklyRankingBtn = styled.button`
  width: 80px;
  height: 40px;
  min-height: 40px;
  background: #ff8f27;
  border: 1px solid #ff8f27;
  border-radius: 44px;
  span {
    color: white;
    font-size: 14px;
    font-family: "SUIT-Regular";
  }
`;

const StMonthRankingBtn2nd = styled.button`
  width: 80px;
  height: 40px;
  margin-left: 6px;
  background: #ffffff;
  border: 1px solid #d7d5d5;
  border-radius: 44px;
  span {
    color: #9f9e9e;
    font-size: 14px;
    font-family: "SUIT-Regular";
  }
`;
const StMonthRankingBtn = styled.button`
  width: 80px;
  height: 40px;
  margin-left: 6px;
  background: #ff8f27;
  border: 1px solid #ff8f27;
  border-radius: 44px;
  span {
    color: white;
    font-size: 14px;
    font-family: "SUIT-Regular";
  }
`;

const StWeeklyRankingBtn2nd = styled.button`
  width: 80px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d7d5d5;
  border-radius: 44px;
  span {
    color: #9f9e9e;
    font-size: 14px;
    font-family: "SUIT-Regular";
  }
`;

const StModalTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 85px;
  border-radius: 48px 48px 0 0;
  background-color: #ffe9d5;
  color: #ff7b00;
  font-weight: 600;
  font-size: 17px;
`;

const StModalBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 12em;
  margin: 5% 0 0 5%;
  span {
    font-size: 16px;
  }
`;
const StModalExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  span {
    font-weight: bold;
  }

  div {
    width: 83%;
    text-align: center;
  }
`;

const StCloseBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const StModalCloseBtn = styled.button`
  display: flex;
  justify-content: center;
  width: 93px;
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
  padding: 1em;
`;

const StScrollDiv = styled.div`
  background-color: #fafafa;
  height: 40%;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    height: 150px;
    border-radius: 0px;
    background: rgba(255, 255, 255, 0.4);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #d1d1d1;
  }
`;
