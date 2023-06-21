import React from "react";
import CloseIcon from "../../assets/svgs/close-circle.svg";
import AppBtn from "../AppBtn/AppBtn";

const ActivateModal = ({ modal = false, closeModal, activation, setModal }) => {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <div
          className="overlay h-screen w-screen flex fixed justify-center items-center"
          onClick={toggleModal}
        >
          <div
            className="modal h-screen overflow-y-auto  bg-white py-5 px-3"
            style={{ maxWidth: "30%" }}
          >
            <div className="modal-header pt-0 bg-white px-8">
              <div className="flex justify-end w-full">
                <button onClick={() => closeModal()}>
                  <img src={CloseIcon} alt="" />
                </button>
              </div>

              <div>
                <h5 className="text-center heading-five font-montserrat">
                  Activate Account
                </h5>
                <h5 className="text-center text-sm gray-color font-montserrat">
                  Provide the information below to activate your account. Thank
                  you!
                </h5>
                {/* </div> */}
              </div>
            </div>
            <div className="body">
              {/* view */}

              <div className=" flex flex-col mt-4 justify-center items-center px-4 md:px-10">
                <div className="w-full mb-1 md:mb-3">
                  <label className="text-sm font-montserrat" htmlFor="">
                    {" "}
                    Business Name
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    placeholder="Enter business name"
                    className="bg-gray-100 w-full sm"
                    style={{ border: 0 }}
                  />
                </div>

                <div className="w-full mb-1 md:mb-1">
                  <label htmlFor="" className="font-montserrat">
                    {" "}
                    Valid Identity Card (Front)
                  </label>{" "}
                  <br />
                  <div className="mt-1">
                    <label class="custom-file-upload w-25 font-montserrat">
                      <input type="file" />
                      Drop your file here, or{" "}
                      <span className="primary-color">Browse</span>
                    </label>
                  </div>
                </div>

                <div className="w-full mb-1 md:mb-1">
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
                </div>

                <div className="w-full mb-1 md:mb-1">
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
                </div>

                <div className="w-full mb-1 md:mb-1">
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
                </div>

                <div className="w-full mb-1 md:mb-2">
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
                </div>

                <AppBtn
                  title="Activate"
                  className="bg-[#FAA21B] text-[#000] w-full mt-5"
                  onClick={() => activation()}
                />

                {/* <div className="form-group w-full justify-center">
                  <button
                    onClick={() => activation()}
                    className="btn btn-primary uppercase font-bold w-full"
                  >
                    Activate
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivateModal;
