import React, { useEffect, useState } from "react";
import "./modal.css";
import AppInput, { MyTextInput } from "../AppInput/AppInput";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpModal from "./OtpModal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axiosClient from "../../config/axiosClient";
import { showError, showMessage } from "../../helpers/notification";

const changePinSchema = Yup.object({
  currentPin: Yup.string().required("Current PIN is required"),
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^[0-9]+$/, "PIN should be numbers")
    .min(4, "PIN should be 4 digits")
    .max(4, "PIN should be 4 digits"),

  confirmPin: Yup.string()
    .required("Confirm PIN is required")
    .oneOf([Yup.ref("pin"), ""], "PINs must match")
    .typeError("PINs must match"),
});

export default function NewPassword({
  setNewPasswordModal,
  newPasswordModal,
}: any) {
  if (newPasswordModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = (e: any) => {
    if (e.target.id === "modalWrapperId") {
      setNewPasswordModal(!newPasswordModal);
    }
  };

  const [loading, setLoading] = useState(false);

  const handlePinUpdate = async (values: any) => {
    try {
      setLoading(true);
      const response = await axiosClient.post(
        "/api/v1/cba/account/pin/update",
        { pin: values.pin, currentPin: values.currentPin }
      );
      setNewPasswordModal(!newPasswordModal);
      showMessage(
        "Operation successful",
        "PIN updated successfully",
        "success"
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNewPasswordModal(!newPasswordModal);
      showError(error);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        validationSchema={changePinSchema}
        initialValues={{ pin: "", confirmPin: "", currentPin: "" }}
        onSubmit={(values) => handlePinUpdate(values)}
      >
        <Form>
          {newPasswordModal && (
            <div
              className="overlay h-screen w-screen flex  fixed justify-center items-center"
              onClick={toggleModal}
            >
              <div className=" bg-white w-[90%] md:w-[60%] rounded-md py-8 px-10 md:px-20">
                <div className="modal-header bg-white p-8 py-2 relative">
                  <button
                    onClick={() => setNewPasswordModal(!newPasswordModal)}
                    className="flex justify-end w-full absolute  -top-3 right-3 md:-right-10"
                  >
                    <img src={CloseIcon} alt="" />
                  </button>

                  {/* <div>
                <h5 className="text-center heading-five">Transfer Fund</h5>
              </div> */}
                </div>

                <div className="flex flex-col">
                  <h2 className="font-montserrat font-bold text-[20px]">
                    New Pin
                  </h2>
                  <span className="text-[14px] font-light font-montserrat inline-block mb-[20px]">
                    Kindly enter a new PIN for your HyvePay bank accounts
                  </span>

                  <div className="flex flex-col md:flex-row  justify-between items-center gap-1 md:gap-5">
                    <div className="w-full">
                      <MyTextInput
                        placeholderTop="Current PIN"
                        placeholder="PIN"
                        hasPLaceHolder={true}
                        type="password"
                        name="currentPin"
                      />
                    </div>
                    <div className="w-full relative">
                      <MyTextInput
                        placeholderTop="New PIN"
                        placeholder="Enter new PIN"
                        hasPLaceHolder={true}
                        type="password"
                        name="pin"
                      />
                    </div>
                    <div className="w-full relative">
                      <MyTextInput
                        placeholderTop="Confirm New PIN"
                        placeholder="Re-enter new PIN"
                        hasPLaceHolder={true}
                        type="password"
                        name="confirmPin"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-3 gap-5">
                    <AppBtn
                      title="SUBMIT"
                      className="text-[#000]  w-full md:w-[100px]  bg-[#FAA21B] mt-1 font-medium"
                      type="submit"
                      spinner={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </>
  );
}
