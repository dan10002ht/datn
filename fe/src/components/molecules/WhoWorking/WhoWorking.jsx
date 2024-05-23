import React from "react";
import BoxLayout from "../BoxLayout/BoxLayout";
import useFetchApi from "../../../hooks/api/useFetchApi";

const backgrounds = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
];

const WhoWorking = () => {
  const { data } = useFetchApi({
    url: "/time/daily",
  });
  const mappingData = [
    { title: "Đúng giờ", amount: data.inTimeCount || 0 },
    { title: "Đi muộn", amount: data.lateTimeCount || 0 },
    { title: "Chưa vào ca", amount: data.nonInCount || 0 },
    { title: "Nghỉ phép", amount: 1 },
  ];

  return (
    <BoxLayout title="Ai đang làm việc?">
      <div className="flex items-center gap-4 p-2">
        {mappingData.map((x, index) => (
          <div
            key={x.title}
            style={{ background: backgrounds[index] }}
            className={`flex items-center justify-center flex-col p-2 w-[90px] h-[90px] rounded-lg text-white`}
          >
            <span className="text-xl font-semibold text-center">
              {x.amount}
            </span>
            <span className="text-center ">{x.title}</span>
          </div>
        ))}
      </div>
    </BoxLayout>
  );
};

export default WhoWorking;
