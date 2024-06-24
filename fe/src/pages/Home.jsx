import React, { useState } from "react";
import RequestBox from "../components/molecules/RequestBox";
import HistoryBox from "../components/molecules/HistoryBox";
import TimeChart from "../components/molecules/TimeChart";
import WhoWorking from "../components/molecules/WhoWorking";
import WorkingTime from "../components/molecules/WorkingTime";
import WorkerCount from "../components/molecules/WorkerCount";
import { Typography } from "antd";
import { client } from "../helpers/api";

const Home = () => {
  const [file, setFile] = useState();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await client.post("/upload", formData);
  };
  return (
    <>
      <div className="flex justify-between mb-10">
        <h3 className="mb-1 text-2xl font-bold">Chấm công</h3>
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-3">
          <div className="form-file custom-file">
            <input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              multiple
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="form-file-label" htmlFor="image"></label>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleUpload}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Home;
