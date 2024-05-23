import { Button, Skeleton } from "antd";
import React, { Fragment } from "react";
import BoxLayout from "../BoxLayout/BoxLayout";
import useFetchWithPagination from "../../../hooks/api/useFetchWithPagination";
import dayjs from "dayjs";
import AddInformationModal from "../table/RequestTable/AddInformationModal";

const RequestBox = () => {
  const { data, handleRefetchByDefault, loading, fetched } =
    useFetchWithPagination({
      apiUrl: "/user/request",
      defaultFetchFilter: {
        isUpdateInformation: false,
      },
    });

  return (
    <BoxLayout title="Yêu cầu chờ duyệt" isFullWidth>
      {loading && (
        <div className="mt-5 mb-5">
          <Skeleton />
        </div>
      )}
      {!loading &&
        fetched &&
        data.map((item) => (
          <div
            key={item.userId}
            className="flex items-center justify-between gap-4 p-1 border-b"
          >
            <div className="flex flex-col">
              <label>
                <span>userId:</span> <span>{item.userId}</span>
              </label>
              <label>
                <span>Tạo vào: </span>{" "}
                <span>
                  {dayjs(new Date(item.createdAt)).format("hh:mm DD/MM/YY")}
                </span>
              </label>
            </div>
            <AddInformationModal
              input={item}
              buttonContent="Cập nhật"
              successCallback={handleRefetchByDefault}
            />
          </div>
        ))}
    </BoxLayout>
  );
};

export default RequestBox;
