import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import SuccessfulPaymentModal from "./SuccessfulPaymentModal";
import AppBtn from "../AppBtn/AppBtn";
import AppInput, { MyTextInput } from "../AppInput/AppInput";
import { Field, Form, Formik } from "formik";
import useAppSelector from "../../hooks/useAppSelector";
import * as Yup from "yup";
import useAppDispatch from "../../hooks/useAppDispatch";
import { initiateAccountTranfer } from "../../reducers/bankReducer";
import { showMessage } from "../../helpers/notification";
import {Util} from "../../helpers/Util";

const ConfirmPaymentModal = ({
  confirmationmodal,
  setConfirmationmodal,
  closeConfirmModal,
}: any) => {
  const [successModal, setSuccessModal] = useState(false);

  const closeSuccessModal = () => setSuccessModal(!successModal);

  const state = useAppSelector((state) => state.bankReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.performAccountTransferRequestStatus === "completed") {
      showMessage("Transfer successful", "", "success");
      setSuccessModal(!successModal);
      setConfirmationmodal(false);
    } else if (state.performAccountTransferRequestStatus === "failed") {
      showMessage(state.performAccountTransferRequestError, "", "error");
    }
  }, [state.performAccountTransferRequestStatus]);

  const handleOnSubmit = (values: any) => {
    dispatch(
      initiateAccountTranfer({
        amount: +(state.accountTransferInfo?.amount as string) * 100,
        beneficiaryAccount: state.accountTransferInfo?.accountNumber as string,
        beneficiaryBankCode: state.accountTransferInfo?.bank.value as string,
        beneficiaryName: state.accountHolder?.beneficiaryName as string,
        narration: state.accountTransferInfo?.narration as string,
        nameEnquiryId: state.accountHolder?.nameEnquiryID as string,
        saveAsBeneficiary: state.accountTransferInfo?.saveAsBeneficiary,
        bankName: state.accountTransferInfo?.bank.label as string,
        pin: values.pin,
      })
    );
  };
  return (
    <>
      <SuccessfulPaymentModal
        successModal={successModal}
        closeSuccessModal={closeSuccessModal}
      />
      {confirmationmodal && (
        <Formik
          initialValues={{ pin: "" }}
          validationSchema={Yup.object({
            pin: Yup.string()
              .matches(/^[0-9]+$/, "PIN should be only digits")
              .length(4, "PIN must be 4 digits")
              .required("PIN is required"),
          })}
          onSubmit={handleOnSubmit}
        >
          <Form>
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
                    <h5 className="text-center heading-five">
                      Confirm Payment
                    </h5>
                    <h5 className="text-center text-sm gray-color">
  You're about to send {Util.formAmount(Number(state.accountTransferInfo?.amount))} to {state.accountTransferInfo?.accountName}.<br />
  Enter your PIN below to confirm and complete this transaction
</h5>
                    {/* </div> */}
                  </div>
                </div>
                <div className="body">
                  {/* view */}

                  <div className=" flex flex-col mt-4 justify-center items-center px-4 md:px-10">
                    <div className="w-full mb-1 md:mb-3">
                      <MyTextInput
                        type="password"
                        placeholderTop=" Enter your pin"
                        placeholder="Enter your pin"
                        hasPLaceHolder={true}
                        className="bg-[#F5F5F5] border-[#F5F5F5] h-14"
                        name="pin"
                        maxLength={4}
                      />
                    </div>

                    <div className="form-group w-full justify-center">
                      <AppBtn
                        title="Confirm payment"
                        className="text-[#000] w-full bg-[#FAA21B] mt-2"
                        type={"submit"}
                        spinner={
                          state.performAccountTransferRequestStatus ===
                          "loading"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      )}
    </>
  );
};

export default ConfirmPaymentModal;
