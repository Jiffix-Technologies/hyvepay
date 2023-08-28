import React, { useEffect, useState } from "react";
import "./modal.css";
import AppInput, { MyEmailTextInput, MyTextInput } from "../AppInput/AppInput";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import * as Yup from "yup";
import { Form, Formik, FormikHelpers, useFormik, ErrorMessage } from "formik";
import { showError, showMessage } from "../../helpers/notification";
import axiosClient from "../../config/axiosClient";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import { logoutAction } from "../../reducers/authReducer";

const formData = {
    email: "",
    password: ""
};

const ChangeEmailSchema = Yup.object({
    email: Yup.string()
        .email()
        .required("Email is required")
        .typeError("Email address is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long")
})

export default function ChangeEmailModal({ setOpenChangeEmailModal, openChangeEmailModal }: any) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const modalEelement = document.querySelector("#changeEmailModal");
        if (openChangeEmailModal) {
          modalEelement && modalEelement.classList.remove("hide-modal");
          modalEelement && modalEelement.classList.add("show-modal");
        } else {
          modalEelement && modalEelement.classList.remove("show-modal");
          modalEelement && modalEelement.classList.add("hide-modal");
        }
    }, [openChangeEmailModal]);

    const toggleModal = () => {
        setOpenChangeEmailModal(false);
    };

    const updateEmail = async (payload: any) => {
        try {
          setLoading(true);

          const response = await axiosClient.put(
            "/api/v1/cba/account/update",
            { email: payload.email, password: payload.password }
          );
          setLoading(false);
          toggleModal();
          showMessage(
            "Operation successful",
            "Email changed successfully",
            "success"
          );
          dispatch(logoutAction());
        } catch (err) {
          setLoading(false);
          showError(err);
        }
    };

    return(
        <>
            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={ChangeEmailSchema}
                onSubmit={(values) => updateEmail(values)}
            >
                <Form>
                    <div
                        id="changeEmailModal"
                        className="overlay hide-modal h-screen w-screen flex fixed justify-center items-center"
                    >
                        <div className="modal bg-white py-8 px-20">
                            <div className="modal-header bg-white p-8 py-2 relative">
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="flex justify-end w-full absolute md:top-3 right-3 md:-right-10"
                                >
                                    <img src={CloseIcon} alt="" />
                                </button>
                            </div>

                            <div className="flex flex-col">
                                <h2 className="font-montserrat font-bold text-[20px]">
                                    Change Email
                                </h2>
                                <span className="text-[14px]  font-light font-montserrat inline-block mb-[43px]">
                                    Kindly be aware that your email will be updated both in your profile and bank account. Additionally, you will be required to log in again using the newly updated email address.
                                </span>

                                <div className="w-full relative">
                                    <MyEmailTextInput
                                        placeholderTop="Email"
                                        placeholder="Enter new email"
                                        hasPLaceHolder={true}
                                        name="email"
                                        type="email"
                                    />
                                </div>
                                <div className="w-full relative">
                                    <MyTextInput
                                        placeholderTop="Password"
                                        placeholder="Enter password"
                                        hasPLaceHolder={true}
                                        name="password"
                                        type="password"
                                    />
                                </div>

                                <div className="flex justify-end mt-8 gap-5">
                                    <AppBtn
                                        title="SUBMIT"
                                        spinner={loading}
                                        className="text-[#000] bg-[#FAA21B] mt-1 font-medium"
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </>
    )
}