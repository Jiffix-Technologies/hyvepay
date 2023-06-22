import React, { useState } from "react";
import AppInput from "../AppInput/AppInput";
import { Link, useNavigate } from "react-router-dom";
import AppBtn from "../AppBtn/AppBtn";
import User from "../../assets/svgs/user.svg";
import Lock from "../../assets/svgs/lock.svg";
import Eye from "../../assets/svgs/eye.svg";
import ResetPasswordModal from "../modals/ResetPasswordModal";

const LoginForm = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full items-center mt-36 md:mt-0 px-10 md:px-28 justify-center">
        <div className="max-w-prose mx-auto">
          <h2 className="font-montserrat font-bold text-[20px]">
            Sign in to HyveCloud
          </h2>
          <span className="text-[14px] font-light font-montserrat inline-block mb-[43px]">
            Enter your information below to log into your account
          </span>
          <AppInput leftImg={User} />
          <div className="w-full">
            <AppInput rightImg={Eye} leftImg={Lock} />
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
