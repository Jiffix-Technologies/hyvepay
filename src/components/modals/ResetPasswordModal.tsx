import React, { useEffect, useState } from "react";
import "./modal.css";
import AppInput from "../AppInput/AppInput";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpModal from "./OtpModal";
import { Formik, Form, FormikHelpers } from "formik"

export default function ResetPasswordModal({ setOpenModal, openModal }: any) {
  const [openOtp, setOpenOtp] = useState(false);
  if (openModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const formData = {
    email: ''
  }

  const handleModalContentClick = (event: React.MouseEvent) => {
    // Prevent event propagation to parent elements
    event.stopPropagation();
  };

  return (
    <>

      {openModal && (
        <div
          className="overlay h-screen w-screen flex fixed justify-center items-center"
          onClick={toggleModal}
        >
          <div className="modal bg-white py-8 px-20 reset-pword" onClick={handleModalContentClick}>
            <div className="modal-header bg-white p-8 py-2 relative">
              <button
                onClick={toggleModal}
                className="flex justify-end w-full absolute  -top-3 right-3 md:-right-10"
              >
                <img src={CloseIcon} alt="" />
              </button>


            </div>
            <Formik
              initialValues={formData}

              onSubmit={(values) => {
                console.log("values> ", values);

              }}>
              <Form>

                <div className="flex flex-col items-center justify-center">
                  <h2 className="font-montserrat font-bold text-[20px]">
                    Reset your password
                  </h2>
                  <span className="text-[14px] text-center font-light font-montserrat inline-block mb-[43px]">
                    Enter your email address below and we will send you an OTP to
                    reset your password
                  </span>

                  <div className="w-full">
                    <AppInput
                      placeholderTop="Email"
                      placeholder="Enter your email"
                      name="email"
                    />
                  </div>

                  <AppBtn
                    title="GET RESET OTP"
                    className="text-[#000] w-full bg-[#FAA21B] mt-1"
                    onClick={() => setOpenOtp(true)}
                  />

                </div>
              </Form>
            </Formik>
          </div>

        </div >
      )
      }

      <OtpModal openOtp={openOtp} setOpenOtp={setOpenOtp} />
    </>
  );
}
