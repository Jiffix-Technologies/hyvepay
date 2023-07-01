import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../pages/auth/Layouts/Header";
import Sidebar from "../pages/auth/Layouts/Sidebar";

const Auth = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="w-full">
          <Header />
          <div className="px-4 md:px-8 ml-0 md:ml-[20%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
