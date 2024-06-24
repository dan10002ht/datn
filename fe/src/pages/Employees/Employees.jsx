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
          <h3 className="mb-1 text-2xl font-bold">Quản lý nhân sự</h3>
          <div className="flex items-center gap-4">
            {/* <Button onClick={openModal}>Tạo mới</Button> */}
          </div>
        </div>
        <div className="flex-row p-0 card-body h-100 d-flex">
          <EmployeesTable />
        </div>
      </div>
      {modal}
    </>
  );
};

export default Employees;
