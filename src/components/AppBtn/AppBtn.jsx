import React from "react";

const AppBtn = ({ onClick, title, showIcon, image, className }) => {
  return (
    <button
      className={
        `btn text-[#000] bg-[#FAA21B] flex items-center justify-center px-6 py-3
      ` + className
      }
      onClick={onClick}
    >
      {showIcon && <img src={image} alt="" className="w-[25px] h-[25px]" />}

      <span className="text-sm inline-block  font-montserrat">{title}</span>
    </button>
  );
};

export default AppBtn;
