import { Modal } from "antd";
import React, { useCallback, useMemo, useState } from "react";

export default function useOpenModal({ handleClick = () => {}, title = "" }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleClick();
    handleCancel();
  };

  const ModalWrapper = useCallback(
    ({ children = "" }) => (
      <Modal
        title={title}
        open={open}
        onOk={handleClick}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    ),
    [open]
  );
  return { open, setOpen, openModal: handleOpen, ModalWrapper, handleConfirm };
}
