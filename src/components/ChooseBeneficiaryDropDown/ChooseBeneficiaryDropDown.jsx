import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import user from "../../assets/images/user.png";

const ChooseBeneficiaryDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const banks = [
    "Beneficiary 1  //  GTBank  //  05347823",
    "Beneficiary 2  //  GTBank  //  05347823",
    "Third Beneficiary  //  GTBank  //  05347823",
    "Beneficiary 4  //  GTBank  //  05347823",
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
      <button
        className="bg-[#F5F5F5] flex items-center justify-center text-[#A5A5A5] text-left pl-5 py-2 h-[53px] w-full rounded-[15px] border-[#CACACA] border-[1px] focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className="text-[13px]">
          {selectedOption ? selectedOption : "Choose Beneficiary"}
        </span>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute  custom-dropdown-container w-[70%] z-50 mt-1 py-2 h-[200px] overflow-y-auto bg-[#CACACA] border border-gray-200 rounded-[25px] shadow-lg">
          {/* Dropdown options */}

          {banks.map((item, index) => {
            return (
              <div className="flex items-center ml-5 mb-3 cursor-pointer ">
                <img src={user} alt="" className="w-[20px] h-[20px]" />
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-800 text-left focus:outline-none font-montserrat"
                  onClick={() => handleOptionSelect(item)}
                >
                  {item}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChooseBeneficiaryDropDown;
