import React, { useEffect, useState } from "react";
import profilePicx from "../../assets/images/profilePicx.png";
import AppInput from "../../components/AppInput/AppInput";
import AppDropDown from "../../components/AppDropDown/AppDropDown";
import AppInputWithPhone from "../../components/AppInputWithPhone/AppInputWithPhone";
import Select from "react-select";
import { stateLga } from "../../contsants/states";
import AppBtn from "../../components/AppBtn/AppBtn";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import UploadPictureModal from "../../components/modals/UploadPictureModal";

const Profile = () => {
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [opneProfile, setOpenProfile] = useState(false);
  useEffect(() => {
    let stateyArray = [];
    const newData = Object.entries(stateLga);
    newData.map((item, index) => {
      stateyArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setState(stateyArray);
  }, []);

  useEffect(() => {
    if (value != null) {
      let distrciyArray = [];
      const newData = Object.entries(stateLga).find(
        (_items) => _items[0] === value
      );

      newData[1].map((item, index) => {
        distrciyArray.push({
          value: item,
          label: item,
        });
      });
      setDistrict(distrciyArray);
    }
  }, [value]);

  const customStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#A5A5A5",
        fontSize: "14px",
        fontWeight: 400,
        paddingLeft: "23px",
      };
    },

    control: (base, state) => ({
      ...base,
      background: "#fff",
      // match with the menu
      borderRadius: "18px",
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#FAA21B" : "#CACACA",
      height: "55px",

      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#FAA21B" : "#CACACA",
      },
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  return (
    <>
      <div className="mb-20 mt-32 h-screen px-0 md:px-20">
        <div className=" w-[100%] md:border-[1px] rounded-3xl relative flex mt-52  px-0 md:px-20 flex-col pb-20  md:border-[#CACACA]">
          <div
            className="absolute -top-10 w-[100%] md:w-[80%] items-center justify-center text-center flex cursor-pointer"
            onClick={() => setOpenProfile(!opneProfile)}
          >
            <img
              src={profilePicx}
              alt=""
              className="w-[100px] h-[100px] rounded-[50%]"
            />
          </div>

          <div>
            <div className="flex flex-col md:flex-row justify-between gap-5 mt-20">
              <div className="mt-0 md:mt-5 w-full">
                <AppInput
                  hasPLaceHolder={true}
                  placeholderTop="First Name"
                  placeholder="Enter your first name"
                />
              </div>
              <div className=" md:mt-5  w-full">
                <AppInput
                  hasPLaceHolder={true}
                  placeholderTop="Last Name"
                  placeholder="David"
                />
              </div>
            </div>

            <div className="mt-5 md:mt-5 w-full">
              <AppInput
                hasPLaceHolder={true}
                placeholderTop="Email"
                placeholder="Enter your valid email address"
              />
            </div>

            <div className="flex gap-5 flex-col md:flex-row  justify-between">
              <div className="mt-5 md:mt-5  w-full relative">
                <AppInput
                  hasPLaceHolder={true}
                  placeholderTop="Password"
                  placeholder="****************"
                />
                <span
                  onClick={() => setOpenModal(!openModal)}
                  className="text-[#FAA21B] absolute cursor-pointer font-montserrat top-[85px]"
                >
                  Change Password
                </span>
              </div>

              <div className="mt-5 md:mt-5  w-full">
                <AppDropDown title="Account Type" />
              </div>
            </div>

            <div className="flex gap-5 flex-col md:flex-row  justify-between">
              <div className=" w-full mt-10 md:mt-10">
                <AppInputWithPhone
                  placeholderTop="Phone Number*"
                  placeholder="Phone Number* (WhatsApp)"
                  hasPLaceHolder={true}
                />
              </div>

              <div className="mt-0 md:mt-10 w-full">
                <AppInput
                  hasPLaceHolder={true}
                  placeholderTop="Address"
                  placeholder="Enter your current address"
                />
              </div>
            </div>

            <div className="flex justify-between flex-col md:flex-row  gap-5">
              <div className="mt-5 md:mt-5 w-full">
                <p className="text[10px] inline-block font-montserrat">State</p>
                <Select
                  options={state}
                  onChange={(item) => {
                    setValue(item.value);
                  }}
                  styles={customStyles}
                  placeholder="Choose state"
                />
              </div>
              <div className="mt-5 md:mt-5 w-full">
                <p className="text[10px] inline-block font-montserrat">
                  District
                </p>
                <Select
                  options={district}
                  styles={customStyles}
                  placeholder="Choose district"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex md:items-end md:justify-end">
          <AppBtn
            className=" bg-[#FAA21B] w-full md:w-[100px]  text-[#000] -mt-10 md:mt-3 mb-40"
            title="SAVE"
          />
        </div>
      </div>

      <ChangePasswordModal openModal={openModal} setOpenModal={setOpenModal} />
      <UploadPictureModal
        opneProfile={opneProfile}
        setOpenProfile={setOpenProfile}
      />
    </>
  );
};

export default Profile;
