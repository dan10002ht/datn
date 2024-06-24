import {
  DatePicker,
  Flex,
  Input,
  Pagination,
  Radio,
  Select,
  Table,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import useFetchWithPagination from "../../../../hooks/api/useFetchWithPagination";
import dayjs from "dayjs";
import AddInformationModal from "../RequestTable/AddInformationModal";
import DeleteInformationModal from "../../modals/DeleteInformationModal";
import useDebounce from "../../../../hooks/utils/useDebounce";

const { RangePicker } = DatePicker;

const EmployeesTable = () => {
  const { data, handleRefetchByQuery, pagination, fetched, loading } =
    useFetchWithPagination({
      apiUrl: "/user/list",
      defaultFetchFilter: {
        isUpdateInformation: true,
        sort: "desc",
      },
    });

  const [gender, setGender] = useState("all");

  const [searchField, setSearchField] = useState("name");
  const [sort, setSort] = useState("desc");
  const [pageNum, setPageNum] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchTextDebounce = useDebounce(searchText, 500);

  const handlePreviousPage = () => {
    setPageNum((prev) => (prev === 1 ? prev : prev - 1));
    return handleRefetchByQuery({
      after: null,
      before: pagination.previousCursor,
      page: pageNum - 1,
      searchText,
      sort,
      gender,
    });
  };

  const handleSelectGender = async (_gender) => {
    setPageNum(1);
    setGender(_gender);
    await handleRefetchByQuery({
      after: null,
      before: null,
      page: pageNum,
      searchText,
      sort,
      gender: _gender,
    });
  };

  const handleNextPage = () => {
    setPageNum((prev) => prev + 1);
    return handleRefetchByQuery({
      after: pagination.nextCursor,
      before: null,
      page: pageNum + 1,
      searchText,
      sort,
      gender,
    });
  };

  const handleSearch = async (val, _searchField = searchField) => {
    setPageNum(1);
    return handleRefetchByQuery({
      after: null,
      before: null,
      page: pageNum,
      searchText: val,
      searchField: _searchField,
      sort,
      gender,
    });
  };

  const handleSort = async (val) => {
    setPageNum(1);
    setSort(val);
    await handleRefetchByQuery({
      after: null,
      before: null,
      page: pageNum,
      searchText,
      sort: val,
      gender,
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
        render: (val) => dayjs(val).format("DD/MM/YYYY"),
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
      {/* <Input
        placeholder="Nhập vào tên nhân viên"
        onChange={(e) => setSearchText(e.target.value)}
      /> */}
      <Flex wrap="wrap" gap="middle">
        <Select
          defaultValue="name"
          style={{ width: 120 }}
          onChange={(val) => {
            setSearchField(val);
            if (searchText.trim()) {
              handleSearch(searchText, val);
            }
          }}
          options={[
            { value: "name", label: "Theo tên" },
            { value: "userId", label: "Theo userId" },
          ]}
        />
        <Input
          style={{ maxWidth: "300px" }}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Flex wrap="nowrap" gap="middle">
          <Radio.Group
            onChange={(e) => {
              handleSort(e.target.value);
            }}
            defaultValue="desc"
            buttonStyle="solid"
          >
            <Radio.Button value="desc">Giảm dần</Radio.Button>
            <Radio.Button value="asc">Tăng dần</Radio.Button>
          </Radio.Group>
        </Flex>
        <Flex wrap="nowrap" gap="middle">
          <Radio.Group
            onChange={(e) => {
              handleSelectGender(e.target.value);
            }}
            defaultValue="all"
            buttonStyle="solid"
          >
            <Radio.Button value="all">Tất cả</Radio.Button>
            <Radio.Button value="male">Nam</Radio.Button>
            <Radio.Button value="female">Nữ</Radio.Button>
          </Radio.Group>
        </Flex>
      </Flex>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        // pagination={{
        //   total: pagination.total,
        //   defaultPageSize: 10,
        // }}
      />
      <Pagination
        pageSize={10}
        total={pagination.total}
        pageSizeOptions={3}
        onChange={async (page) => {
          if (page === pageNum + 1) {
            await handleNextPage();
          }
          if (page === pageNum - 1) {
            await handlePreviousPage();
          }
        }}
      />
    </div>
  );
};

export default EmployeesTable;
