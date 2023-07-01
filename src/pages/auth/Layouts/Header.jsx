import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotificationIcon from "../../../assets/svgs/vuesax/linear/notification-bing.svg";
import BackIcon from "../../../assets/svgs/back.svg";
import MenuIcon from "../../../assets/svgs/menu.svg";
import settings from "../../../assets/images/settings.png";
import MobileSidebar from "./MobileSidebar";
import UserIcon from "../../../assets/svgs/user.svg";
import SettingIcon from "../../../assets/svgs/Setting-2.svg";
import ProfileDropDown from "../../../components/ProfileDropDown/ProfileDropDown";

const Header = () => {
  let name = "David,";
  let workshop = "Demo workshop";

  const [open, setOpen] = useState(false);
  const [sidebar, toggleSidebar] = useState(false);
  const closeSidebar = () => toggleSidebar(!sidebar);

  return (
    <>
      <MobileSidebar toggle={sidebar} closeSidebar={closeSidebar} />
      <div
        className="flex items-center ml-[0%] md:ml-[17.5%] justify-between px-10 pr-5 md:pr-72 fixed w-full header py-5"
        style={{ zIndex: 4000 }}
      >
        <div className="hidden md:block">
          <button
            className="flex gap-4 items-center "
            onClick={() => window.history.back()}
          >
            <img src={BackIcon} className="" alt="" style={{ height: 20 }} />
            <img
              src={MenuIcon}
              className="md:hidden"
              alt=""
              style={{ height: 20 }}
            />

            <h5 className="heading-five font-montserrat">HyvePay</h5>
          </button>
        </div>
        <div className="md:hidden">
          <button
            className="flex gap-4 items-center"
            onClick={() => toggleSidebar(!sidebar)}
          >
            <img src={MenuIcon} className="" alt="" style={{ height: 20 }} />

            <h5 className="heading-five hidden md:block">HyvePay</h5>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button>
            <img src={NotificationIcon} alt="" style={{ height: 24 }} />
          </button>
          |
          <div className="">
            <button className="" onClick={() => setOpen(!open)}>
              <div className="flex  items-center gap-2">
                <span>{name}</span>
                <span>{workshop}</span>
                <img src={settings} alt="" className="w-[30px] h-[30px]" />
              </div>
            </button>

            {open && <ProfileDropDown setOpen={setOpen} open={open} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
