import React, { useState } from "react";
import BoxLayout from "../BoxLayout/BoxLayout";
import { Select } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";

const WorkingTime = () => {
  const [selection, setSelection] = useState("monthly");
  return (
    <BoxLayout title="Số tiếng làm việc">
      <div className="flex items-center justify-center gap-10 w-[250px]">
        <div className="text-xl text-error">
          <span className="font-semibold">0%</span>
          <span>
            <ArrowDownOutlined />
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>Tiếng</span>
          <span className="font-semibold text-success text-xl">0</span>
          <Select
            defaultValue={selection}
            onChange={(value) => setSelection(value)}
            options={[
              { label: "Trong tháng", value: "monthly" },
              { label: "Trong tuần", value: "weekly" },
            ]}
          />
        </div>
      </div>
    </BoxLayout>
  );
};

export default WorkingTime;
