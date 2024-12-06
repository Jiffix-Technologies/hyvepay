import React, { FC } from "react";
interface IProps {
  text: string;
  className?: string;
}
const InputHeader: FC<IProps> = ({ text, className }) => {
  return (
    <span
      className={
        `text-sm inline-block font-montserrat
  ` + className
      }
    >
      {text}
    </span>
  );
};

export default InputHeader;
