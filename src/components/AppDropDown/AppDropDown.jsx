import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const AppDropDown = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const banks = [
    "Guaranty Trust Bank (GTBank)",
    "Access Bank",
    "First Bank of Nigeria",
    "United Bank for Africa (UBA)",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Dropdown toggle button */}

      <span className="inline-block font-montserrat">
        Recipient’s Bank Name
      </span>
      <button
        className={
          `bg-[#F5F5F5] flex items-center justify-between text-[#A5A5A5] text-left pl-5 py-2 h-[52px] w-full rounded-[15px] border-[#CACACA] border-[1px] focus:outline-none
} ` + className
        }
        onClick={toggleDropdown}
      >
        <span className="text-[13px] text-[#000]">
          {selectedOption ? selectedOption : "Choose a bank name"}
        </span>
        <FaChevronDown className="mr-5" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute w-full mt-1 py-2 h-[160px] overflow-y-auto bg-[#CACACA] border border-gray-200 rounded-md shadow-lg">
          {/* Dropdown options */}

          {banks.map((item, index) => {
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
