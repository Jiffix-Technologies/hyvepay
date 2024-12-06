import React from "react";

const AppTabBtn = ({ onClick, title, className }: any) => {
  return (
    <div
      className={
        ` text-[#000] cursor-pointer bg-[#FAA21B] btn-tabs px-4 py-4 rounded-[20px]  flex items-center justify-center
      ` + className
      }
      onClick={onClick}
    >
      <span className="text-sm inline-block font-montserrat">{title}</span>
    </div>
  );
};

export default AppTabBtn;
