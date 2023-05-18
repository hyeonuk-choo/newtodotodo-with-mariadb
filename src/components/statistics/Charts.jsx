import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ user, token }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [lineChartData, setLineChartData] = useState({});

  const getRecentPlannersForFiveDays = async () => {
    try {
      const data = await axios.get(
        `${BASE_URL}/recent-planners-for-five-days`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLineChartData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecentPlannersForFiveDays();
  }, []);

  const data = [
    {
      name: "나흘전",
      "1등의 플래너": 2,
      "내 플래너": lineChartData?.count_four_days_ago,
    },
    {
      name: "사흘전",
      "1등의 플래너": 2,
      "내 플래너": lineChartData?.count_three_days_ago,
    },
    {
      name: "그제",
      "1등의 플래너": 3,
      "내 플래너": lineChartData?.count_day_before_yesterday,
    },
    {
      name: "어제",
      "1등의 플래너": 2,
      "내 플래너": lineChartData?.count_yesterday,
    },
    {
      name: "오늘",
      "1등의 플래너": 7,
      "내 플래너": lineChartData?.count_today,
    },
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="내 플래너"
            stroke="#ff80b5"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="1등의 플래너"
            stroke="#3eb944"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Charts;
