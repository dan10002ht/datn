import React, { useState } from "react";

const useInput = ({ input = {} }) => {
  const [data, setData] = useState(input);
  const handleChangeData = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  return { data, setData, handleChangeData };
};

export default useInput;
