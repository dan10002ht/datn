import { useEffect, useRef, useState } from "react";
import "react-virtualized/styles.css";
import locale from "antd/es/date-picker/locale/vi_VN";
import { Column, Table } from "react-virtualized";
import { DatePicker, Input, Select, Spin } from "antd";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import useFetchApi from "../../../../hooks/api/useFetchApi";
import { getStartAndEndOfPeriod, prepareHour } from "../../../../helpers/time";
import useDebounce from "../../../../hooks/utils/useDebounce";
import TimeKeepingModal from "./TimekeepingModal";

const prepareUtcDate = (date = new Date()) => {
  const d = new Date(date);
  d.setUTCHours(7, 0, 0, 0);
  return d;
};

const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

function getLabelsInRange(fromDate, toDate) {
  const labels = [];
  const currentDate = new Date(fromDate);

  while (currentDate <= toDate) {
    labels.push(
      `${dayNames[currentDate.getDay()]} ${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }`
    );
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return labels;
}

const getLabels = ({ period = "week", date = prepareUtcDate(new Date()) }) => {
  const d = new Date(date);

  const { fromDate, toDate } = getStartAndEndOfPeriod({ date: d, period });
  return getLabelsInRange(fromDate, toDate);
};

const TimeKeepingTable = () => {
  const [searchText, setSearchText] = useState("");
  const searchTextDebounce = useDebounce(searchText, 500);
  const [width, setwidth] = useState(0);
  const [dateType, setDateType] = useState("week");
  const [selectedDate, setSelectedDate] = useState(prepareUtcDate(new Date()));
  const ref = useRef();
  const fetchUrl = `/user/list-time-keeping?selectedDate=${selectedDate.toISOString()}&period=${dateType}&searchText=${searchTextDebounce}`;
  const { data, refetch, fetched, loading } = useFetchApi({
    url: fetchUrl,
  });

  useEffect(() => {
    if (fetched) {
      refetch(fetchUrl);
    }
  }, [fetchUrl]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setwidth(entries[0].contentRect.width);
    });
    observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const columnLabels = getLabels({ period: dateType, date: selectedDate });

  return (
    <div ref={ref}>
      <div className="flex items-center my-3 gap-x-2">
        <DatePicker
          fullscreen={false}
          picker={dateType}
          type="button"
          locale={locale}
          onChange={(val) => setSelectedDate(prepareUtcDate(val.$d))}
        />

        <Select
          defaultValue="sample"
          value={dateType}
          onChange={(val) => setDateType(val)}
        >
          {[
            { value: "month", label: "Theo tháng" },
            { value: "week", label: "Theo tuần" },
          ].map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />} />
        </div>
      ) : (
        <Table
          style={{ border: "1px solid #e3e3e3" }}
          width={width}
          height={300}
          headerHeight={60}
          rowHeight={dateType === "week" ? 60 : 80}
          autoHeight
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
        >
          <Column
            label={
              <Input
                value={searchText}
                placeholder="Tìm kiếm"
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined />}
              />
            }
            cellRenderer={({ rowData }) => (
              <div className="h-[100%] w-[100%] border-r border-b flex justify-center items-center flex-wrap">
                {rowData.userData.name}
              </div>
            )}
            width={150}
          />
          {new Array(data[0]?.timeData.length).fill(null).map((x, index) => (
            <Column
              width={(width - 150) / data[0]?.timeData.length}
              key={index}
              label={columnLabels[index]}
              cellRenderer={({ columnIndex, rowData }) => {
                const cellData = rowData.timeData[columnIndex - 1];
                const checkInDate = prepareHour(cellData?.checkInDate);
                const checkOutDate = prepareHour(cellData?.checkOutDate);

                return (
                  <TimeKeepingModal cellData={cellData}>
                    <div
                      className="flex justify-center px-2 w-[100%] h-[100%] items-center flex-wrap cursor-pointer"
                      style={{ gap: "2px" }}
                    >
                      <span>{checkInDate} </span> <span>-</span>
                      <span>{checkOutDate}</span>
                    </div>
                  </TimeKeepingModal>
                );
              }}
            />
          ))}
        </Table>
      )}
    </div>
  );
};

export default TimeKeepingTable;
