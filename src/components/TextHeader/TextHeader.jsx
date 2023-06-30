import React from "react";

const TextHeader = ({ title, subTitle, className, subTextCassName }) => {
  return (
    <div className="mb-5">
      <h2
        className={
          `text-4xl font-medium font-montserrat mb-3
      } ` + className
        }
      >
        {title}
      </h2>
      <h5
        className={
          `text-[10px] md:text-[12px] gray-color  font-montserrat
      } ` + subTextCassName
        }
      >
        {subTitle}
      </h5>
    </div>
  );
};

export default TextHeader;
