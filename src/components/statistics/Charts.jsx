import React from "react";
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

const Charts = ({ user }) => {
  const data = [
    {
      name: "나흘전",
      "1등의 플래너": 2,
      "내 플래너": 1,
    },
    {
      name: "사흘전",
      "1등의 플래너": 2,
      "내 플래너": 3,
    },
    {
      name: "그제",
      "1등의 플래너": 3,
      "내 플래너": 3,
    },
    {
      name: "어제",
      "1등의 플래너": 2,
      "내 플래너": 2,
    },
    {
      name: "오늘",
      "1등의 플래너": 7,
      "내 플래너": 3,
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
