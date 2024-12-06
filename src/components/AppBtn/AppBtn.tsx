import React, { FC, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IProps {
  onClick?: any;
  title?: any;
  showIcon?: boolean;
  image?: any;
  className?: any;
  type?: any;
  spinner?: boolean;
  savedBen?: boolean;
}

const AppBtn: FC<IProps> = ({
  onClick,
  title,
  showIcon,
  image,
  className,
  type = "submit",
  savedBen = false,
  spinner = false,
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <button
      className={
        `btn text-[#000] bg-[#FAA21B] flex items-center justify-center px-6 py-3
      ` + className
      }
      onClick={onClick}
      type={type}
      disabled={spinner || savedBen}
      style={{ cursor: "pointer" }}
    >
      {spinner && (
        <ClipLoader
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mr-5 flex relative top-1"
        />
      )}
      {showIcon && <img src={image} alt="" className="w-[25px] h-[25px]" />}

      <span className="text-sm inline-block  font-montserrat">{title}</span>
    </button>
  );
};

export default AppBtn;
