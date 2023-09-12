import React from "react";
import AppBtn from "../AppBtn/AppBtn";
import cloudIcon from "../../assets/images/cloudIcon.png";

const LoginComponent = ({ setModal }: any) => {
  return (
    <div className="w-full flex flex-col justify-center mt-10 px-28   items-center h-[100%]">
      <div className="text-center">
        <h2 className="text-4xl font-montserrat font-semibold text-center">
          Hello there!
        </h2>
        <h5 className="text-[12px] gray-color">
          Welcome to HyvePay, what would you like to do?
        </h5>
      </div>

      <AppBtn
        title="Sign in with HyveCloud"
        className="w-full bg-[#FAA21B] mt-16"
        showIcon={true}
        image={cloudIcon}
        onClick={() => setModal(true)}
      />
      <AppBtn
        title="Create HyvePay Account"
        className="w-full mt-[35px] border-[#CACACA] border-[1px] text-[#6C6C6C]"
        showIcon={false}
      />
    </div>
  );
};

export default LoginComponent;
