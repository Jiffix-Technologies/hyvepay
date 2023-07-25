import React from "react";
import SuccessIcon from "../../assets/svgs/success-icon.svg";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import HyveIcon2 from "../../assets/svgs/hyve-icon2.svg";
import hyvePay from "../../assets/images/hyvePay.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import useAppSelector from "../../hooks/useAppSelector";
import moment from "moment";
import { useUser } from "../../hooks/useUser";

const SuccessfulPaymentModal = ({ successModal, closeSuccessModal }: any) => {
  const state = useAppSelector((state) => state.bankReducer);

  const { user } = useUser();

  const handlePDFDownload = () => {
    const pdfview = document.querySelector("#pdfView") as HTMLElement;
    const pdf = new jsPDF() as any;
    html2canvas(pdfview).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 30, 50);
      pdf.save("receipt.pdf");
    });
  };
  return (
    <>
      {successModal && (
        <div
          className="overlay h-screen w-screen flex fixed justify-center items-center"
          style={{ zIndex: 5000 }}
        >
          <div
            className="modal bg-white py-8 px-3"
            style={{ maxHeight: "90%", overflowY: "scroll" }}
          >
            <div className="modal-header pt-0 bg-white px-8">
              <div className="flex justify-end w-full">
                <button onClick={() => closeSuccessModal()}>
                  <img src={CloseIcon} alt="" />
                </button>
              </div>

              <div>
                <div className="flex justify-center">
                  <img src={SuccessIcon} style={{ maxWidth: 70 }} alt="" />
                </div>
                <h5 className="text-center mt-3 text-[#494949] text-[14px] font-semibold">
                  Payment Successful
                </h5>
                <h5 className="text-center md:text-sm text-[9px] max-w-[95%]  text-[#494949] font-montserrat">
                  Yay! Congratulations... ₦{" "}
                  {Number(state.accountTransferInfo?.amount).toFixed(2)} was
                  successfully sent <br />
                  to ({state.accountTransferInfo?.accountName} | {state.accountTransferInfo?.bank.label} |
                  {state.accountHolder?.beneficiaryAccountNumber})
                </h5>
                {/* </div> */}
              </div>
            </div>
            <div className="body">
              {/* view */}

              <div className=" flex flex-col mt-4 justify-center items-center px-4 md:px-10">
                <div
                  id="pdfView"
                  className="w-full receipt-preview mt-4 p-3 md:p-8 mb-1 md:mb-3"
                >
                  <div className="flex justify-between items-center">
                    <h5 className="text-[#494949] text-[14px] font-semibold">
                      Transaction Receipt
                    </h5>
                    <img src={hyvePay} alt="" style={{ width: 30 }} />
                  </div>

                  <div className="my-8">
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat">
                        {" "}
                        Transaction Date:
                      </p>
                      <p className="text-[10px] font-montserrat">
                        {moment().format("DD-MM-YYYY")}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat">
                        Reference Number:
                      </p>
                      <p className="text-[10px] font-montserrat">
                        {state.accountTransferResponse?.transactionReference}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat"> Amount:</p>
                      <p className="text-[10px] font-montserrat">
                        ₦ {Number(state.accountTransferInfo?.amount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat"> Sender:</p>
                      <p className="text-[10px] font-montserrat">
                        {user?.firstName} {user?.lastName}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat"> Recipient:</p>
                      <p className="text-[10px] font-montserrat">
                        {state.accountHolder?.beneficiaryName}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat">
                        Recipient Bank Name:
                      </p>
                      <p
                        style={{ textAlign: "right" }}
                        className="text-[10px] font-montserrat w-[105px]"
                      >
                        {state.accountTransferInfo?.bank.label}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[11px] font-montserrat">
                        {" "}
                        Account Number:
                      </p>
                      <p className="text-[11px] font-montserrat">
                        {state.accountHolder?.beneficiaryAccountNumber}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat"> Narration:</p>
                      <p className="text-[10px] font-montserrat w-[150px] text-right">
                        {state.accountTransferInfo?.narration}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat">
                        {" "}
                        Transfer Fees:
                      </p>
                      <p className="text-[10px] font-montserrat">
                        ₦{import.meta.env.TRANSFER_FEE}
                      </p>
                    </div>
                    <div className="flex justify-between mb-2 items-center">
                      <p className="text-[10px] font-montserrat"> Status:</p>
                      <p className="text-[10px] font-montserrat">
                        {state.accountTransferResponse?.status}
                      </p>
                    </div>
                  </div>

                  <hr className="mb-4" />

                  <p className="md:text-xs text-[5px]  text-gray-500  font-montserrat">
                    {" "}
                    <b>Disclaimer:</b> Enjoy customized banking experienced with
                    HyvePay. HyvePay financial serves are backed by Kuda
                    Microfinance Bank, regulated by CBN and insured by NDIC. And
                    all transactions are subject to the CBN regulations.
                  </p>
                </div>

                <div className="flex gap-4 justify-around mt-5">
                  <button
                    onClick={handlePDFDownload}
                    className="btn btn-secondary"
                  >
                    Download PDF
                  </button>

                  <div>
                    <button className="btn btn-secondary">Share PDF</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessfulPaymentModal;
