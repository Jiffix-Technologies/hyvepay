import React, { useEffect, useState } from "react";
import "./modal.css";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import OtpInput from "react-otp-input";

export default function OtpModal({ openOtp, setOpenOtp }) {
  const [otp, setOtp] = useState("");
  if (openOtp) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = (e) => {
    if (e.target.id === "modalWrapperId") {
      setOpenOtp(!openOtp);
    }
  };

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

              {/* <div>
                <h5 className="text-center heading-five">Transfer Fund</h5>
              </div> */}
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="font-montserrat font-bold text-[20px]">
                Confirm OTP
              </h2>
              <span className="text-[14px] text-center font-light font-montserrat inline-block mb-[43px]">
                We sent you an OTP, check your email address and provide the
                code
              </span>

              <div className="w-full mb-10 ">
                <div className="otp-inputs flex justify-center items-center gap-4">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span className="mr-3"> </span>}
                    // renderInput={(props) => <input {...props} />}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              </div>

              <AppBtn
                title="CONFIRM OTP"
                className="text-[#000] w-full bg-[#FAA21B] mt-1"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
