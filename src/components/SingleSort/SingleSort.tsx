import React, { useState } from "react";

const SingleSort = ({ openSort, setOpenSort, select, setSelect }: any) => {
  if (openSort) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const items = [
    "Name (Ascending)",
    "Name (Descending)",
    "Date (Ascending)",
    "Date (Descending)",
  ];
  return (
    <div className="absolute top-11 p-4 flex flex-col rounded-lg shadow-xl gap-3 w-[200px] z-50 bg-[#fff]">
      {items.map((item) => {
        return (
          <span
            className="font-montserrat text-xs cursor-pointer"
            onClick={() => {
              setOpenSort(!openSort);
              setSelect(item);
            }}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default SingleSort;
