import React, { useEffect, useState } from "react";
import "./modal.css";
import AppInput from "../AppInput/AppInput";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpModal from "./OtpModal";

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

  return (
    <>
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
                New Password
              </h2>
              <span className="text-[14px] font-light font-montserrat inline-block mb-[43px]">
                Kindly enter a new password for your AutoHyve Account
              </span>

              <div className="flex flex-col md:flex-row  justify-between items-center gap-1 md:gap-5">
                <div className="w-full">
                  <AppInput
                    placeholderTop="New Password"
                    placeholder="Enter new password"
                    hasPLaceHolder={true}
                  />
                </div>
                <div className="w-full relative">
                  <AppInput
                    placeholderTop="Confirm New Password"
                    placeholder="Re-enter new password"
                    hasPLaceHolder={true}
                  />
                </div>
              </div>

              <div className="flex justify-end mt-3 gap-5">
                <AppBtn
                  title="SUBMIT"
                  className="text-[#000]  w-full md:w-[100px]  bg-[#FAA21B] mt-1 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
