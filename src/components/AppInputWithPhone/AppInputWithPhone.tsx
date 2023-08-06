import React from "react";
import flag from "../../assets/images/flag.png";
import InputHeader from "../InputHeader/InputHeader";
import { useField, useFormikContext } from "formik";
// ...

const AppInputWithPhone = ({
  placeholderTop,
  hasPLaceHolder,
  placeholder,
  className,
  type,
  ...props
}: any) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      {hasPLaceHolder && <InputHeader text={placeholderTop} />}

      <div className="w-full flex items-center justify-center relative mb-5">
        <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-11" />
        <span className="absolute left-20 text-xs">NG(+234)</span>
        <input
          type={type}
          onChange={(e) => {
            helpers.setValue(e.target.value); // Update the field value using Formik's helper function
          }}
          onBlur={field.onBlur}
          value={field.value}
          className={`w-full placeholder-[#A5A5A5] placeholderText pl-36 ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {meta.touched && meta.error ? (
        <div className="error-input-field">{meta.error}</div>
      ) : null}
    </>
  );
};


//FIXME: 3 
// const AppInputWithPhone = ({
//   placeholderTop,
//   hasPLaceHolder,
//   placeholder,
//   className,
//   type,
//   ...props
// }: any) => {
//   const [field, meta, helpers] = useField(props); // useField returns [field, meta, helpers]
//   console.log(field, meta, helpers, props)
//   function setFieldValue(name: string, value: React.ChangeEvent<HTMLInputElement>) {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <>
//       {hasPLaceHolder && <InputHeader text={placeholderTop} />}

//       <div className=" w-full flex items-center justify-center relative mb-5 ">
//         <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-11" />
//         <span className="absolute  left-20 text-xs">NG(+234)</span>
//         <input
//           type={type}

//           onChange={(e) => {
//             helpers.setValue(e.target.value);
//           }}
//           onBlur={field.onBlur}
//           value={field.value}
//           className={`w-full placeholder-[#A5A5A5] placeholderText pl-36 ${className}`}
//           placeholder={placeholder}
//           {...props}
//         />
//       </div>
//       {meta.touched && meta.error ? (
//         <div className="error-input-field">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };



//FIXME: 2
// const AppInputWithPhone = ({
//   placeholderTop,
//   hasPLaceHolder,
//   placeholder,
//   className,
//   type,
//   ...props
// }: any) => {
//   const [pwdfield, setPwdfield] = React.useState(false);

//   const togglePassword = (e: any, val: any) => {
//     e.preventDefault();

//     setPwdfield(val);
//   };

//   const [field, meta] = useField(props);

//   return (
//     <>
//       {hasPLaceHolder && <InputHeader text={placeholderTop} />}

//       <div className="w-full flex items-center justify-center relative mb-5">
//         <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-11" />
//         <span className="absolute left-20 text-xs">NG(+234)</span>
//         <input
//           type={type}
//           onChange={field.onChange} // Use Formik's field.onChange to update the value
//           onBlur={field.onBlur} // Use Formik's field.onBlur for handling the blur event
//           value={field.value} // Use Formik's field.value to set the initial value
//           className={`w-full placeholder-[#A5A5A5] placeholderText pl-36 ${className}`}
//           placeholder={placeholder}
//         />
//       </div>
//       {meta.touched && meta.error ? (
//         <div className="error-input-field">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };

// const AppInputWithPhone = ({
//   placeholderTop,
//   hasPLaceHolder,
//   placeholder,
//   className,
//   type,
//   onChange
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

//       <div className=" w-full flex items-center justify-center relative mb-5 ">
//         <img src={flag} alt="" className="w-[30px] h-[22px] absolute left-11" />
//         <span className="absolute  left-20 text-xs">NG(+234)</span>
//         <input
//           // max={13}
//           type={type}
//           onChange={onChange}
//           className={
//             `w-full placeholder-[#A5A5A5] placeholderText pl-36
//           } ` + className
//           }
//           placeholder={placeholder}
//         />
//       </div>
//     </>
//   );
// };

export default AppInputWithPhone;
