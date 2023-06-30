import React from "react";
const AppInputWithPhone = ({
  placeholderTop,
  hasPLaceHolder,
  placeholder,
  className,
  type,
}) => {
  const [pwdfield, setPwdfield] = React.useState(false);

  const togglePassword = (e, val) => {
    e.preventDefault();

    setPwdfield(val);
  };
  return (
    <>
      {hasPLaceHolder && (
        <span className="text[10px] inline-block font-montserrat">
          {placeholderTop}
        </span>
      )}

      <div className=" w-full flex items-center justify-center relative mb-5">
        <span className="absolute  left-10 text-xs">NG(+234)</span>
        <input
          type={type}
          className={
            `w-full placeholder-[#A5A5A5] placeholderText pl-28
          } ` + className
          }
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default AppInputWithPhone;
