import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Dashboard/Card";
import SearchIcon from "../../assets/svgs/vuesax/linear/search-normal.svg";
import DownloadIcon from "../../assets/svgs/download-icon.svg";
import DocumentIcon from "../../assets/svgs/document.svg";
import AppBtn from "../../components/AppBtn/AppBtn";
import ActivateAccountModal from "../../components/modals/ActivateAccountModal";
import TransactionReceiptModal from "../../components/modals/TransactionReceiptModal";
import CustomModal from "../../components/modals/CustomModal";
import CustomDatePickerModal from "../../components/modals/CustomDatePickerModal";
import AppTabBtn from "../../components/AppTabBtn/AppTabBtn";
import AppCalender from "../../components/AppCalender/AppCalender";
import AppCalenderEnd from "../../components/AppCalender/AppCalenderEnd";
import { format, addDays } from "date-fns";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  getAccountBalanceAction,
  getAccountTransactionsAction,
} from "../../reducers/bankReducer";
import useAppSelector from "../../hooks/useAppSelector";
import { Util } from "../../helpers/Util";
import { postingType } from "../../contsants";
import { useUser } from "../../hooks/useUser";
import moment from "moment";
import { showMessage } from "../../helpers/notification";
import Search from "../../components/FilterSearch/Search";
import ActivateIndividualAccountModal from "../../components/modals/ActivateIndividualAccountModal";

