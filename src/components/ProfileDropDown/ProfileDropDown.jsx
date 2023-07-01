import React from "react";
import UserIcon from "../../assets/svgs/user.svg";
import SettingIcon from "../../assets/svgs/Setting-2.svg";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropDown = ({ setOpen, open }) => {
  const navigate = useNavigate();
  return (
    <ul className="author-dropdown flex absolute top-10 flex-col gap-5 pt-4 rounded-xl bg-white shadow p-2">
      <li
        className="flex gap-2 text-sm cursor-pointer"
        onClick={() => {
          navigate("/profile");
          setOpen(!open);
        }}
      >
        <img src={UserIcon} alt="" style={{ width: 20 }} />
        Profile
      </li>

      <li
        onClick={() => {
          navigate("/settings");
          setOpen(!open);
        }}
        to={"/settings"}
        className="flex gap-2 text-sm cursor-pointer"
      >
        <img src={SettingIcon} alt="" style={{ width: 20 }} />
        Settings
      </li>
    </ul>
  );
};

export default ProfileDropDown;
