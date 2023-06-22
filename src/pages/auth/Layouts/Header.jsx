import React from "react";
import { Link } from "react-router-dom";
import NotificationIcon from "../../../assets/svgs/vuesax/linear/notification-bing.svg";
import BackIcon from "../../../assets/svgs/back.svg";
import MenuIcon from "../../../assets/svgs/menu.svg";
import settings from "../../../assets/images/settings.png";
import MobileSidebar from "./MobileSidebar";
import UserIcon from "../../../assets/svgs/user.svg";

const Header = () => {
  let name = "David,";
  let workshop = "Demo workshop";

  const [authorDropdown, setAuthorDropdown] = React.useState("");
  const [sidebar, toggleSidebar] = React.useState(false);
  const closeSidebar = () => toggleSidebar(!sidebar);

  // const trim = (name, workshop) => {
  //   let text = name + ", " + workshop;
  //   return text.substring(0, text.length - 8) + "...";
  // };

  return (
    <>
      <MobileSidebar toggle={sidebar} closeSidebar={closeSidebar} />
      <div
        className="flex items-center justify-between fixed w-full header py-5 px-4 md:px-8 md:pr-72"
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

            {}

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
            <button
              className=""
              onClick={() => setAuthorDropdown(!authorDropdown)}
            >
              <div className="flex  items-center gap-2">
                <span>{name}</span>
                <span>{workshop}</span>
                <img src={settings} alt="" className="w-[30px] h-[30px]" />
                {/* {window.outerWidth < 768
                  ? trim(name, workshop)
                  : name + ", " + workshop}

                <img src={settings} alt="" className="w-[30px] h-[30px]" /> */}
                {/* <img src={NotificationIcon} alt="" /> */}
              </div>
            </button>

            {authorDropdown && (
              <ul className="author-dropdown rounded-xl bg-white shadow p-2">
                <li>
                  <Link to={"#"} className="flex gap-2">
                    <img src={UserIcon} alt="" style={{ width: 20 }} />
                    Profile
                  </Link>
                </li>

                <li>
                  <Link to={"/settings"} className="flex gap-2">
                    <img src={SettingIcon} alt="" style={{ width: 20 }} />
                    Settings
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
