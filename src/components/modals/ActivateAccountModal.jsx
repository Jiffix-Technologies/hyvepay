import React from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";
import AppInput from "../AppInput/AppInput";
import UploadBox from "../UploadBox/UploadBox";

const ActivateAccountModal = ({
  modal = false,
  closeModal,
  activation,
  setModal,
}) => {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = (e) => {
    if (e.target.id === "modalWrapperId") {
      setModal(!modal);
    }
  };

  return (
    <>
      {modal && (
        <div
          id="modalWrapperId"
          className="fixed top-0 inset-0 bg-black bg-opacity-70 flex justify-center items-center customModal"
          onClick={toggleModal}
        >
          <div className="bg-white p-2 relative h-[90%] w-[90%] md:w-[30%] overflow-y-auto  rounded-md">
            <img
              src={CloseIcon}
              alt=""
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => setModal(false)}
            />
            <div className="">
              <div className=" flex flex-col mt-4 justify-center items-center px-4 md:px-10">
                <div className="text-center mb-8 mt-5">
                  <h5 className="font-semibold font-montserrat">
                    Activate Account
                  </h5>
                  <p className="text-[14px] font-extralight font-montserrat leading-5">
                    Provide the information below to activate your account.
                    Thank you!
                  </p>
                </div>
                <div className="w-full">
                  <AppInput
                    hasPLaceHolder={true}
                    placeholder="Enter business name"
                    placeholderTop="Business Name"
                    className="bg-[#F5F5F5]"
                  />
                </div>

                <UploadBox title="Valid Identity Card (Front)" />
                <UploadBox title="Valid Identity Card (Back)" />
                <UploadBox title="CAC Document" />
                <div className="w-full">
                  <AppInput
                    hasPLaceHolder={true}
                    placeholder="Enter NIN"
                    placeholderTop="National Identity Number(NIN)"
                    className="bg-[#F5F5F5]"
                  />
                </div>
                <div className="w-full">
                  <AppInput
                    hasPLaceHolder={true}
                    placeholder="Enter BVN"
                    placeholderTop="BVN"
                    className="bg-[#F5F5F5]"
                  />
                </div>

                {/* <div className="w-full mb-1 md:mb-1">
                  <label htmlFor="" className="font-montserrat">
                    {" "}
                    Valid Identity Card (Back)
                  </label>{" "}
                  <br />
                  <div className="mt-1">
                    <label className="custom-file-upload w-25 font-montserrat">
                      <input type="file" />
                      Drop your file here, or{" "}
                      <span className="primary-color font-montserrat">
                        Browse
                      </span>
                    </label>
                  </div>
                </div> */}

                {/* <div className="w-full mb-1 md:mb-1">
                  <label htmlFor="" className="font-montserrat">
                    {" "}
                    CAC Document
                  </label>{" "}
                  <br />
                  <div className="mt-1">
                    <label class="custom-file-upload w-25">
                      <input type="file" />
                      Drop your file here, or{" "}
                      <span className="primary-color font-montserrat">
                        Browse
                      </span>
                    </label>
                  </div>
                </div> */}

                {/* <div className="w-full mb-1 md:mb-1">
                  <label htmlFor="" className="font-montserrat">
                    {" "}
                    National Identity Number(NIN)
                  </label>{" "}
                  <br />
                  <input
                    type="number"
                    placeholder="Enter NIN"
                    className="bg-gray-100 w-full sm"
                    style={{ border: 0 }}
                  />
                </div> */}

                {/* <div className="w-full mb-1 md:mb-2">
                  <label htmlFor="" className="font-montserrat">
                    BVN
                  </label>{" "}
                  <br />
                  <input
                    type="number"
                    placeholder="Enter BVN"
                    className="bg-gray-100 w-full sm"
                    style={{ border: 0 }}
                  />
                </div> */}

                <AppBtn
                  title="Activate"
                  className="bg-[#FAA21B] text-[#000] w-full my-5"
                  onClick={() => activation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivateAccountModal;
