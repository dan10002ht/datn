import React from "react";
import BoxLayout from "../BoxLayout/BoxLayout";
import dayjs from "dayjs";
import useFetchWithPagination from "../../../hooks/api/useFetchWithPagination";
import useFetchApi from "../../../hooks/api/useFetchApi";
import { Skeleton } from "antd";

const HistoryBox = () => {
  const {
    data: logs,
    loading,
    fetched,
  } = useFetchApi({
    url: "/logs",
  });
  return (
    <BoxLayout title="Thông báo" isFullWidth>
      {loading && <Skeleton active />}
      {fetched &&
        !loading &&
        logs.map((log) => (
          <div className="mb-1" key={log.id}>
            {log.name} chấm công vào{" "}
            {dayjs(log.createdAt).format("hh:mm:ss DD/MM/YYYY")}
          </div>
        ))}
    </BoxLayout>
  );
};

export default HistoryBox;
