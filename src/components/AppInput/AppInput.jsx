import React from "react";

const AppInput = ({
  rightImg,
  leftImg,
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

      <div className="prepend w-full mb-5">
        <img src={leftImg} alt="" />
        <input
          type={type}
          className={
            `w-full placeholder-[#A5A5A5] placeholderText
          } ` + className
          }
          placeholder={placeholder}
        />
        <button onClick={(e) => togglePassword(e, !pwdfield)}>
          <img src={rightImg} alt="" />
        </button>
      </div>
    </>
  );
};

export default AppInput;
