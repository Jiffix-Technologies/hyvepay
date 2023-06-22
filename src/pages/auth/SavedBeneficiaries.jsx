import OptionIcon from "../../assets/svgs/option.svg";
import SearchIcon from "../../assets/svgs/vuesax/linear/search-normal.svg";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import TransactCard from "../../components/Dashboard/TransactCard";
import AppBtn from "../../components/AppBtn/AppBtn";

import React, { useState } from "react";
import AddNewBeneficiaryModal from "../../components/modals/AddNewBeneficiaryModal";
import { FaChevronLeft } from "react-icons/fa";

const SavedBeneficiaries = () => {
  const [newBeneficiary, setnewBeneficiary] = useState(false);
  return (
    <>
      <div className="w-full">
        <div className="w-full flex h-10  md:hidden items-center mt-20 mb-5 cursor-pointer">
          <FaChevronLeft onClick={() => window.history.back()} />
          <span className="font-montserrat inline-block ml-5">
            Initial Transaction
          </span>
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center md:mt-28 w-full">
            <div className="search w-[100%] md:w-2/4 ">
              <form action="">
                <div className="prepend">
                  <img src={SearchIcon} alt="" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-gray-100 w-[100%] md:w-2/3 searchInput"
                    style={{ border: 0 }}
                  />
                </div>
              </form>
            </div>

            <AppBtn
              title="Add New Beneficiary"
              onClick={() => setnewBeneficiary(!newBeneficiary)}
              className="text-[#000] w-full md:0  md:w-[25%] bg-[#FAA21B]"
            />
          </div>
        </div>

        <div className="flex justify-start gap-3 flex-wrap mt-14 ">
          <TransactCard
            name={"David James"}
            accountnum={"0578358735"}
            bankName={"Guaranty Trust Bank"}
            phone={"+234816573486"}
          />
          <TransactCard
            name={"Kabiru Josephine"}
            accountnum={"0078564356"}
            bankName={"Zenith Bank"}
            phone={"+234816573486"}
          />
          <TransactCard
            name={"David James"}
            accountnum={"0578358735"}
            bankName={"Guaranty Trust Bank"}
            phone={"+234816565486"}
          />
        </div>
      </div>

      <AddNewBeneficiaryModal
        newBeneficiary={newBeneficiary}
        setnewBeneficiary={setnewBeneficiary}
      />
    </>
  );
};

export default SavedBeneficiaries;
