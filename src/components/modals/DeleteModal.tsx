import React, { useState } from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import SuccessfulPaymentModal from "../Dashboard/SuccessfulPaymentModal";
import AppBtn from "../AppBtn/AppBtn";

const DeleteModal = ({
  deletemodal,
  setdeletemodal,
  closeDeleteModal,
  title,
  description,
}: any) => {
  const [successModal, setSuccessModal] = useState(false);

  const closeSuccessModal = () => setSuccessModal(!successModal);
  return (
    <>
      <SuccessfulPaymentModal
        successModal={successModal}
        closeSuccessModal={closeSuccessModal}
      />
      {deletemodal && (
        <div
          className="overlay h-screen w-screen flex fixed justify-center items-center"
          style={{ zIndex: 4000 }}
        >
          <div className=" rounded-md bg-white py-8 px-3">
            <div className="modal-header pt-0 bg-white px-8">
              <div className="flex justify-end w-full">
                <button onClick={() => closeDeleteModal()}>
                  <img src={CloseIcon} alt="" />
                </button>
              </div>

              <div className="flex flex-col justify-center mt-5">
                <h5 className="text-center font-semibold font-montserrat">
                  {title}
                </h5>
                <h5 className="text-center text-[10px] md:text-sm gray-color font-montserrat">
                  {/* {description} */}
                  Are you sure you want to carry out this action? <br /> If you
                  proceed, you will not be able to undo this action
                </h5>
                {/* </div> */}
              </div>
            </div>
            <div className="body">
              {/* view */}

              <div className=" flex gap-4 mt-4 justify-center items-center px-4 md:px-10">
                <button
                  onClick={() => closeDeleteModal()}
                  className="btn btn-secondary uppercase"
                >
                  Cancel
                </button>
                <button className="btn btn-primary uppercase bg-primary">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
