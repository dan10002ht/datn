import React from "react";
import useOpenModal from "../../hooks/useOpenModal";
import { Button } from "antd";
import TimeKeepingTable from "../../components/molecules/table/TimekeepingTable";

const TimeKeeping = () => {
  const { modal } = useOpenModal({ title: "" });

  return (
    <>
      <div className="card h-100 employee-list">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold mb-1">Chấm công</h3>
        </div>
        <div className="card-body h-100 p-0 d-flex flex-row">
          <TimeKeepingTable />
        </div>
      </div>
      {modal}
    </>
  );
};

export default TimeKeeping;
