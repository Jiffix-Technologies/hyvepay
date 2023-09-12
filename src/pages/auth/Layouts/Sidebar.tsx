import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import "../../../assets/css/layout.css";
import hyvePay from "../../../assets/images/hyvePay.png";
import HyveIcon from "../../../assets/images/hyvBlackLogo.png";
import logoutLogo from "../../../assets/images/logoutLogo.png";
import ArrowCircleLeft from "../../../assets/svgs/arrowcircleleft.svg";
import { Link, useNavigate } from "react-router-dom";
import LogoutModal from "../../../components/modals/LogoutModal";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { logoutAction } from "../../../reducers/authReducer";

const Sidebar = ({ show, setShow, openNav, setOpenNav }: any) => {
  const navigation = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <>
      <div
        className={`side-navbar  ${openNav ? "show-mobile" : null} relative ${
          show ? "small-sidebar" : null
        } `}
      >
        <div className="shortcut-links">
          <Link to="/dashboard" className="flex items-center pl-[10px]">
            <img
              src={hyvePay}
              alt=""
              className={show ? "small-logo" : "logo-img "}
            />
            <span
              className={`heading-five ml-4 font-montserrat text-white ${
                show ? "item-text" : null
              } `}
            >
              HyvePay
            </span>
          </Link>

          <img
            src={ArrowCircleLeft}
            alt=""
            className="absolute top-20 -right-3 cursor-pointer w-[30px] md:block hidden"
            onClick={() => setShow(!show)}
          />

          <VscChromeClose
            color="#fff"
            className="md:hidden block absolute top-3  right-3 cursor-pointer"
            size={20}
            onClick={() => setOpenNav(!openNav)}
          />
          <div className="mt-14 flex flex-col gap-5">
            <div
              className="flex items-center font-montserrat text-white active cursor-pointer"
              onClick={() => {
                setOpenNav(!openNav);
                navigation("/dashboard");
              }}
            >
              <img src={HyveIcon} alt="" style={{ height: 27, width: 24 }} />
              <span
                className={` ml-4 font-montserrat text-white ${
                  show ? "item-text" : null
                } `}
              >
                Dashboard
              </span>
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center font-montserrat text-white pl-[10px] cursor-pointer"
            >
              <img src={logoutLogo} alt="" style={{ height: 27, width: 30 }} />

              <span
                className={` ml-4 font-montserrat text-white ${
                  show ? "item-text" : null
                } `}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
    </>
  );
};

export default Sidebar;
