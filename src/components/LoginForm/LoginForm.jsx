import React, { useState } from "react";
import AppInput from "../AppInput/AppInput";
import { Link, useNavigate } from "react-router-dom";
import AppBtn from "../AppBtn/AppBtn";
import User from "../../assets/svgs/user.svg";
import Lock from "../../assets/svgs/lock.svg";
import Eye from "../../assets/svgs/eye.svg";
import ResetPasswordModal from "../modals/ResetPasswordModal";
import TextHeader from "../TextHeader/TextHeader";

const LoginForm = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full items-center mt-28 px-10 md:px-28 justify-center">
        <div style={{ maxWidth: 600, width: "100%" }}>
          <TextHeader
            className="text-center"
            title="Sign in to HyvePay"
            subTextCassName="mb-10 text-center"
            subTitle=" Enter your HyveCloud account information below to log into your
          account"
          />

          <AppInput placeholder={"Your Email"} leftImg={User} />
          <div className="w-full">
            <AppInput rightImg={Eye} placeholder={"Password"} leftImg={Lock} />
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
            onClick={() => navigate("/dashboard")}
            title="Log in"
            className=" w-full bg-[#FAA21B] mt-8 text-black"
          />

          <p to="/register" className=" mt-5 font-montserrat text-[14px]">
            Don’t have an account?{" "}
            <b onClick={() => navigate("/register")} className="cursor-pointer">
              Sign up
            </b>
          </p>
        </div>
      </div>

      <ResetPasswordModal setOpenModal={setOpenModal} openModal={openModal} />
    </>
  );
};

export default LoginForm;
