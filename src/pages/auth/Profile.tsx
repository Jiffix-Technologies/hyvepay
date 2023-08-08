import React, { useEffect, useRef, useState } from "react";
import profilePicx from "../../assets/images/profilePicx.png";
import AppInput, { MyTextInput } from "../../components/AppInput/AppInput";
import AppDropDown from "../../components/AppDropDown/AppDropDown";
import AppInputWithPhone from "../../components/AppInputWithPhone/AppInputWithPhone";
import Select from "react-select";
import { stateLga } from "../../contsants/states";
import AppBtn from "../../components/AppBtn/AppBtn";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import UploadPictureModal from "../../components/modals/UploadPictureModal";
import { useUser } from "../../hooks/useUser";
import {
  Form,
  Formik,
  FormikHelpers,
  useFormik,
  useFormikContext,
} from "formik";
import axiosClient from "../../config/axiosClient";
import { showMessage } from "../../helpers/notification";
import useAppDispatch from "../../hooks/useAppDispatch";

const Profile = () => {
  const { user, getUser } = useUser();
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState(user?.partner?.contact?.district);
  const [phone, setPhone] = useState(user?.phone);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<{
    label: string;
    value: string;
  }>(Object.create({}));

  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    let stateArray: any = [];
    const newData = Object.entries(stateLga);
    newData.forEach((item, index) => {
      stateArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setState(stateArray);
  }, []);

  useEffect(() => {
    if (value != null) {
      let districtArray: any[] = [];
      const newData: any = Object.entries(stateLga).find(
        (_items) => _items[0] === value
      );

      newData[1].map((item: any, index: any) => {
        districtArray.push({
          value: item,
          label: item,
        });
      });
      setDistrict(districtArray);
    }
  }, [value]);

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    selectedState: {},
    district: user?.partner?.contact?.district || "",
    address: user?.partner?.contact?.address || "",
  });

  useEffect(() => {
    setFormData((state) => ({ ...state, firstName: user?.firstName }));
  }, [user?.firstName]);

  useEffect(() => {
    setFormData((state) => ({ ...state, lastName: user?.lastName }));
  }, [user?.lastName]);

  useEffect(() => {
    setFormData((state) => ({ ...state, phone: user?.phone }));
  }, [user?.phone]);

  useEffect(() => {
    const foundState = state.find(
      (item: any) => item.value === user?.partner?.contact?.state
    );

    if (foundState) {
      setSelectedState(foundState);

      setFormData((state) => ({ ...state, selectedState: foundState }));
    }
  }, [user?.partner?.contact?.state]);

  const handleSubmit = (payload: any) => {
    const value = { ...payload, phone };

    updateProfile(value)
      .then(function () {
        showMessage(
          "Profile Update",
          "Profile Updated Successfully",
          "success"
        );
      })
      .catch(function (err) {
        showMessage(
          "Profile Update",
          "Profile was not Updated Successfully",
          "error"
        );
      });
  };

  async function updateProfile(values: any) {
    try {
      const filteredObject = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== null && value !== ""
        )
      );

      delete filteredObject.district;

      if (filteredObject.selectedState) {
        filteredObject.state = selectedState.value;
        delete filteredObject.selectedState;
      }

      await axiosClient.patch("/api/v1/partner/profile/update", {
        ...filteredObject,
      });

      getUser();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  const customStyles = {
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "#A5A5A5",
        fontSize: "14px",
        fontWeight: 400,
        paddingLeft: "23px",
      };
    },

    control: (base: any, state: any) => ({
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
    menu: (base: any) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: (base: any) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
    }),
  };

  const hideOnClickOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
      // setIsOpenBeneficiary(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  return (
    <>
      <div className="mb-20 mt-32 h-screen px-0 md:px-20">
        <Formik
          enableReinitialize={true}
          initialValues={formData}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className=" w-[100%] md:border-[1px] rounded-3xl relative flex mt-52  px-0 md:px-20 flex-col pb-20  md:border-[#CACACA]">
              <div
                className="absolute -top-10 w-[100%] md:w-[80%] items-center justify-center text-center flex cursor-pointer"
                onClick={() => setOpenProfile(!openProfile)}
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
                    <MyTextInput
                      hasPLaceHolder={true}
                      placeholderTop="First Name"
                      placeholder="Enter your first name"
                      name="firstName"
                    />
                  </div>
                  <div className=" md:mt-5  w-full">
                    <MyTextInput
                      hasPLaceHolder={true}
                      placeholderTop="Last Name"
                      placeholder="David"
                      name="lastName"
                    />
                  </div>
                </div>

                <div className="mt-5 md:mt-5 w-full">
                  <MyTextInput
                    hasPLaceHolder={true}
                    disabled
                    placeholderTop="Email"
                    name="email"
                    value={user?.email}
                  />
                </div>

                <div className="flex gap-5 flex-col md:flex-row  justify-between">
                  <div className="mt-5 md:mt-5  w-full relative">
                    <MyTextInput
                      hasPLaceHolder={true}
                      disabled
                      placeholderTop="HyvePay Account Password"
                      placeholder="****************"
                      name="password"
                    />
                    <span
                      onClick={() => setOpenModal(!openModal)}
                      className="text-[#FAA21B] absolute cursor-pointer font-montserrat top-[85px]"
                    >
                      Change Password
                    </span>
                  </div>
                </div>

                <div className="flex gap-5 flex-col md:flex-row  justify-between">
                  <div className=" w-full mt-10 md:mt-10">
                    <AppInputWithPhone
                      placeholderTop="Phone Number*"
                      placeholder="Phone Number* (WhatsApp)"
                      hasPLaceHolder={true}
                      type="number"
                      name="phone"
                      onChange={(e: any) => {
                        setPhone(e.target.value);
                      }}
                      value={phone}
                    />
                  </div>

                  <div className="mt-0 md:mt-10 w-full">
                    <MyTextInput
                      hasPLaceHolder={true}
                      placeholderTop="Address"
                      placeholder="Enter your current address"
                      name="address"
                    />
                  </div>
                </div>

                <div className="flex justify-between flex-col md:flex-row  gap-5">
                  <div className="mt-5 md:mt-5 w-full">
                    <p className="text[10px] inline-block font-montserrat">
                      State
                    </p>
                    <Select
                      options={state} // []
                      onChange={(item: any) => {
                        setValue(item.value); // single item
                        setSelectedState(item);
                      }}
                      styles={customStyles}
                      placeholder="Choose state"
                      name="selectedState"
                      value={selectedState}
                    />
                  </div>
                  <div className="mt-5 md:mt-5 w-full">
                    <p className="text[10px] inline-block font-montserrat">
                      District
                    </p>
                    <Select
                      options={district}
                      onChange={(item: any) => {
                        setValue2(item.value);
                        setDistrict(item.value);
                      }}
                      styles={customStyles}
                      placeholder="Choose district"
                      name="district"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex md:items-end md:justify-end">
              <AppBtn
                className=" bg-[#FAA21B] w-full md:w-[100px]  text-[#000] -mt-10 md:mt-3 mb-40"
                title="SAVE"
                type="submit"
              />
            </div>
          </Form>
        </Formik>
      </div>

      <ChangePasswordModal openModal={openModal} setOpenModal={setOpenModal} />
      <UploadPictureModal
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
    </>
  );
};

export default Profile;
