import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const AppCalender = ({ setCalender, setOpenStart, openStart }) => {
  const handleSelect = (date) => {
    setCalender(format(date, "MM/dd/yyyy"));
    setOpenStart(!openStart);
  };
  return (
    <div>
      <Calendar className="calenderElement" onChange={handleSelect} />
    </div>
  );
};

export default AppCalender;
