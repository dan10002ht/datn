import { Button, Modal } from "antd";
import React, { useState } from "react";
import useDeleteApi from "../../../hooks/api/useDeleteApi";

export default function DeleteInformationModal({ input }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { deleting, handleDelete } = useDeleteApi({
    url: `/user/${input.userId}`,
    successCallback: handleCancel
  });

  return <>
    <Button danger onClick={handleOpen}>Xóa</Button>
    <Modal confirmLoading={deleting} okType="danger" open={open} onOk={handleDelete} onCancel={handleCancel} title={"Bạn có chắc muốn xóa người này không?"}>

    </Modal>
  </>
}