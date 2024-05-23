import { Flex, Input, Pagination, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import useFetchWithPagination from "../../../../hooks/api/useFetchWithPagination";
import dayjs from "dayjs";
import AddInformationModal from "../RequestTable/AddInformationModal";
import DeleteInformationModal from "../../modals/DeleteInformationModal";
import useDebounce from "../../../../hooks/utils/useDebounce";

const EmployeesTable = () => {
  const { data, handleRefetchByQuery, pagination, fetched } =
    useFetchWithPagination({
      apiUrl: "/user/list",
      defaultFetchFilter: {
        isUpdateInformation: true,
      },
    });
  const [pageNum, setPageNum] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchTextDebounce = useDebounce(searchText, 500);

  const handlePreviousPage = () => {
    setPageNum((prev) => (prev === 1 ? prev : prev - 1));
    handleRefetchByQuery({
      after: null,
      before: pagination.previousCursor,
      page: pageNum - 1,
    });
  };
  const handleNextPage = () => {
    setPageNum((prev) => prev + 1);
    handleRefetchByQuery({
      after: pagination.nextCursor,
      before: null,
      page: pageNum + 1,
    });
  };

  const handleSearch = async (val) => {
    setPageNum(1);
    handleRefetchByQuery({
      after: null,
      before: null,
      page: pageNum,
      searchText: val,
    });
  };

  useEffect(() => {
    if (!fetched) return;
    handleSearch(searchTextDebounce);
  }, [searchTextDebounce]);

  const columns = useMemo(
    () => [
      {
        title: "Tên nhân viên",
        dataIndex: "name",
      },
      {
        title: "Mã nhân viên",
        dataIndex: "userId",
        render: (val) => String(val).padStart("4", "0"),
      },
      {
        title: "Ngày sinh",
        dataIndex: "dob",
        render: (val) => dayjs(val).format("MM/DD/YYYY"),
      },
      {
        title: "Số điện thoại",
        dataIndex: "phoneNumber",
      },
      {
        title: "Bộ phận",
        dataIndex: "department",
      },
      {
        title: "Hành động",
        render: (val, _data) => {
          return (
            <Flex gap="small">
              <AddInformationModal
                buttonContent="Chỉnh sửa"
                input={_data}
                title="Chỉnh sửa thông tin cá nhân"
              ></AddInformationModal>
              <DeleteInformationModal input={_data} />
            </Flex>
          );
        },
      },
    ],
    []
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
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
      <Input
        placeholder="Nhập vào tên nhân viên"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        // pagination={{
        //   total: pagination.total,
        //   defaultPageSize: 10,
        // }}
      />
      <Pagination
        pageSize={10}
        total={pagination.total}
        pageSizeOptions={3}
        onChange={(page) => {
          if (page === pageNum + 1) {
            handleNextPage();
          }
          if (page === pageNum - 1) {
            handlePreviousPage();
          }
        }}
      />
    </div>
  );
};

export default EmployeesTable;
