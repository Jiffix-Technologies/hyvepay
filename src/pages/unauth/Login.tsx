import React from "react";
import AppBtn from "../../components/AppBtn/AppBtn";
import cloudIcon from "../../assets/images/cloudIcon.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center mt-10  px-10 md:px-28   items-center h-[100%]">
      <div className="text-center md:mt-0 mt-20">
        <h2 className="text-[40px] font-montserrat font-semibold text-center">
          Hello there!
        </h2>
        <h5 className="text-[12px] gray-color">
          Welcome to HyvePay, what would you like to do?
        </h5>
      </div>

      <AppBtn
        title="Sign in with HyveCloud"
        className="w-full bg-[#FAA21B] mt-16 text-[#fff]"
        showIcon={true}
        image={cloudIcon}
        onClick={() => navigate("/login")}
      />
      <AppBtn
        title="Create HyvePay Account"
        className="w-full mt-[35px] border-[#CACACA]  bg-transparent border-[1px] "
        showIcon={false}
        onClick={() => navigate("/register")}
      />
    </div>
  );
};

export default Login;
