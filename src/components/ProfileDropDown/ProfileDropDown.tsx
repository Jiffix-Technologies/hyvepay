import React, { useEffect, useRef } from "react";
import UserIcon from "../../assets/svgs/user.svg";
import SettingIcon from "../../assets/svgs/setting-2.svg";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropDown = ({ setOpen, open }: any) => {
  const navigate = useNavigate();

  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <ul
      className="author-dropdown flex absolute right-9 top-16 flex-col gap-5 pt-4 rounded-xl bg-white shadow p-2"
      ref={dropdownRef}
    >
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

      {/* <li
        onClick={() => {
          navigate("/settings");
          setOpen(!open);
        }}
        className="flex gap-2 text-sm cursor-pointer"
      >
        <img src={SettingIcon} alt="" style={{ width: 20 }} />
        Settings
      </li> */}
    </ul>
  );
};

export default ProfileDropDown;
