import React, { useEffect, useState } from "react";
import "./modal.css";
import AppInput from "../AppInput/AppInput";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpModal from "./OtpModal";

export default function ChangePasswordModal({ setOpenModal, openModal }: any) {
  const [openOtp, setOpenOtp] = useState(false);

  if (openModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {openModal && (
        <div
          className="overlay h-screen w-screen flex  fixed justify-center items-center"
          onClick={toggleModal}
        >
          <div className="modal bg-white py-8 px-20">
            <div className="modal-header bg-white p-8 py-2 relative">
              <button
                onClick={toggleModal}
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
                Change Password
              </h2>
              <span className="text-[14px]  font-light font-montserrat inline-block mb-[43px]">
                Please enter your password to change your AutoHyve account
                password
              </span>

              <div className="w-full">
                <AppInput
                  placeholderTop="Current Password"
                  placeholder="Enter your current password"
                  hasPLaceHolder={true}
                />
              </div>
              <div className="w-full relative">
                <AppInput
                  placeholderTop="New Password"
                  placeholder="Enter new password"
                  hasPLaceHolder={true}
                />
                <span className="text-[9px] absolute top-[78px] text-[#A5A5A5] font-montserrat">
                  Your password must be minimum of 8, contain at least 1 number
                  and 1 special character
                </span>
              </div>
              <div className="w-full mt-5 relative">
                <AppInput
                  placeholderTop="Confirm New Password"
                  placeholder="Re-enter new password"
                  hasPLaceHolder={true}
                />
                <span className="text-[9px]  absolute top-[78px] text-[#A5A5A5] font-montserrat">
                  Your password must be minimum of 8, contain at least 1 number
                  and 1 special character
                </span>
              </div>

              <div className="flex justify-end mt-8 gap-5">
                <AppBtn
                  title="RESET PIN"
                  className="text-[#000] border-[1px] bg-white border-[#D9D9D9] mt-1 font-medium"
                  onClick={() => setOpenOtp(true)}
                />

                <AppBtn
                  title="SUBMIT"
                  className="text-[#000]  bg-[#FAA21B] mt-1 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <OtpModal
        openOtp={openOtp}
        setOpenOtp={setOpenOtp}
        headerTitle="Reset AutoHyve Password"
        subHeader="We sent an OTP to your WhatsApp and as a text message"
      />
    </>
  );
}
