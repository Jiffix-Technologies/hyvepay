import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "../../components/Dashboard/Card";
import SearchIcon from "../../assets/svgs/vuesax/linear/search-normal.svg";
import DownloadIcon from "../../assets/svgs/download-icon.svg";
import DocumentIcon from "../../assets/svgs/document.svg";
import AppBtn from "../../components/AppBtn/AppBtn";
import ActivateAccountModal from "../../components/modals/ActivateAccountModal";
import CustomModal from "../../components/modals/CustomModal";
import CustomDatePickerModal from "../../components/modals/CustomDatePickerModal";
import AppTabBtn from "../../components/AppTabBtn/AppTabBtn";

const Hyvepay = () => {
  const [accountDetails, showAccountDetails] = useState(false);
  const [activate, setActivate] = useState(false);
  const [headerText, setHeaderText] = useState(0);
  const [openDate, setOpenDate] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigation = useNavigate();

  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(!modal);
  const activation = () => {
    setActivate(!activate);
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal]);

  useEffect(() => {
    if (openDate) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDate]);

  return (
    <>
      <div className="mb-20 mt-20 md:mt-32 w-full">
        <div className="flex justify-between items-center  flex-col md:flex-row">
          <h5 className="font-semibold font-montserrat md:mb-0 mb-10 flex-1">
            Account Information
          </h5>

          <div className="flex gap-4  item-wrapper flex-col md:flex-row bg">
            <AppTabBtn
              title="Activate Account"
              className="bg-[#FAA21B] text-[#000] "
              onClick={() => setModal(!modal)}
            />
            <AppTabBtn
              title=" Initiate Transaction"
              className="  text-[#000] btn-secondary"
              onClick={() => navigation("/hyvepay/initiate-transaction")}
            />
            <div className="">
              <AppTabBtn
                title="View Account Details"
                className="  text-[#000] btn-secondary"
                onClick={() => showAccountDetails(!accountDetails)}
              />

              {accountDetails && (
                <div className="account-dropdown w-full flex w flex-col justify-center items-center px-8 mt-4 p-6">
                  <div className="w-full">
                    <h5 className="font-bold text-left ">Account Details</h5>
                  </div>

                  <div className="flex justify-between w-full mt-6">
                    <div>
                      <p>
                        <span className="text-sm mr-2 mb-0 font-montserrat">
                          Account Number
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2 font-montserrat">
                          $9,700
                        </span>
                      </p>
                    </div>
                    <img src={DocumentIcon} alt="" className="cursor-pointer" />
                  </div>

                  <div className="flex justify-between w-full mt-6">
                    <div>
                      <p>
                        <span className="text-sm mr-2 mb-0 font-montserrat">
                          Account Name
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2 font-montserrat">
                          David James
                        </span>
                      </p>
                    </div>
                    <img src={DocumentIcon} alt="" className="cursor-pointer" />
                  </div>

                  <div className="flex justify-between w-full mt-6">
                    <div>
                      <p>
                        <span className="text-sm mr-2 mb-0 font-montserrat">
                          Bank Name
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2 font-montserrat">
                          Fidelity Bank
                        </span>
                      </p>
                    </div>
                    <img src={DocumentIcon} alt="" className="cursor-pointer" />
                  </div>

                  <AppBtn
                    onClick={() => navigation("/hyvepay/saved-beneficiaries")}
                    title=" View saved beneficiaries"
                    className="btn-secondary mt-4 "
                  />

                  {/* <Link
                    to={"/hyvepay/saved-beneficiaries"}
                    className="btn btn-secondary mt-4 font-montserrat"
                  ></Link> */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 overflow-x-scroll mt-10">
          <Card
            name={"Available Balance"}
            price={"0.00"}
            qty={""}
            color={"#FFF2DD"}
          />
          <Card
            name={"Total Credit"}
            price={"0.00"}
            qty={"2"}
            color={"#F1F3FF"}
          />
          <Card
            name={"Total Debit"}
            price={"0.00"}
            qty={"1"}
            color={"#FFEDED"}
          />
        </div>

        <h5 className="heading-five font-montserrat">Transaction History</h5>

        <div className="flex justify-between mt-8 flex-wrap items-center">
          <div className="search w-full md:w-2/4 mb-3">
            <form action="">
              <div className="prepend">
                <img src={SearchIcon} alt="" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 w-full md:w-2/3 searchInput"
                  style={{ border: 0 }}
                />
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="btn btn-secondary font-montserrat"
              onClick={() => setOpenDate(true)}
            >
              Start Date
            </button>
            -
            <button
              className="btn btn-secondary font-montserrat"
              onClick={() => setOpenDate(true)}
            >
              End Date
            </button>
          </div>
        </div>

        <div className="mt-4" style={{ overflowX: "scroll" }}>
          <table border={1} style={{ borderRadius: 20, overflow: "clip" }}>
            <thead>
              <th className="font-montserrat    text-xs">Date</th>
              <th className="font-montserrat    text-xs ">Account Name</th>
              <th className="font-montserrat      text-xs ">Account Number</th>
              <th className="font-montserrat     text-xs ">Amount</th>
              <th className="font-montserrat    text-xs ">Balance</th>
              <th className="font-montserrat   text-xs ">Narration</th>
              <th className="font-montserrat  text-xs ">Type</th>
              <th className="font-montserrat text-xs ">Status</th>
            </thead>
            <tbody>
              <tr>
                <td className="font-montserrat text-xs">07-06-2023</td>
                <td className="font-montserrat text-xs">David James</td>
                <td className="font-montserrat text-xs">7593542382</td>
                <td className="font-montserrat text-xs">₦50,000</td>
                <td className="font-montserrat text-xs">₦900,000</td>
                <td className="font-montserrat text-xs">N/A</td>
                <td className="font-montserrat text-xs">Transfer</td>
                <td>
                  <span
                    className="py-2 px-4"
                    style={{ backgroundColor: "#FF8282", borderRadius: 10 }}
                  >
                    Failed
                  </span>
                </td>
              </tr>

              <tr>
                <td className="font-montserrat text-xs">06-06-2023</td>
                <td className="font-montserrat text-xs">Ayo Testa</td>
                <td className="font-montserrat text-xs">0024784244</td>
                <td className="font-montserrat text-xs">₦457,900</td>
                <td className="font-montserrat text-xs">₦1,342,100</td>
                <td className="font-montserrat text-xs">N/A</td>
                <td className="font-montserrat text-xs">Transfer</td>
                <td>
                  <span
                    className="py-2 px-4 bg-primary"
                    style={{ borderRadius: 10 }}
                  >
                    Successful
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button className="flex gap-1 btn btn-secondary">
              <img src={DownloadIcon} className="mr-3 font-montserrat" alt="" />
              Download Statement
            </button>
          </div>
        </div>
      </div>

      <ActivateAccountModal
        modal={modal}
        setModal={setModal}
        closeModal={closeModal}
        activation={activation}
      />

      <CustomDatePickerModal openDate={openDate} setOpenDate={setOpenDate} />
    </>
  );
};

export default Hyvepay;
