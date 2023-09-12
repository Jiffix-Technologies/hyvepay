import React from "react";
import flag from "../../assets/images/flag.png";
import InputHeader from "../InputHeader/InputHeader";
const AppInputWithPhone = ({
  placeholderTop,
  hasPLaceHolder,
  placeholder,
  className,
  type,
  onChange,
  value,
}: any) => {
  const [pwdfield, setPwdfield] = React.useState(false);

  const togglePassword = (e: any, val: any) => {
    e.preventDefault();

    setPwdfield(val);
  };

  return (
    <>
      {hasPLaceHolder && <InputHeader text={placeholderTop} />}

      {/* {hasPLaceHolder && (
        <span className="text[10px] inline-block font-montserrat">
          {placeholderTop}
        </span>
      )} */}

      <div className="w-full flex items-center justify-center relative mb-5">
        <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-11" />

        <input
          // max={13}
          // inputMode="numeric"
          type={type}
          onChange={onChange}
          className={
            `w-full placeholder-[#A5A5A5] placeholderText pl-20
          } ` + className
          }
          placeholder={placeholder}
          value={value}
        />
      </div>
    </>
  );
};

export default AppInputWithPhone;
