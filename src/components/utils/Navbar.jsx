// 라이브러리
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 이미지
import homeSvg from "../../assets/img/homeSvg.svg";
import statisticsSvg from "../../assets/img/statisticsSvg.svg";
import plannerSvg from "../../assets/img/plannerSvg.svg";
import clickHomeSvg from "../../assets/img/clickHomeSvg.svg";
import clickStatisticsSvg from "../../assets/img/clickStatisticsSvg.svg";
import clickPlannerSvg from "../../assets/img/clickPlannerSvg.svg";
import clickMyPageSvg from "../../assets/img/clickMypageSvg.svg";
import mypageSvg from "../../assets/img/mypageSvg.svg";

const Navbar = (props) => {
  const [home, setHome] = useState(props.home);
  const [statistics, setStatistics] = useState(props.statistics);
  const [planner, setPlanner] = useState(props.planner);
  const [my, setMy] = useState(props.my);
  const navigate = useNavigate();

  const onClickHome = async () => {
    navigate("/main");
    setHome(true);
    setStatistics(false);
    setPlanner(false);
  };
  const onClickStatistics = async () => {
    navigate("/statistics");
    setHome(false);
    setStatistics(true);
    setPlanner(false);
  };

  const onClickPlanner = async () => {
    navigate("/planner-main");
    setHome(false);
    setStatistics(false);
    setPlanner(true);
  };

  const onClickMy = async () => {
    navigate("/my");
    setHome(false);
    setStatistics(false);
    setPlanner(false);
    setMy(true);
  };

  return (
    <StNav>
      {home ? (
        <StHome src={clickHomeSvg} onClick={onClickHome} />
      ) : (
        <StHome src={homeSvg} onClick={onClickHome} />
      )}
      {statistics ? (
        <StStatistics src={clickStatisticsSvg} onClick={onClickStatistics} />
      ) : (
        <StStatistics src={statisticsSvg} onClick={onClickStatistics} />
      )}
      {planner ? (
        <StPlanner src={clickPlannerSvg} onClick={onClickPlanner} />
      ) : (
        <StPlanner src={plannerSvg} onClick={onClickPlanner} />
      )}
      {my ? (
        <StPlanner src={clickMyPageSvg} onClick={onClickMy} />
      ) : (
        <StPlanner src={mypageSvg} onClick={onClickMy} />
      )}
    </StNav>
  );
};

export default Navbar;

const StNav = styled.div`
  box-sizing: border-box;
  height: 10vh;
  width: 100%;
  z-index: 5;
  border-top: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StHome = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
const StStatistics = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
const StPlanner = styled.img`
  width: 45px;
  height: 100%;
  cursor: pointer;
`;
