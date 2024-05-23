import React from "react";
import BoxLayout from "../BoxLayout/BoxLayout";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import useFetchApi from "../../../hooks/api/useFetchApi";

const WorkerCount = () => {
  const { data } = useFetchApi({
    url: "/user/count/month",
  });
  const { thisMonthCount, previousMonthCount } = data;
  const percentage = previousMonthCount
    ? (
        ((thisMonthCount - previousMonthCount) / previousMonthCount) *
        100
      ).toFixed(2)
    : 100;
  const hasNotChanged = percentage === 0;
  return (
    <BoxLayout title="Nhân viên mới">
      <div className="flex h-[100%] p-4 items-center justify-center gap-10 w-[250px]">
        <div className="flex gap-2 flex-col text-center">
          <span>Tăng trưởng</span>
          <div
            className={`text-xl font-bold ${
              hasNotChanged
                ? ""
                : percentage > 0
                ? "text-success"
                : "text-error"
            }`}
          >
            <span>{percentage}%</span>
            {!hasNotChanged && (
              <span>
                {percentage > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-col text-center">
          <span>Số lượng</span>
          <span
            className={`text-xl font-bold ${
              hasNotChanged
                ? ""
                : percentage > 0
                ? "text-success"
                : "text-error"
            }`}
          >
            {thisMonthCount}
          </span>
        </div>
      </div>
    </BoxLayout>
  );
};

export default WorkerCount;
