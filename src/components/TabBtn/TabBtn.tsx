import React from "react";

const TabBtn = ({ onClick, title, className }: any) => {
  return (
    <button
      className={
        ` text-[#000]  w-full  bg-[#FAA21B] flex items-center py-[14px] rounded-[20px] justify-center font-medium text-sm text-[16px] px-10 font-montserrat
      ` + className
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default TabBtn;
