import React, { useState } from "react";
import { Button, DatePicker, Flex, Input, Modal, Select } from "antd";
import useInput from "../../../../hooks/useInput";
import useEditApi from "../../../../hooks/api/useEditApi";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

const AddInformationModal = ({
  input,
  title = "Thêm thông tin cá nhân",
  buttonContent = "Thêm thông tin cá nhân",
  successCallback = () => {},
}) => {
  const { data, handleChangeData } = useInput({ input });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { editing, handleEdit } = useEditApi({ url: `/user/${data.userId}` });

  const handleConfirm = async () => {
    try {
      const success = await handleEdit(data);
      if (success) {
        handleCancel();
        successCallback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>{buttonContent}</Button>
      <Modal
        title={title}
        open={open}
        onOk={handleConfirm}
        confirmLoading={editing}
        onCancel={handleCancel}
      >
        <Flex vertical gap="small">
          <Input
            value={data.name}
            placeholder="Tên nhân viên"
            onChange={(e) => handleChangeData("name", e.target.value)}
          />
          <Flex gap="small">
            <Input
              placeholder="Số điện thoại"
              value={data.phoneNumber}
              onChange={(e) => handleChangeData("phoneNumber", e.target.value)}
            />
            <DatePicker
              defaultValue={dayjs(
                dayjs(new Date(data.createdAt)).format(dateFormat),
                dateFormat
              )}
              format={dateFormat}
              placeholder="Ngày sinh"
              onChange={(date, dateString) => {
                handleChangeData("dob", new Date(dateString));
                console.log({ date, dateString });
              }}
            />
          </Flex>
          <Select
            placeholder="Bộ phận"
            value={data.department}
            options={[{ value: "member", label: "Nhân viên" }]}
            onChange={(value) => handleChangeData("department", value)}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default AddInformationModal;
