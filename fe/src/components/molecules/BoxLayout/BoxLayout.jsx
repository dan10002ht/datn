import React from "react";

const BoxLayout = ({
  children,
  title,
  isCenter = false,
  isFullWidth = false,
}) => {
  return (
    <div
      className={`px-4 py-2 border min-h-[100px] rounded-md ${
        isFullWidth ? "flex-1" : ""
      }`}
    >
      <div className="text-xl font-semibold Request-Title__Container">
        {title}
      </div>
      <div
        className={`Request-Content__Container max-h-50 min-h-[100%] max-h-[364px] overflow-auto ${
          isCenter ? "flex items-center justify-center" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BoxLayout;
