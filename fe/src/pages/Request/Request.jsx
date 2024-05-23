import React from "react";
import RequestTable from "../../components/molecules/table/RequestTable";

const Request = () => {
  return (
    <>
      <div className="card h-100 employee-list">
        <div className="flex justify-between">
          <h3 className="mb-1 text-2xl font-bold">Yêu cầu</h3>
        </div>
        <div className="flex-row p-0 card-body h-100 d-flex">
          <RequestTable />
        </div>
      </div>
    </>
  );
};

export default Request;
