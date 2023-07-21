import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import InputHeader from "../InputHeader/InputHeader";

const AppDropDown = ({
  className,
  title = "Recipient’s Bank Name",
  data = [],
  placeholder = "Choose a bank name",
  dropdownRef,
  isOpen,
  setIsOpen,
}: any) => {
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <InputHeader text={title} />

      <button
        className={
          `bg-[#F5F5F5] flex items-center justify-between text-[#A5A5A5] text-left pl-5 py-2 h-[58px] w-full rounded-[15px] border-[#CACACA] border-[1px] focus:outline-none
} ` + className
        }
        onClick={toggleDropdown}
      >
        <span className="text-[13px] text-[#000]">
          {selectedOption ? (
            selectedOption
          ) : (
            <InputHeader text={placeholder} className="text-[#A5A5A5] ml-5" />
          )}
        </span>
        <FaChevronDown className="mr-5" />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 z-50 py-2 h-[160px] overflow-y-auto bg-[#CACACA] border border-gray-200 rounded-md shadow-lg">
          {data?.map((item: any, index: any) => {
            return (
              <button
                className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 text-left focus:outline-none font-montserrat"
                onClick={() => handleOptionSelect(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppDropDown;
