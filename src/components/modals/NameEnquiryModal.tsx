import React, { useEffect } from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import { clearBulkAccountHolder, clearPerformBulkAccountEnquiryStatus, saveBulkAccountTransferInfo } from "../../reducers/bankReducer";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import AppBtn from "../AppBtn/AppBtn";

function NameEnquiryModal ({nameEnquiry, setNameEnquiry, inputValues, setConfirmationmodal}: any) {

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.bankReducer);
    //@ts-ignore
    const beneficiaries = state.bulkAccountHolder?.data.beneficiaries

    const handleCloseModal = () => {
        setNameEnquiry(false)
        dispatch(clearBulkAccountHolder())
    }

    const handleTransfer = () => {
        dispatch(saveBulkAccountTransferInfo(Object.values(inputValues)));
        setNameEnquiry(false)
        dispatch(clearBulkAccountHolder())
        setConfirmationmodal(true)
    }

    useEffect(() => {
        if(state.performBulkAccountEnquiryStatus === 'completed') {
            dispatch(clearPerformBulkAccountEnquiryStatus())
          }
    },[state.performBulkAccountEnquiryStatus])

    return (
        <React.Fragment>
            {nameEnquiry && <div
                id="modalWrapperId"
                className="fixed top-0 inset-0 bg-black bg-opacity-70 flex justify-center items-center customModal"
                // onClick={toggleModal}
            >
                <div
                    className="bg-white p-2 relative w-[90%] md:w-[50%] xs:w-[30%] overflow-y-auto pb-5 xs:pb-2 xs:h-[80%] rounded-md"
                    style={{ maxWidth: 600 }}
                >
                    <div className="body">

                        <div className="flex justify-end w-full">
                            <button onClick={handleCloseModal}>
                                <img src={CloseIcon} alt="" />
                            </button>
                        </div>
                        <div>
                            <h5 className="text-center heading-five mb-5">
                                Name Enquiry
                            </h5>
                        </div>

                        <div className="mt-4" style={{ overflowX: "scroll" }}>
                            <table border={1} style={{ borderRadius: 20, overflow: "clip" }} >
                                <thead>
                                    <th className="font-montserrat text-xs ">S/NO</th>
                                    <th className="font-montserrat text-xs">Account Number</th>
                                    <th className="font-montserrat text-xs ">Account Name</th>
                                </thead>
                                <tbody>
                            
                                {beneficiaries.map((item: any, i: any) => (
                                    <tr key={i}>
                                        <td className="font-montserrat text-xs text-center" style={{ whiteSpace: "nowrap" }}>
                                            {i + 1}
                                        </td>

                                        <td className="font-montserrat text-xs text-center">
                                            {item.accountNumber}
                                        </td>

                                        <td className="font-montserrat text-xs text-center">
                                            {item.accountName}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                    </div>

                    <div
                        className="flex justify-center"
                    >
                        <AppBtn
                            title="Send Money"
                            className="text-[#000] w-[86%] bg-[#FAA21B] mt-2"
                            onClick={handleTransfer}
                            // disabled={inputValues === []}
                            // spinner={state.performBulkAccountEnquiryStatus === "loading"}
                        />
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

export default NameEnquiryModal;