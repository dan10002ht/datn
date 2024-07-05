import React, { useEffect, useState } from "react";
import BoxLayout from "../BoxLayout/BoxLayout";
import { Select } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import useFetchApi from "../../../hooks/api/useFetchApi";

const WorkingTime = () => {
  const [selection, setSelection] = useState("month");
  const { data, fetched, refetch } = useFetchApi({
    url: `/time/working-hours/${selection}`,
  });

  const isUp = data.currentHours - data.previousHours > 0;
  useEffect(() => {
    if (fetched) refetch();
  }, [selection]);
  return (
    <BoxLayout title="Số tiếng làm việc">
      <div className="flex items-center justify-center gap-10 w-[250px]">
        <div className={`text-xl ${isUp ? "text-success" : "text-error"}`}>
          <span className="font-semibold">
            {fetched &&
              Math.abs(
                (data.previousHours - data.currentHours) / data.previousHours
              ).toFixed(2)}
            %
          </span>
          <span>{isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>Tiếng</span>
          <span className="text-xl font-semibold text-success">
            {fetched && data.currentHours.toFixed(2)}
          </span>
          <Select
            defaultValue={selection}
            onChange={(value) => setSelection(value)}
            options={[
              { label: "Trong tháng", value: "month" },
              { label: "Trong tuần", value: "week" },
            ]}
          />
        </div>
      </div>
    </BoxLayout>
  );
};

export default WorkingTime;
