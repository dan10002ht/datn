import React from "react";
import { Button } from "antd";
import useOpenModal from "../../hooks/useOpenModal";
import EmployeesTable from "../../components/molecules/table/EmployeesTable";

const Employees = () => {
  const { modal, openModal } = useOpenModal({
    title: "heheh",
    handleClick: () => {
      console.log("confirm");
    },
  });
  return (
    <>
      <div className="card h-100 employee-list">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold mb-1">Quản lý nhân sự</h3>
          <div className="flex items-center gap-4">
            <Button onClick={openModal}>Tao moi</Button>
          </div>
        </div>
        <div className="card-body h-100 p-0 d-flex flex-row">
          <EmployeesTable />
        </div>
      </div>
      {modal}
    </>
  );
};

export default Employees;
