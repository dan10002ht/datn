import React, { useState } from "react";
import { Button, DatePicker, Flex, Input, Modal, Select } from "antd";
import useInput from "../../../../hooks/useInput";
import useEditApi from "../../../../hooks/api/useEditApi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const TimeKeepingModal = ({ children, cellData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  console.log({ cellData });

  const checkInDate = cellData.checkInDate
    ? dayjs(new Date(cellData.checkInDate)).format("HH:mm DD/MM/YYYY")
    : "X";
  const checkOutDate = cellData.checkOutDate
    ? dayjs(new Date(cellData.checkOutDate)).format("HH:mm DD/MM/YYYY")
    : "X";

  const checkInUrl = cellData.checkInUrl || cellData.url;
  const checkOutUrl = cellData.checkOutUrl;

  return (
    <>
      <div
        className="flex items-center justify-center h-[100%]"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        title={
          cellData.userId
            ? `Thông tin chấm công userId: ${cellData.userId}`
            : "Thông tin chấm công"
        }
        open={open}
        onOk={() => {}}
        onCancel={handleCancel}
      >
        <div className="flex">
          <div className="flex-1">
            <div>
              <span>Checkin: </span>
              <span>{checkInDate}</span>
            </div>
            {checkInDate !== "X" && (
              <div>
                {checkInUrl ? "Chấm công khuôn mặt" : "Chấm công vân tay"}
              </div>
            )}
            {checkInUrl && (
              <div>
                <span>Hình ảnh minh chứng</span>
                <img src={checkInUrl} />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div>
              <span>Checkout: </span>
              <span>{checkOutDate}</span>
            </div>
            {checkOutDate !== "X" && (
              <div>
                {checkOutUrl ? "Chấm công khuôn mặt" : "Chấm công vân tay"}
              </div>
            )}
            {checkOutUrl && (
              <div>
                <span>Hình ảnh minh chứng</span>
                <img src={checkOutUrl} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TimeKeepingModal;
