import React from "react";
import { BsEyeSlash } from "react-icons/bs";
import InputHeader from "../InputHeader/InputHeader";

const AppInput = ({
  rightImg,
  leftImg,
  placeholderTop,
  hasPLaceHolder,
  placeholder,
  className,
  type = "text",
}) => {
  const [pwdfield, setPwdfield] = React.useState(false);

  const togglePassword = (e, val) => {
    e.preventDefault();

    setPwdfield(val);
  };
  return (
    <>
      {hasPLaceHolder && <InputHeader text={placeholderTop} />}

      {/* 
      {hasPLaceHolder && (
        <span className="text[10px] inline-block font-montserrat">
          {placeholderTop}
        </span>
      )} */}

      <div className="prepend w-full mb-3">
        <img src={leftImg} alt="" />
        <input
          type={pwdfield ? "password" : type}
          className={
            `w-full placeholder-[#A5A5A5] placeholderText font-montserrat
          } ` + className
          }
          placeholder={placeholder}
        />
        <button onClick={(e) => togglePassword(e, !pwdfield)}>
          {pwdfield ? (
            <BsEyeSlash color="black" size={25} />
          ) : (
            <img src={rightImg} alt="" />
          )}
        </button>
      </div>
    </>
  );
};

export default AppInput;
