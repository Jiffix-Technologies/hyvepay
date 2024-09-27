import React, { useEffect, useState } from "react";
import "./modal.css";
import AppInput, { MyTextInput } from "../AppInput/AppInput";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpModal from "./OtpModal";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers, useFormik, ErrorMessage } from "formik";
import { showError, showMessage } from "../../helpers/notification";
import axiosClient from "../../config/axiosClient";
import NewPassword from "./NewPassword";

const formData = {
  password: "",
  confirmPassword: "",
};

const ChangePasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .typeError("Passwords must match"),
});

export default function ChangePasswordModal({ setOpenModal, openModal }: any) {
  const [openOtp, setOpenOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const modalEelement = document.querySelector("#changePasswordModal");
    if (openModal) {
      modalEelement && modalEelement.classList.remove("hide-modal");
      modalEelement && modalEelement.classList.add("show-modal");
    } else {
      console.log("called in oo here");
      modalEelement && modalEelement.classList.remove("show-modal");
      modalEelement && modalEelement.classList.add("hide-modal");
    }
  }, [openModal]);

  const toggleModal = () => {
    setOpenModal(false);
  };

  const updatePassword = async (payload: any) => {
    try {
      setLoading(true);

      const response = await axiosClient.patch(
        "/api/v1/partner/profile/update",
        { password: payload.password }
      );
      setLoading(false);
      toggleModal();
      showMessage(
        "Operation successful",
        "Password reset successful",
        "success"
      );
    } catch (err) {
      setLoading(false);
      showError(err);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={ChangePasswordSchema}
        onSubmit={(values) => updatePassword(values)}
      >
        <Form>
          <div
            id="changePasswordModal"
            className="overlay hide-modal h-screen w-screen flex  fixed justify-center items-center"
          // onClick={toggleModal}
          >
            <div className="modal bg-white py-8 px-20">
              <div className="modal-header bg-white p-8 py-2 relative">
                <button
                  onClick={toggleModal}
                  className="flex justify-end w-full absolute  -top-3 right-3 md:-right-10"
                >
                  <img src={CloseIcon} alt="" />
                </button>
              </div>

              <div className="flex flex-col">
                <h2 className="font-montserrat font-bold text-[20px]">
                  Change Password
                </h2>
                <span className="text-[14px]  font-light font-montserrat inline-block mb-[43px]">
                  Please enter your password to change your HyveCloud account
                  password
                </span>

                <div className="w-full relative">
                  <MyTextInput
                    placeholderTop="New Password"
                    placeholder="Enter new password"
                    hasPLaceHolder={true}
                    name="password"
                    type="password"
                  />
                </div>
                <div className="w-full mt-5 relative">
                  <MyTextInput
                    placeholderTop="Confirm New Password"
                    placeholder="Re-enter new password"
                    hasPLaceHolder={true}
                    type="password"
                    name="confirmPassword"
                  />
                </div>

                <div className="flex justify-end mt-8 gap-5">
                  <AppBtn
                    title="RESET PIN"
                    className="text-[#000] border-[1px] bg-white border-[#D9D9D9] mt-1 font-medium"
                    onClick={() => {
                      setOpenModal(!toggleModal);
                      setOpenOtp(true);
                    }}
                  />

                  <AppBtn
                    title="SUBMIT"
                    spinner={loading}
                    className="text-[#000]  bg-[#FAA21B] mt-1 font-medium"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
      <NewPassword
        setOpenOtp={setOpenOtp}
        setNewPasswordModal={setOpenOtp}
        newPasswordModal={openOtp}
        headerTitle="Reset AutoHyve Password"
        subHeader="We sent an OTP to your WhatsApp and as a text message"
      />
    </>
  );
}
