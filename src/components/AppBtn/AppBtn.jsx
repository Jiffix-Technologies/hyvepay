import React from "react";
import loading from "../../assets/images/Loading.json";
import Lottie from "lottie-react";

const AppBtn = ({
  onClick,
  title,
  showIcon,
  showSpinner = false,
  image,
  className,
}) => {
  return (
    <button
      className={
        `btn   ${
          showSpinner && "loadingBtn"
        }      text-[#000] bg-[#FAA21B] flex h-16 items-center justify-center
      ` + className
      }
      onClick={onClick}
    >
      {showIcon && <img src={image} alt="" className="w-[25px] h-[25px]" />}

      <span className="text-[16px] inline-block ml-2 font-montserrat">
        {title}
      </span>
    </button>
  );
};

export default AppBtn;
