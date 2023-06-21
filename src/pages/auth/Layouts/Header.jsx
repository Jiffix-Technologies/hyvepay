import React from "react";
import NotificationIcon from "../../../assets/svgs/vuesax/linear/notification-bing.svg";
import BackIcon from "../../../assets/svgs/back.svg";
import MenuIcon from "../../../assets/svgs/menu.svg";
import settings from "../../../assets/images/settings.png";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  let name = "David,";
  let workshop = "Demo workshop";

  const [author, setAuthor] = React.useState("");
  const [sidebar, toggleSidebar] = React.useState(false);
  const closeSidebar = () => toggleSidebar(!sidebar);

  const trim = (name, workshop) => {
    let text = name + ", " + workshop;
    return text.substring(0, text.length - 8) + "...";
  };

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
          <button className="">
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
        </div>
      </div>
    </>
  );
};

export default Header;
