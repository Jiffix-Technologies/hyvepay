import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppDropDown from "../AppDropDown/AppDropDown";
import AppBtn from "../AppBtn/AppBtn";
import AppInputWithPhone from "../AppInputWithPhone/AppInputWithPhone";
import { Form, Formik } from "formik";
import { AppPhoneInput, MySelect, MyTextInput } from "../AppInput/AppInput";
import { customStyles } from "../../contsants/customStyles";
import InputHeader from "../InputHeader/InputHeader";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import {
  clearCreateBeneficiaryStatus,
  createBeneficiaryAction,
  getAllBankAction,
  getBeneficiariesAction,
} from "../../reducers/bankReducer";
import * as Yup from "yup";
import { showMessage } from "../../helpers/notification";

const AddNewBeneficiaryModal = ({
  newBeneficiary,
  setnewBeneficiary,
  title = "Add New Beneficiary",
}: any) => {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState({
    name: "",
    accountNumber: "",
    accountName: "",
    bankName: { label: "", value: "" },
    bankCode: "",
  });
  const state = useAppSelector((state) => state.bankReducer);
  if (newBeneficiary) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = (e: any) => {
    if (e.target.id === "modalWrapperId") {
      setnewBeneficiary(!newBeneficiary);
    }
  };

  useEffect(() => {
    dispatch(getAllBankAction());
  }, []);

  useEffect(() => {
    if (state.createBeneficiaryStatus === "completed") {
      setnewBeneficiary(!newBeneficiary);
      showMessage(
        "Operation successful",
        "Beneficiary successfully added",
        "success"
      );
      dispatch(getBeneficiariesAction());
      dispatch(clearCreateBeneficiaryStatus());
    } else if (state.createBeneficiaryStatus === "failed") {
      showMessage(state.createBeneficiaryError, "", "error");
      dispatch(clearCreateBeneficiaryStatus());
    }
  }, [state.createBeneficiaryStatus]);
  return (
    <>
      {newBeneficiary && (
        <Formik
          enableReinitialize
          validationSchema={Yup.object({
            name: Yup.string().required("Beneficiary name is required"),
            bankName: Yup.object({
              label: Yup.string().required("Bank is required"),
              value: Yup.string().required("Bank is required"),
            }).required("Bank is required"),

            accountNumber: Yup.string().required("Accout number is required"),
            accountName: Yup.string().required("Acount name is required"),
          })}
          initialValues={formState}
          onSubmit={(values) => {
            dispatch(
              createBeneficiaryAction({
                name: values.name,
                bankName: values.bankName.label,
                accountNumber: values.accountNumber,
                accountName: values.accountName,
                bankCode: values.bankName.value,
              })
            );
          }}
        >
          <Form>
            <div
              id="modalWrapperId"
              className="fixed top-0 inset-0 bg-black bg-opacity-70 flex justify-center items-center customModal"
              onClick={toggleModal}
            >
              <div className="bg-white p-2 relative h-[70%] pt-10 w-[80%] md:w-[50%] overflow-y-auto pb-10  rounded-md">
                <div className="modal-header pt-0 bg-white px-8">
                  <div className="flex justify-end w-full relative -top-5">
                    <button onClick={() => setnewBeneficiary(!newBeneficiary)}>
                      <img src={CloseIcon} alt="" />
                    </button>
                  </div>

                  <div>
                    <h5 className="text-center heading-five">{title}</h5>
                  </div>
                </div>
                <div className="body">
                  <div className="flex flex-col mt-8 justify-center items-center px-4 md:px-10">
                    <div className="form-group flex-col w-full justify-center">
                      <div className="w-full -mb-5 md:mb-6">
                        <MyTextInput
                          hasPLaceHolder={true}
                          placeholder="John Doe"
                          placeholderTop="Beneficiary Name"
                          className="bg-[#F5F5F5] border-[#F5F5F5]"
                          type="text"
                          name="name"
                        />
                      </div>
                      <div className="w-full -mb-5 md:mb-6">
                        <InputHeader text="Bank" />
                        <MySelect
                          hasPLaceHolder={true}
                          placeholder=""
                          className="bg-[#F5F5F5] border-[#F5F5F5]"
                          name="bankName"
                          options={
                            state.banks?.map((item) => ({
                              label: item.bankName,
                              value: item.bankCode,
                            })) || []
                          }
                          styles={customStyles}
                        />
                        <br />
                      </div>
                      <div className="form-group flex-col md:flex-row  w-full justify-center">
                        <div className="w-full -mb-5 md:mb-6">
                          <MyTextInput
                            hasPLaceHolder={true}
                            placeholder="Enter your account number"
                            placeholderTop="Recipient's Account Number"
                            className="bg-[#F5F5F5] border-[#F5F5F5]"
                            type="text"
                            name="accountNumber"
                          />
                        </div>

                        {/* <div className="w-full mb-3 md:mb-6">
                        <AppDropDown className="border-[#F5F5F5]" />
                      </div> */}
                      </div>

                      <div className="form-group flex-col md:flex-row  w-full justify-center">
                        <div className="w-full -mb-5 md:mb-6">
                          <MyTextInput
                            hasPLaceHolder={true}
                            placeholder="Enter your account Name"
                            placeholderTop="Recipient's Account Name"
                            className="bg-[#F5F5F5] border-[#F5F5F5]"
                            type="text"
                            name="accountName"
                          />
                        </div>

                        {/* <div className="w-full mb-3 md:mb-6">
                        <AppDropDown className="border-[#F5F5F5]" />
                      </div> */}
                      </div>

                      <div className="form-group w-full justify-center">
                        <AppBtn
                          className="bg-[#FAA21B] text-[#000] w-full mt-5 mb-10"
                          title="Save beneficiary"
                          type="submit"
                          spinner={state.createBeneficiaryStatus === "loading"}
                        />
                        {/* <button className="btn btn-primary uppercase font-bold w-full">
                    
                  </button> */}
                      </div>
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

/**
 *
 */

export default AddNewBeneficiaryModal;
