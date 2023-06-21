import React, { useState } from "react";
import Tab from "../../../components/Dashboard/Tab";
import Logo from "../../../assets/svgs/logo.svg";
import hyvePay from "../../../assets/images/hyvePay.png";
import ArrowCircleLeft from "../../../assets/svgs/arrowcircleleft.svg";
import { sidebarItems } from "../../../contsants/sidebar";
import { Link } from "react-router-dom";
("");

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <>
      <div
        className={
          "md:w-2/5 h-screen sticky  top-0 hidden md:block overflow-y-scroll"
        }
        style={{
          backgroundColor: "#494949",
          minWidth: "max-content",
          maxWidth: "max-content",
          overflow: "visible",
        }}
      >
        <div className="px-8 flex gap-4 mt-4 mb-8 items-center text-white">
          <img src={hyvePay} alt="" style={{ height: 50 }} />
          {!collapse && (
            <h5 className="heading-five font-montserrat">HyvePay</h5>
          )}
        </div>

        <button
          onClick={() => setCollapse(!collapse)}
          className="collapse-toggle hidden md:block"
        >
          <img
            src={ArrowCircleLeft}
            alt=""
            className={collapse && "rotate-180"}
          />
        </button>

        <div className="mt-14">
          {sidebarItems.map((item, index) => {
            return (
              <Link to={item.path} onClick={() => setSelected(index)}>
                <div
                  className={
                    selected === index
                      ? "py-4 px-8 tab active text-white flex gap-4 font-montserrat"
                      : "py-4 px-8 tab text-white flex gap-4 font-montserrat"
                  }
                >
                  <img src={item.icon} alt="" />
                  <span>{item.name}</span>

                  {/* {!collapse && name} */}
                </div>
              </Link>
            );
          })}

          <div className="absolute bottom-0 w-full ">
            <Tab name={"Logout"} link={"/logout"} collapse={collapse} />
          </div>
        </div>

        {/* <Tab name={"Dashboard"} link={"/dashboard"} collapse={collapse} />
            <Tab name={"Customers"} link={"/customers"} collapse={collapse} />
            <Tab name={"HyvePay"} link={"/hyvepay"} collapse={collapse} />
            <Tab name={"Items & Inventory"} link={"/items&inventory"} collapse={collapse} />
            <Tab name={"Service Reminder"} link={"/service-reminder"} collapse={collapse} />
            <Tab name={"Estimates"} link={"/estimates"} collapse={collapse} />
            <Tab name={"Invoices"} link={"/invoices"} collapse={collapse} />
            <Tab name={"Payments"} link={"/payments"} collapse={collapse} />
            <Tab name={"Expenses"} link={"/expenses"} collapse={collapse} />
            <hr />
            <Tab name={"Logout"} link={"/logout"} collapse={collapse} /> */}
      </div>
    </>
  );
};

export default Sidebar;
