import React, { useEffect, useState } from "react";
import AppInput, { MyEmailTextInput, MyTextInput } from "../AppInput/AppInput";
import { Link, useNavigate } from "react-router-dom";
import AppBtn from "../AppBtn/AppBtn";
import User from "../../assets/svgs/user.svg";
import Lock from "../../assets/svgs/lock.svg";
import Eye from "../../assets/svgs/eye.svg";
import ResetPasswordModal from "../modals/ResetPasswordModal";
import TextHeader from "../TextHeader/TextHeader";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import useAppDispatch from "../../hooks/useAppDispatch";
import { loginUserAction } from "../../actions/auth";
import useAppSelector from "../../hooks/useAppSelector";
import { IAuthState } from "../../reducers/authReducer";
import { clearLoginStatus } from "../../reducers/authReducer";
import { showMessage } from "../../helpers/notification";
import { APP_BASE_URL } from "../../contsants";

const LoginForm = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const loginState = useAppSelector(
    (state: any) => state.authReducer
  ) as IAuthState;



  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearLoginStatus());
  }, []);
  useEffect(() => {
    if (loginState.loginStatus === "completed") {
      clearLoginStatus();
      navigate("/dashboard");
    } else if (loginState.loginStatus === "failed") {
      showMessage(loginState.loginStatus, "Email or Password is incorrect", "error");
    }
  }, [loginState.loginStatus]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").email().required("Email is required"),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      dispatch(
        loginUserAction({
          username: values.email.toLowerCase(),
          password: values.password,
        })
      );
    },
  });

  return (
    <>
      <div className="flex flex-col h-full items-center mt-28 px-10 md:px-28 justify-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
          onSubmit={(values) => {

            dispatch(
              loginUserAction({
                username: values.email.toLowerCase(),
                password: values.password,
              })
            );
          }}
        >
          <Form>
            <div style={{ maxWidth: 600, width: "100%" }}>
              <TextHeader
                className="text-center"
                title="Sign in to HyvePay"
                subTextCassName="mb-10 text-center"
                subTitle=" Enter your HyveCloud account information below to log into your
          account"
              />

              <MyEmailTextInput
                name="email"
                placeholder={"Your Email"}
                leftImg={User}
                formik={formik}
                type={"email"}
              />
              <div className="w-full">
                <MyTextInput
                  rightImg={Eye}
                  placeholder={"Password"}
                  leftImg={Lock}
                  name="password"
                  formik={formik}
                  type="password"
                />
                <div className="justify-end  flex">
                  <p
                    onClick={() => setOpenModal(true)}
                    className="text-[14px] italic font-montserrat font-extralight relative -mt-5 text-[#A5A5A5] cursor-pointer"
                  >
                    Forgot Password?
                  </p>
                </div>
              </div>

              <AppBtn
                title="Log in"
                className=" w-full bg-[#FAA21B] mt-8 text-black"
                spinner={loginState.loginStatus === "loading"}
              />

              <p className=" mt-5 font-montserrat text-[14px]">
                Don’t have an account?{" "}
                <b
                  onClick={() => navigate("/register")}
                  className="cursor-pointer"
                >
                  Sign up
                </b>
              </p>
            </div>
          </Form>
        </Formik>
      </div>

      <ResetPasswordModal setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default LoginForm;
