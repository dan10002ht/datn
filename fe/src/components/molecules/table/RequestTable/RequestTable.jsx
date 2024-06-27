import { Table } from "antd";
import { useMemo, useState } from "react";
import useFetchWithPagination from "../../../../hooks/api/useFetchWithPagination";
import dayjs from "dayjs";
import AddInformationModal from "./AddInformationModal";

const RequestTable = () => {
  const {
    data = [],
    pagination,
    handleRefetchByDefault,
    handleRefetchByQuery,
  } = useFetchWithPagination({
    apiUrl: "/user/request",
  });

  console.log({ data });

  const columns = useMemo(
    () => [
      {
        title: "STT",
        dataIndex: "id",
        render: (_, __, index) => <>{index + 1}</>,
        width: "10%",
      },
      {
        title: "Mã nhân viên",
        dataIndex: "userId",
        width: "40%",
      },
      {
        title: "Thời gian tạo",
        dataIndex: "createdAt",
        width: "40%",
        render: (val) => dayjs(val).format("HH:mm MM/DD/YYYY"),
      },
      {
        title: "Trạng thái",
        dataIndex: "isUpdateInformation",
        render: (_, rowData) => (
          <AddInformationModal
            input={rowData}
            successCallback={() => {
              console.log("success");
            }}
          />
        ),
        width: "10%",
      },
    ],
    []
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div>
        <div className="mt-2">
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default RequestTable;
