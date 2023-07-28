import React, { useState } from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import ConfirmPaymentModal from "./ConfirmPaymentModal";
import AppBtn from "../AppBtn/AppBtn";
import InputHeader from "../InputHeader/InputHeader";

const FundModal = ({
  modal = false,
  closeModal,
  setModal,
  modalType = 0,
}: any) => {
  const [view, setView] = React.useState(modalType);
  const [confirmationmodal, setConfirmationmodal] = React.useState(false);
  const [selected, setSelected] = useState(0);

  const closeConfirmModal = () => setConfirmationmodal(!confirmationmodal);

  const tab = ["New Beneficiary", "Saved Beneficiary"];

  return (
    <>
      <ConfirmPaymentModal
        confirmationmodal={confirmationmodal}
        closeConfirmModal={closeConfirmModal}
      />
      {modal && (
        <div className="overlay h-screen w-screen flex fixed justify-center items-center">
          <div className="modal bg-white p-4 max-h-[60%] overflow-y-auto">
            <div className="modal-header bg-white p-8 py-2">
              <div className="flex justify-end w-full">
                <button onClick={() => closeModal()}>
                  <img src={CloseIcon} alt="" />
                </button>
              </div>
              <div>
                <h5 className="text-center heading-five">Transfer Fund</h5>
              </div>
            </div>
            <div className="body">
              <div className="border-[#CACACA] border-[1px] rounded-[15px] tabWrapper items-center justify-between flex self-center flex-wrap">
                {tab.map((item, index) => {
                  return (
                    <AppBtn
                      className={`w-full text-black ${
                        selected === index
                          ? "bg-[#FAA21B] "
                          : "bg-[#fff] border-[#CACACA] border-[1px]"
                      } `}
                      title={item}
                      onClick={() => setSelected(index)}
                      key={index}
                    />
                  );
                })}
              </div>

              <div className="flex justify-center "></div>

              {selected === 0 ? (
                <div
                  className="flex flex-col mt-6 xs:my-10 justify-center items-center px-4 md:px-10"
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <div className="form-group flex-col md:flex-row w-full xs:h-[80%] justify-center">
                    {/* Rest of the code for the first view... */}
                  </div>

                  <div className="w-full mb-3 md:mb-6">
                    <input type="checkbox" name="" id="" className="mr-2" />
                    Save Beneficiary
                  </div>

                  <AppBtn
                    title="Send Money"
                    className="text-[#000] w-full bg-[#FAA21B] mt-2"
                    onClick={() => {
                      setModal(false);
                      setConfirmationmodal(!confirmationmodal);
                    }}
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col mt-8 justify-center items-center px-4 md:px-10"
                  style={{
                    maxWidth: "100%",
                  }}
                >
                  <div className="w-full mb-3 md:mb-6">
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 text-gray-400 text-center w-full sm"
                      style={{ border: 0 }}
                    >
                      <option value="">Choose Beneficiary</option>
                    </select>
                  </div>
                  {/* Rest of the code for the second view... */}

                  <div className="w-full mb-3 md:mb-6">
                    <input type="checkbox" name="" id="" className="mr-2" />
                    Save Beneficiary
                  </div>

                  <AppBtn
                    title="Send Money"
                    className="text-[#000] w-full bg-[#FAA21B] mt-2"
                    onClick={() => {
                      setConfirmationmodal(!confirmationmodal);
                      setModal(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FundModal;
