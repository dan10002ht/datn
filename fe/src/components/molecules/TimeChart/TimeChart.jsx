import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useFetchApi from "../../../hooks/api/useFetchApi";

ChartJS.register(ArcElement, Tooltip, Legend);

const TimeChart = () => {
  const { data } = useFetchApi({
    url: "/time/monthly",
  });
  console.log({ data });
  const dataChart = {
    labels: ["Đúng giờ", "Trễ giờ", "Không chấm công"],
    datasets: [
      {
        label: "Số lượng",
        data: [data.inTimeCount, data.lateTimeCount, data.nonInCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
        ],
        borderColor: ["white", "white", "white", "white"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <Pie
      title="Thời gian"
      data={dataChart}
      options={{
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
        },
      }}
    />
  );
};
export default TimeChart;
