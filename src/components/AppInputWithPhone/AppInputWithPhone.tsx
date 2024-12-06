import React from "react";
import flag from "../../assets/images/flag.png";
import InputHeader from "../InputHeader/InputHeader";
import { useField } from "formik";
// const AppInputWithPhone = ({
//   placeholderTop,
//   hasPLaceHolder,
//   placeholder,
//   className,
//   type,
//   onChange,
//   value,
// }: any) => {
//   const [pwdfield, setPwdfield] = React.useState(false);

//   const togglePassword = (e: any, val: any) => {
//     e.preventDefault();

//     setPwdfield(val);
//   };

//   return (
//     <>
//       {hasPLaceHolder && <InputHeader text={placeholderTop} />}

//       {/* {hasPLaceHolder && (
//         <span className="text[10px] inline-block font-montserrat">
//           {placeholderTop}
//         </span>
//       )} */}

//       <div className="w-full flex items-center justify-center relative mb-5">
//         <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-11" />

//         <input
//           // max={13}
//           // inputMode="numeric"
//           type={type}
//           onChange={onChange}
//           className={
//             `w-full placeholder-[#A5A5A5] placeholderText pl-20
//           } ` + className
//           }
//           placeholder={placeholder}
//           value={value}
//         />
//       </div>
//     </>
//   );
// };

const AppInputWithPhone = ({
  label,
  className,
  leftImg,
  hasPLaceHolder,
  placeholderTop,
  rightImg,
  type = "text",
  disabled = false,
  ...props
}: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField({...props});

  return (
    <div className="mb-5">
      {hasPLaceHolder && <InputHeader text={placeholderTop} />}
      <div className="w-full flex items-center justify-center relative">
        <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-8" />
        <input
          className={
            `w-full placeholder-[#A5A5A5] placeholderText pl-20
          } ` + className
          }
          {...field}
          {...props}
          type={type}
          disabled={disabled}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className="error-input-field text-[red] text-[13px]">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default AppInputWithPhone;
