import React, { useEffect, useRef, useState } from "react";
import settings from "../../../assets/images/settings.png";
import MenuIcon from "../../../assets/svgs/menu.svg";
import ProfileDropDown from "../../../components/ProfileDropDown/ProfileDropDown";
import { FaChevronLeft } from "react-icons/fa";
import { useUser } from "../../../hooks/useUser";

const DashboardHeader = ({ show, openNav, setOpenNav, open, setOpen }: any) => {
  const { user } = useUser();
  let name = user?.firstName;

  let workshop = "Demo workshop";

  return (
    <header
      className={`bg-[#F9F9F9]  w-[100%] flex justify-between items-center h-[80px] z-50 header-container ${
        show ? " small-paddings" : "full-header"
      } `}
    >
      {window.location.pathname === "/hyvepay/initiate-transaction" ? (
        <h5
          className="heading-five font-montserrat md:block hidden cursor-pointer"
          onClick={() => window.history.back()}
        >
          {/* <FaChevronLeft /> */}
          <span> Back</span>
        </h5>
      ) : (
        <h5 className="heading-five font-montserrat md:block hidden">
          HyvePay
        </h5>
      )}

      <img
        src={MenuIcon}
        className="md:hidden block"
        alt=""
        style={{ height: 20 }}
        onClick={() => setOpenNav(!openNav)}
      />

      <div className="">
        <button className="" onClick={() => setOpen(!open)}>
          <div className="flex  items-center gap-2">
            <span className="font-montserrat">Hi, {name}</span>

            <img src={settings} alt="" className="w-[30px] h-[30px]" />
          </div>
        </button>

        {open && <ProfileDropDown setOpen={setOpen} open={open} />}
      </div>
    </header>
  );
};

export default DashboardHeader;
