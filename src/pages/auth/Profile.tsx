import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import profilePicx from "../../assets/images/profilePicx.png";
import AppBtn from "../../components/AppBtn/AppBtn";
import { MyTextInput } from "../../components/AppInput/AppInput";
import AppInputWithPhone from "../../components/AppInputWithPhone/AppInputWithPhone";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import UploadPictureModal from "../../components/modals/UploadPictureModal";
import axiosClient from "../../config/axiosClient";
import { stateLga } from "../../contsants/states";
import { showMessage } from "../../helpers/notification";
import { useUser } from "../../hooks/useUser";
import ChangeEmailModal from "../../components/modals/ChangeEmailModal";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, getUser } = useUser();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState<Record<string, string>[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openChangeEmailModal, setOpenChangeEmailModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    state: "",
    district: "",
    address: "",
  });
  const navigate = useNavigate();

  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: parsePhone(user?.partner.phone),
      state: user?.partner?.contact?.state || "",
      district: user?.partner?.contact?.district || "",
      address: user?.partner?.contact?.address || "",
    });
    handleDistrict(String(user?.partner?.contact?.state));
  }, [user]);

  useEffect(() => {
    let stateArray: any = [];
    const newData = Object.entries(stateLga);
    newData.forEach((item, index) => {
      stateArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setStates(stateArray);
  }, []);

  const handleDistrict = (value: string) => {
    if (!value) {
      return;
    }
    const newData: any = Object.entries(stateLga).find(
      (_items) => _items[0] === value
    );

    if (!newData) {
      return;
    }
    const districtArray: Record<string, string>[] = newData[1]?.map(
      (item: string) => {
        return {
          value: item,
          label: item,
        };
      }
    );
    setDistricts(districtArray);
  };

  const parsePhone = (phone: string = ""): string => {
    if (!phone) {
      return "";
    }

    if (phone.startsWith("0")) return phone.replace("0", "234");

    // return phone.replace("0", "");
    return phone;
  };

  const handleSubmit = ({ phone, ...rest }: Record<string, unknown>) => {
    const newPhone = `${phone}`.startsWith("234")
                        ? phone
                        : `${phone}`.startsWith("0")
                          ? `${phone}`.replace("0", "234")
                          : `${phone}`.replace("", "234") //`234${phone}`;
    const values = { ...rest, phone: newPhone };

    updateProfile(values)
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
      navigate('/profile')
  };

  async function updateProfile(values: any) {
    try {
      const filteredObject = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== null && value !== ""
        )
      );

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
          {({ setFieldValue, values, handleChange, handleBlur }) => (
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                    </div>
                    <div className=" md:mt-5  w-full">
                      <MyTextInput
                        hasPLaceHolder={true}
                        placeholderTop="Last Name"
                        placeholder="David"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                    </div>
                  </div>

                  <div className="mt-5 md:mt-5 w-full relative mb-10">
                    <MyTextInput
                      hasPLaceHolder={true}
                      disabled
                      placeholderTop="Email"
                      name="email"
                      value={user?.email}
                    />
                    <span
                      onClick={() => setOpenChangeEmailModal(!openChangeEmailModal)}
                      className="text-[#FAA21B] absolute cursor-pointer font-montserrat top-[85px]"
                    >
                      Change/Edit Primary Email
                    </span>
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

                  <div className="flex gap-5 flex-col md:flex-row justify-between">
                    <div className=" w-full mt-10 md:mt-10">
                      <AppInputWithPhone
                        placeholderTop="Phone Number*"
                        placeholder="Phone Number* (WhatsApp)"
                        hasPLaceHolder={true}
                        type="text"
                        name="phone"
                        onChange={(event: any) => {
                          // if (/^\d*(\.\d*)?$/.test(event?.target?.value)) {
                            console.log(event?.target?.value, 'value')
                          //   setFieldValue("phone", event?.target?.value);
                          // }
                          setFieldValue("phone", event?.target?.value);
                        }}
                        onBlur={handleBlur}
                        value={values.phone}
                      />
                    </div>

                    <div className="mt-0 md:mt-10 w-full">
                      <MyTextInput
                        hasPLaceHolder={true}
                        placeholderTop="Address"
                        placeholder="Enter your current address"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between flex-col md:flex-row  gap-5">
                    <div className="mt-5 md:mt-5 w-full">
                      <p className="text[10px] inline-block font-montserrat">
                        State
                      </p>
                      <Select
                        options={states}
                        styles={customStyles}
                        placeholder="Choose state"
                        name="state"
                        onChange={(item: any) => {
                          handleDistrict(String(item?.value));
                          setFieldValue("district", "");
                          setFieldValue("state", String(item?.value));
                        }}
                        onBlur={handleBlur}
                        value={{
                          value: values.state,
                          label: values.state,
                        }}
                      />
                    </div>
                    {/* <div className="mt-5 md:mt-5 w-full">
                      <p className="text[10px] inline-block font-montserrat">
                        District
                      </p>
                      <Select
                        options={districts}
                        onChange={(item: any) =>
                          setFieldValue("district", String(item?.value))
                        }
                        styles={customStyles}
                        placeholder="Choose district"
                        name="district"
                        value={{
                          value: values.district,
                          label: values.district,
                        }}
                      />
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="w-full flex md:items-end md:justify-end">
                <AppBtn
                  className="bg-[#FAA21B] w-full md:w-[100px] text-[#000] md:mt-10 md:mt-3 mb-40"
                  title="SAVE"
                  type="submit"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <ChangePasswordModal openModal={openModal} setOpenModal={setOpenModal} />
      <ChangeEmailModal openChangeEmailModal={openChangeEmailModal} setOpenChangeEmailModal={setOpenChangeEmailModal} />
      <UploadPictureModal
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
    </>
  );
};

export default Profile;
