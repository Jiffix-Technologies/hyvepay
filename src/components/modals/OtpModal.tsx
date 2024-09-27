import React, { useEffect, useState } from "react";
import "./modal.css";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpInput from "react-otp-input";
import NewPassword from "./NewPassword";
import { Form, Formik } from "formik";
import { MyTextInput } from "../AppInput/AppInput";
import * as Yup from "yup";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  clearResetPasswordWithToken,
  resetPasswordWithToken,
} from "../../reducers/authReducer";
import { showMessage } from "../../helpers/notification";
import { useNavigate, useNavigation } from "react-router-dom";

export default function OtpModal({
  openOtp,
  setOpenOtp,
  headerTitle = "Confirm OTP",
  subHeader = " We sent you an OTP, check your email address and provide the code",
}: any) {
  const [otp, setOtp] = useState("");
  const [newPasswordModal, setNewPasswordModal] = useState(false);
  if (openOtp) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = (e: any) => {
    if (e.target.id === "modalWrapperId") {
      setOpenOtp(!openOtp);
    }
  };

  const dispatch = useAppDispatch();

  const selector = useAppSelector((state) => state.authReducer);

  const navigation = useNavigate();

  useEffect(() => {
    if (selector.resetPasswordWithTokenStatus === "completed") {
      setOpenOtp(false);
      showMessage(
        "Operation successful",
        "Please login with the new password",
        "success"
      );
      navigation("/login");
    } else if (selector.resetPasswordWithTokenStatus === "failed") {
      showMessage(
        "Operation faild",
        selector.resetPasswordWithTokenError,
        "error"
      );
    }

    dispatch(clearResetPasswordWithToken());
  }, [selector.resetPasswordWithTokenStatus]);

  return (
    <>
      {openOtp && (
        <div
          id="modalWrapperId"
          className="overlay h-screen w-screen flex fixed justify-center items-center"
          onClick={toggleModal}
        >
          <div className="modal bg-white py-8 px-20 ">
            <div className="modal-header bg-white p-8 py-2 relative">
              <button
                onClick={() => setOpenOtp(false)}
                className="flex justify-end w-full absolute  -top-3 right-3 md:-right-10"
              >
                <img src={CloseIcon} alt="" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="font-montserrat font-bold text-[20px]">
                {headerTitle}
              </h2>
              <span className="text-[14px] text-center font-light font-montserrat inline-block mb-[43px]">
                {subHeader}
              </span>
            </div>
            <Formik
              initialValues={{ token: "", password: "" }}
              onSubmit={(values) => {
                dispatch(
                  resetPasswordWithToken({
                    password: values.password,
                    token: values.token,
                  })
                );
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .min(8)
                  .required("Password is required")
                  .matches(/^\S*$/, "Password must not contain whitespace")
                  .typeError(
                    "Password is required and must be a minimum of 8 characters"
                  ),
                confirmPassword: Yup.string()
                  .min(8)
                  .test(
                    "confirmPassword",
                    "Confirm password does not match password",
                    function (confirmPassword) {
                      const { password } = this.parent;
                      console.log("called oo", confirmPassword, password);
                      return confirmPassword === password;
                    }
                  ),
                token: Yup.string()
                  .required("Token is required")
                  .typeError("Token is required"),
              })}
            >
              <Form>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full">
                    <MyTextInput
                      placeholderTop="OTP"
                      placeholder="Enter OTP"
                      name="token"
                    />
                  </div>

                  <div className="w-full">
                    <MyTextInput
                      placeholderTop="Passowrd"
                      placeholder="Enter Password"
                      name="password"
                      type="password"
                    />
                  </div>
                  <div className="w-full">
                    <MyTextInput
                      placeholderTop="Confirm Passowrd"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    />
                  </div>

                  <AppBtn
                    type={"submit"}
                    title="Submit"
                    className="text-[#000] w-full bg-[#FAA21B] mt-1"
                    spinner={
                      selector.resetPasswordWithTokenStatus === "loading"
                    }
                  />
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      <NewPassword
        newPasswordModal={newPasswordModal}
        setNewPasswordModal={setNewPasswordModal}
      />
    </>
  );
}
