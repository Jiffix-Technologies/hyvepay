import React, { useState } from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import SuccessfulPaymentModal from "./SuccessfulPaymentModal";
import AppBtn from "../AppBtn/AppBtn";

const ConfirmPaymentModal = ({
  confirmationmodal,
  setConfirmationmodal,
  closeConfirmModal,
}) => {
  const [successModal, setSuccessModal] = useState(false);

  const closeSuccessModal = () => setSuccessModal(!successModal);
  return (
    <>
      <SuccessfulPaymentModal
        successModal={successModal}
        closeSuccessModal={closeSuccessModal}
      />
      {confirmationmodal && (
        <div
          className="overlay h-screen w-screen flex fixed justify-center items-center"
          style={{ zIndex: 4000 }}
        >
          <div className="modal bg-white py-8 px-3">
            <div className="modal-header pt-0 bg-white px-8">
              <div className="flex justify-end w-full">
                <button onClick={() => setConfirmationmodal(false)}>
                  <img src={CloseIcon} alt="" />
                </button>
              </div>

              <div>
                <h5 className="text-center heading-five">Confirm Payment</h5>
                <h5 className="text-center text-sm gray-color">
                  You’re about to send ₦15,000.00 to David James. Enter your PIN
                  below to confirm and complete this transaction
                </h5>
                {/* </div> */}
              </div>
            </div>
            <div className="body">
              {/* view */}

              <div className=" flex flex-col mt-4 justify-center items-center px-4 md:px-10">
                <div className="w-full mb-1 md:mb-3">
                  <label className="text-sm" htmlFor="">
                    {" "}
                    Enter your pin
                  </label>{" "}
                  <br />
                  <input
                    type="password"
                    placeholder="Enter your pin"
                    className="bg-gray-100 w-full sm"
                    style={{ border: 0 }}
                  />
                </div>

                <div className="form-group w-full justify-center">
                  <AppBtn
                    title="Confirm payment"
                    className="text-[#000] w-full bg-[#FAA21B] mt-2"
                    onClick={() => setSuccessModal(!successModal)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmPaymentModal;
