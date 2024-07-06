import React, { useState } from "react";
import RequestBox from "../components/molecules/RequestBox";
import HistoryBox from "../components/molecules/HistoryBox";
import TimeChart from "../components/molecules/TimeChart";
import WhoWorking from "../components/molecules/WhoWorking";
import WorkingTime from "../components/molecules/WorkingTime";
import WorkerCount from "../components/molecules/WorkerCount";
import { Button, Input, Select, Typography } from "antd";
import { client } from "../helpers/api";
import useFetchApi from "../hooks/api/useFetchApi";

const Home = () => {
  const [numberOfPreviousMonth, setNumberOfPreviousMonth] = useState(0);
  const handleDownload = async () => {
    return client
      .get(`/logs/excel?previous=${numberOfPreviousMonth}`, {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };
  return (
    <>
      <div className="flex justify-between mb-10">
        <h3 className="flex-1 mb-1 text-2xl font-bold">Chấm công</h3>
        <div>
          <Input onChange={(e) => setNumberOfPreviousMonth(e.target.value)} />
        </div>
        <Button onClick={handleDownload} type="primary">
          Xuất file excel
        </Button>
      </div>
      <div className="flex gap-4 mb-6 Common-Wrapper">
        <div className="flex-1 Common-Left__Wrapper">
          <div className="w-full mb-4 Common-Left__History ">
            <HistoryBox />
          </div>
          <div className="w-full Common-Left__RequestWrapper ">
            <RequestBox />
          </div>
        </div>
        <div className="Common-Right__Wrapper w-[50%] px-8 rounded-md border">
          <div className="Common-Right__ChartWrapper">
            <Typography className="pt-6 text-xl font-semibold">
              Thống kê trong tháng
            </Typography>
            <TimeChart />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 Common-Wrapper">
        <WhoWorking />
        <WorkingTime />
        <WorkerCount />
      </div>
    </>
  );
};

export default Home;