const Hyvepay = () => {
  const [accountDetails, showAccountDetails] = useState(false);
  const [activate, setActivate] = useState(false);
  const [headerText, setHeaderText] = useState(0);
  const [openDate, setOpenDate] = useState(false);
  const [copied, setCopied] = useState(false);
  const [calender, setCalender] = useState("");
  const [calenderEnd, setCalenderEnd] = useState("");
  const [openStart, setOpenStart] = useState(false);

  const state = useAppSelector((state) => state.authReducer);

  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showIndividualAccountModal, setShowIndividualAccountModal] = useState(false);

  const dispatch = useAppDispatch();

  const bankState = useAppSelector((state) => state.bankReducer);

  const getUserAccountBalance = useCallback(() => {
    dispatch(getAccountBalanceAction());
  }, []);

  const getUserAccountTransaction = useCallback(() => {
    dispatch(getAccountTransactionsAction());
  }, []);

  useEffect(() => {
    getUserAccountBalance();
    getUserAccountTransaction();
  }, [getUserAccountBalance, getUserAccountTransaction]);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [openEnd, setOpenEnd] = useState(false);
  const refOne = useRef<any>(null);
  const navigation = useNavigate();

  const [modal, setModal] = useState(false);
  const closeModal = () => setModal(!modal);

  const hideOnClickOutside = (e: any) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpenStart(false);
      showAccountDetails(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

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

  const handleExport = () => {
    const headers = [
      "Date",
      "beneficiaryName",
      "amount",
      "balanceAfter",
      "narration",
    ];
    // const titleKeys = Object.keys(
    //   bankState.transaction?.postingsHistory[0] || []
    // );
    const refinedData = [];
    refinedData.push(headers);

    (bankState.transaction?.postingsHistory || []).forEach((item) => {
      refinedData.push([
        item.realDate,
        item.beneficiaryName,
        item.amount / 100,
        item.balanceAfter / 100,
        item.narration,
        item.detailOfClosure,
      ]);
    });

    let csvContent = "";

    refinedData.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const element = document.createElement("a");
    const file = new Blob([csvContent], {
      type: "text/csv",
    });
    element.href = URL.createObjectURL(file);
    element.download = "statement.csv";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const [query, setQuery] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeSuccessModal = () => {
    setSuccessModal(!successModal);
  }


  const handleRowClick = (rowData: any) => {
    setSelectedRow(rowData);
    setShowModal(true);

  };

  const toggleModel = () => {
    setShowModal(!showModal)
  }

  const closeReceiptModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      showMessage("Successful", "Copied to ClipBoard", "success");
      setTimeout(() => setIsCopied(false), 3000); // Reset the copied status after 3 seconds
    });
  };

  return (
    <>
      <div className="mb-20 mt-20 md:mt-32 w-full">
        <div className="flex justify-between items-center  flex-col md:flex-row">
          <h5 className="font-semibold font-montserrat md:mb-0 mb-10 flex-1">
            Account Information
          </h5>

          <div className="flex gap-4  item-wrapper flex-col md:flex-row bg">
            {["DECLINED", "NOT_REQUESTED"].includes(
              state.userInfo?.partner?.accountProvisionStatus as string
            ) && (
                <AppTabBtn
                  title="Activate Account"
                  className="bg-[#FAA21B] text-[#000] "
                  onClick={() => { state.userInfo?.accountType === 'individual' 
                                  ? setShowIndividualAccountModal(true)
                                  : setShowAccountModal(true)
                          }}
                />
              )}

            {state.userInfo?.partner?.accountProvisionStatus === "APPROVED" && (
              <>
                <AppTabBtn
                  title="  Transfer"
                  className="  text-[#000] btn-secondary"
                  onClick={() => navigation("/hyvepay/transfer")}
                />
                <div className="">
                  <AppTabBtn
                    title="View Account Details"
                    className="  text-[#000] btn-secondary"
                    onClick={() => showAccountDetails(!accountDetails)}
                  />

                  {accountDetails && (
                    <div
                      className="account-dropdown z-50 w-full flex w flex-col justify-center items-center px-8 mt-4 p-6"
                      ref={refOne}
                    >
                      <div className="w-full">
                        <h5 className="font-bold text-left ">
                          Account Details
                        </h5>
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
                              {bankState.accountBalance?.accountNumber}
                            </span>
                          </p>
                        </div>
                        <button onClick={() => copyToClipboard(bankState.accountBalance?.accountNumber)}> <img
                          src={DocumentIcon}
                          alt=""
                          className="cursor-pointer"
                        />
                        </button>
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
                              {bankState.accountBalance?.businessName}
                            </span>
                          </p>
                        </div>
                        <button onClick={() => copyToClipboard(bankState.accountBalance?.businessName)}> <img
                          src={DocumentIcon}
                          alt=""
                          className="cursor-pointer"
                        /></button>
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
                              {bankState.accountBalance?.accountProvider}
                            </span>
                          </p>
                        </div>
                        <button onClick={() => copyToClipboard(bankState.accountBalance?.accountProvider)}><img
                          src={DocumentIcon}
                          alt=""
                          className="cursor-pointer"
                        />
                        </button>
                      </div>

                      <AppBtn
                        onClick={() =>
                          navigation("/hyvepay/saved-beneficiaries")
                        }
                        title=" View saved beneficiaries"
                        className="btn-secondary mt-4 "
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 overflow-x-scroll mt-10">
          <Card
            name={"Available Balance"}
            price={Util.formAmount(

              bankState.accountBalance?.availableBalance, true

            )}
            qty={""}
            color={"#FFF2DD"}
            cardName={"Balance"}
          />
          <Card
            name={"Total Credit"}
            price={Util.formAmount(bankState.transaction?.totalCredit)}
            qty={
              bankState.transaction?.postingsHistory
                ? bankState.transaction.postingsHistory.filter(
                  (item) => item.postingRecordType === postingType.credit
                ).length
                : 0
            }
            color={"#F1F3FF"}
            cardName={"Credit"}
          />
          <Card
            name={"Total Debit"}
            price={Util.formAmount(bankState.transaction?.totalDebit)}

            qty={
              bankState.transaction?.postingsHistory
                ? bankState.transaction.postingsHistory.filter(
                  (item) => item.postingRecordType === postingType.debit
                ).length
                : 0
            }
            color={"#FFEDED"}

            cardName={"Debit"} />

        </div>

        <h5 className="heading-five font-montserrat">Transaction History</h5>

        <div className="flex justify-between  mt-8 flex-wrap items-center">
          <div className="search w-full md:w-2/4 mb-3">
            <form action="">
              <div className="prepend">

                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 w-full md:w-2/3 searchInput"
                  style={{ border: 0 }}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {/* <button><img src={SearchIcon} alt="" /></button> */}
              </div>
            </form>
          </div>

          <div
            className="flex items-center mt-5 md:mt-0 mb-5 gap-4"
            ref={refOne}
          >
            <div className="relative flex flex-col">
              <span>Start Date</span>
              <button
                className="btn btn-secondary font-montserrat"
                onClick={() => setOpenStart(!openStart)}
              >
                {format(range[0].startDate, "MM/dd/yyyy")}
              </button>

              {openStart && (
                <AppCalender
                  setOpenStart={setOpenStart}
                  openStart={openStart}
                  range={range}
                  setRange={setRange}
                />
              )}
            </div>
            <span className="mt-5">-</span>

            <div className="relative flex flex-col">
              <span>End Date</span>
              <button
                className="btn btn-secondary font-montserrat"
                onClick={() => setOpenStart(!openStart)}
              >
                {format(range[0].endDate, "MM/dd/yyyy")}
              </button>
              {openEnd && (
                <AppCalenderEnd
                  calender={calenderEnd}
                  setCalender={setCalenderEnd}
                  setOpenStart={setOpenEnd}
                  openStart={openEnd}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4" style={{ overflowX: "scroll" }}>
          <table border={1} style={{ borderRadius: 20, overflow: "clip" }} >
            <thead>
              <th className="font-montserrat    text-xs">Date</th>
              <th className="font-montserrat    text-xs ">Account Name</th>
              <th className="font-montserrat     text-xs ">Amount</th>
              <th className="font-montserrat    text-xs ">Balance</th>
              <th className="font-montserrat   text-xs ">Narration</th>
              <th className="font-montserrat  text-xs ">Type</th>
              <th className="font-montserrat text-xs ">Status</th>
            </thead>
            <tbody>
              {/* {<Search data={bankState?.transaction?.postingsHistory} />} */}
              {bankState.transaction?.postingsHistory.map((item, i) => (
                <tr key={i} onClick={() => {
                  handleRowClick(item); setSuccessModal(!successModal)
                }}>
                  <td className="font-montserrat text-xs" style={{ whiteSpace: "nowrap" }}>
                    {moment(item.realDate).format("YYYY-MM-DD")}
                  </td>

                  <td className="font-montserrat text-xs">
                    {item.beneficiaryName}
                  </td>

                  <td className="font-montserrat text-xs">
                    {item.postingRecordType === postingType.credit ? (
                      <span className="text-green-600"> {Util.formAmount(item.amount, true)}</span>
                    ) : (
                      <span className="text-red-600"> {Util.formAmount(item.amount, true)}</span>
                    )}

                  </td>
                  <td className="font-montserrat text-xs">
                    {Util.formAmount(item.balanceAfter, true)}
                  </td>
                  <td className="font-montserrat text-xs">
                    {item.narration || "N/A"}
                  </td>
                  <td className="font-montserrat text-xs">
                    {item.postingRecordType === postingType.credit ? (
                      <span className="text-green-600">Credit</span>
                    ) : (
                      <span className="text-red-600">Debit</span>
                    )}
                  </td>
                  <td className="font-montserrat text-xs">
                    {bankState.getAccountTransactionStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleExport}
              className="flex gap-1 btn btn-secondary"
            >
              <img src={DownloadIcon} className="mr-3 font-montserrat" alt="" />
              Download Statement
            </button>
          </div>
        </div>
      </div >

      {successModal && (
        <TransactionReceiptModal
          successModal={successModal}
          closeSuccessModal={closeSuccessModal}
          rowData={selectedRow}

        />)
      }
      <ActivateAccountModal
        isVisible={showAccountModal}
        onCancel={() => setShowAccountModal(false)}
        onOk={() => setShowAccountModal(false)}
      />

      <ActivateIndividualAccountModal
        isVisible={showIndividualAccountModal}
        onCancel={() => setShowIndividualAccountModal(false)}
        onOk={() => setShowIndividualAccountModal(false)}
        accountName={`${state.userInfo?.firstName} ${state.userInfo?.lastName}` }
      />

      <CustomDatePickerModal openDate={openDate} setOpenDate={setOpenDate} />
    </>
  );
};


export default Hyvepay;
