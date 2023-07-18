import React, { useState } from "react";
import { BsEyeSlash } from "react-icons/bs";
import InputHeader from "../InputHeader/InputHeader";

const AppInput = ({
  rightImg,
  leftImg,
  placeholderTop,
  hasPLaceHolder,
  placeholder,
  className,
  name = "",
  type = "text",
  formik = {},
}) => {
  const [pwdfield, setPwdfield] = useState(false);

  const togglePassword = (e, val) => {
    e.preventDefault();

    setPwdfield((state) => !state);
  };

  return (
    <div className="mb-5">
      {hasPLaceHolder && <InputHeader text={placeholderTop} />}

      <div className="prepend w-full mb-0">
        <img src={leftImg} alt="" />
        <input
          type={pwdfield ? "text" : type}
          className={
            `w-full placeholder-[#A5A5A5] placeholderText font-montserrat
          } ` + className
          }
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          name={name}
        />

        {type === "password" && (
          <button onClick={(e) => togglePassword(e, !pwdfield)}>
            {pwdfield ? (
              <BsEyeSlash color="black" size={25} />
            ) : (
              <img src={rightImg} alt="password" />
            )}
          </button>
        )}
      </div>
      {formik?.touched[name] && formik?.errors[name] ? (
        <div className="error-input-field">{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default AppInput;
