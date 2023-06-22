import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Dashboard/Card";
import SearchIcon from "../../assets/svgs/vuesax/linear/search-normal.svg";
import DownloadIcon from "../../assets/svgs/download-icon.svg";
import DocumentIcon from "../../assets/svgs/document.svg";
import ActivateModal from "../../components/Dashboard/ActivateModal";
import AppBtn from "../../components/AppBtn/AppBtn";
import ActivateAccountModal from "../../components/modals/ActivateAccountModal";
import CustomModal from "../../components/modals/CustomModal";
import CustomDatePickerModal from "../../components/modals/CustomDatePickerModal";
const Hyvepay = () => {
  const [accountDetails, showAccountDetails] = useState(false);
  const [activate, setActivate] = useState(false);
  const [headerText, setHeaderText] = useState(0);
  const [openDate, setOpenDate] = useState(false);

  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(!modal); //close modal
  const activation = () => {
    setActivate(!activate); //start activation
    setModal(!modal);
  };

  useEffect(() => {
    // Disable scrolling on the background when the modal is open
    if (modal) {
      document.body.style.overflow = "hidden";
    }

    // Enable scrolling on the background when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal]);

  useEffect(() => {
    // Disable scrolling on the background when the modal is open
    if (openDate) {
      document.body.style.overflow = "hidden";
    }

    // Enable scrolling on the background when the modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDate]);

  console.log(openDate);

  return (
    <>
      <div className="mb-20 mt-24">
        <div className="flex justify-between flex-wrap items-center mt-10 my-4">
          <h5 className="heading-five font-montserrat">Account Information</h5>

          <div className="flex flex-col md:flex-row  mt-3 md:mt-0 gap-4 account-information">
            <AppBtn
              title="Activate Account"
              className="bg-[#FAA21B] text-[#000]"
              onClick={() => setModal(!modal)}
            />

            <Link
              to="/hyvepay/initiate-transaction"
              style={{ minWidth: "max-content", height: "max-content" }}
              className="btn btn-secondary text-sm text-center font-montserrat text-[16px]"
            >
              Initiate Transaction
            </Link>

            <div className="relative">
              <button
                onClick={() => showAccountDetails(!accountDetails)}
                style={{ minWidth: "max-content", height: "max-content" }}
                className="btn btn-secondary text-sm w-full font-montserrat text-[16px]"
              >
                View Account Details
              </button>
              {accountDetails && (
                <div
                  className="account-dropdown flex w-full flex-col justify-center items-center px-8 mt-4 p-6"
                  style={{ width: 300 }}
                >
                  <div className="w-full">
                    <h5 className="font-bold text-left ">Account Details</h5>
                  </div>

                  <div className="flex justify-between w-full mt-6">
                    <div>
                      <p>
                        <span className="text-sm mr-2 mb-0">
                          Account Number
                        </span>
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2">$9,700</span>
                      </p>
                    </div>
                    <img src={DocumentIcon} alt="" />
                  </div>

                  <div className="flex justify-between w-full mt-6">
                    <div>
                      <p>
                        <span className="text-sm mr-2 mb-0">Account Name</span>
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2">
                          David James
                        </span>
                      </p>
                    </div>
                    <img src={DocumentIcon} alt="" />
                  </div>

                  <div className="flex justify-between w-full mt-6">
                    <div>
                      <p>
                        <span className="text-sm mr-2 mb-0">Bank Name</span>
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2">
                          Fidelity Bank
                        </span>
                      </p>
                    </div>
                    <img src={DocumentIcon} alt="" />
                  </div>

                  <Link
                    to={"/hyvepay/saved-beneficiaries"}
                    className="btn btn-secondary mt-4"
                  >
                    View saved beneficiaries
                  </Link>
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
              <th className="font-montserrat">Date</th>
              <th className="font-montserrat">Account Name</th>
              <th className="font-montserrat">Account Number</th>
              <th className="font-montserrat">Amount</th>
              <th className="font-montserrat">Balance</th>
              <th className="font-montserrat">Narration</th>
              <th className="font-montserrat">Type</th>
              <th className="font-montserrat">Status</th>
            </thead>
            <tbody>
              <tr>
                <td className="font-montserrat">07-06-2023</td>
                <td className="font-montserrat">David James</td>
                <td className="font-montserrat">7593542382</td>
                <td className="font-montserrat">₦50,000</td>
                <td className="font-montserrat">₦900,000</td>
                <td className="font-montserrat">N/A</td>
                <td className="font-montserrat">Transfer</td>
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
                <td className="font-montserrat">06-06-2023</td>
                <td className="font-montserrat">Ayo Testa</td>
                <td className="font-montserrat">0024784244</td>
                <td className="font-montserrat">₦457,900</td>
                <td className="font-montserrat">₦1,342,100</td>
                <td className="font-montserrat">N/A</td>
                <td className="font-montserrat">Transfer</td>
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
