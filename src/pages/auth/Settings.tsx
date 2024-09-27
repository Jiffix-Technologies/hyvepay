import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import DownloadIcon from "../../assets/svgs/download-icon.svg";
import SearchIcon from "../../assets/svgs/vuesax/linear/search-normal.svg";
import TrashIcon from "../../assets/svgs/vuesax/linear/trash.svg";
import AppBtn from "../../components/AppBtn/AppBtn";
import TabBtn from "../../components/TabBtn/TabBtn";
import AppInput, { MyTextInput } from "../../components/AppInput/AppInput";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
import { HiChevronDown } from "react-icons/hi";
import SingleSort from "../../components/SingleSort/SingleSort";
import DeleteModal from "../../components/modals/DeleteModal";
import AddRoleModal from "../../components/modals/AddRoleModal";
import AddUserModal from "../../components/modals/AddUserModal";
import ReadUserModal from "../../components/modals/ReadUserModal";
import EditRoleModal from "../../components/modals/EditRoleModal";
import AppSwitch from "../../components/AppSwitch/AppSwitch";
import { GrEdit } from "react-icons/gr";
import EditUserModal from "../../components/modals/EditUserModal";
import { Form, Formik, FormikHelpers, useFormik } from "formik";
import { showMessage } from "../../helpers/notification";
import { createPrinter } from "typescript";
import axios from "axios";

const Settings = () => {
  const [view, setView] = useState(0);
  const [deletemodal, setDeletemodal] = useState(false);
  const [addrolemodal, setAddrolemodal] = useState(false);
  const [addusermodal, setAddusermodal] = useState(false);
  const [readusermodal, setReadusermodal] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeDeleteModal = () => setDeletemodal(!deletemodal);

  const [openSort, setOpenSort] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [select, setSelect] = useState("Sort by");


  // create a createPin()
  async function createPin(formData: any) {
    try {
      const data = await axios.post("/url", formData);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //show notification

  //clear input
  // create initialValue
  const formData = {
    pin: "",
    confirmPin: "",
    password: "",
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const data = ["User & Role Management",];

  return (
    <>
      <div className="mb-20 mt-24 w-full">
        <div className="flex justify-between w-[100%] md:w-[60%] items-center mt-10 my-4 setting-tabs">
          <div className="flex items-center flex-col md:flex-row  w-[100%]  mt-3 md:mt-0 gap-4">
            {data.map((item, index) => {
              return (
                <TabBtn
                  title={item}
                  onClick={() => setView(index)}
                  key={index}
                  className={view === index ? "btn-primary" : "btn-secondary"}
                />
              );
            })}
          </div>
        </div>

        <div>
          {view == 1 && (
            <>
              {" "}
              <div className="p-5 md:p-14 hyvepay-setting rounded-3xl">
                <h5 className="font-bold font-montserrat">HyvePay Pin</h5>
                <p className="font-montserrat">
                  Please set your password for HyvePay
                </p>

                <Formik
                  enableReinitialize
                  initialValues={formData}
                  validationSchema={Yup.object().shape({
                    pin: Yup.string()
                      .required("Pin is required")
                      .min(4)
                      .typeError("Pin is required"),

                    confirmPin: Yup.string()
                      .required("Confirm Pin is required")
                      .min(4)
                      .test(
                        "confirmPin",
                        "Confirm pin does not match pin",
                        function (confirmPin) {
                          const { pin } = this.parent;
                          return confirmPin === pin;
                        }
                      ),
                    password: Yup.string()
                      .min(8)
                      .required("Password is required")
                      .matches(/^\S*$/, "Password must not contain whitespace")
                      .typeError(
                        "Password is required and must be a minimum of 8 characters"
                      ),
                  })}
                  onSubmit={(values, helpers: FormikHelpers<any>) => {
                    console.log(values);
                    // create a createPin()
                    createPin(formData)
                      .then(function () {
                        //show success notification
                        showMessage(
                          "Pin Change",
                          "Password Submitted Successfully",
                          "success"
                        );
                      })
                      .catch(function (err) {
                        showMessage(
                          "Pin Change",
                          "Password not Submitted",
                          "error"
                        );
                      });

                    //clear input
                    helpers.resetForm();
                    //
                  }}
                >
                  <Form>
                    <div className="mt-10 ">
                      <div className="flex flex-col md:flex-row rounded-none gap-4 w-full">
                        <div className="w-full relative">
                          <MyTextInput
                            hasPLaceHolder={true}
                            placeholderTop="HyvePay Pin"
                            placeholder="Enter a pin for your HyvePay account"
                            className="bg-[#F5F5F5] border-[#F5F5F5]"
                            name="pin"
                          />
                          {/* <small className="absolute font-montserrat top-[85px] text-[#A5A5A5]">
                        Your pin must be minimum of 4 digits
                      </small> */}
                        </div>

                        <div className="w-full relative">
                          <MyTextInput
                            hasPLaceHolder={true}
                            placeholderTop="Confirm HyvePay Pin"
                            placeholder="Enter a pin for your HyvePay account"
                            className="bg-[#F5F5F5] border-[#F5F5F5]"
                            name="confirmPin"
                          />
                          {/* <small className="absolute font-montserrat top-[85px] text-[#A5A5A5]">
                        Your pin must be minimum of 4 digits
                      </small> */}
                        </div>
                      </div>

                      <div className="md:w-[50%] w-full mt-8 relative">
                        <MyTextInput
                          hasPLaceHolder={true}
                          placeholderTop="AutoHyve Account Password"
                          placeholder="Enter your AutoHyve account password"
                          className="bg-[#F5F5F5] border-[#F5F5F5]"
                          name="password"
                        />
                        {/* <small className="absolute font-montserrat top-[85px] text-[#A5A5A5]">
                      Your pin must be minimum of 4 digits
                    </small> */}
                      </div>

                      <div className="flex justify-end ">
                        <AppBtn
                          title="submit"
                          className="font-medium uppercase mt-5"
                          type="submit"
                        />
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </>
          )}

          {/* {view == 1 && <AccountSettings />} */}

          {view == 0 && (
            <>
              <div className="py-14 border-none rounded-3xl">
                <h5 className="font-bold font-montserrat mb-5">Roles</h5>
                <div className="flex items-center justify-between">
                  <div className="relative" ref={dropdownRef}>
                    <div
                      className="flex items-center border-[1px] cursor-pointer border-[#CACACA] p-3 rounded-[20px] px-5"
                      onClick={() => setOpenSort(!openSort)}
                    >
                      <span className="font-montserrat inline-block mr-2 font-medium ">
                        Sort by
                      </span>
                      <HiChevronDown size={20} />
                    </div>
                    {openSort && (
                      <SingleSort
                        openSort={openSort}
                        setOpenSort={setOpenSort}
                        select={select}
                        setSelect={setSelect}
                      />
                    )}
                  </div>

                  <span
                    onClick={() => setAddrolemodal(!addrolemodal)}
                    className="flex items-center border-[1px] cursor-pointer border-[#CACACA] p-3 rounded-[20px] px-5"
                  >
                    ADD ROLE
                  </span>
                </div>

                {/* TABLE */}

                <div className="flex justify-between mt-8 flex-wrap items-center">
                  <div className="search w-full md:w-2/4 mb-3">
                    <form action="">
                      <div className="prepend">
                        {/* <img src={SearchIcon} alt="" /> */}
                        <input
                          type="text"
                          placeholder="Search"
                          className="bg-gray-100 w-full md:w-2/3 searchInput"
                          style={{ border: 0 }}
                        />
                      </div>
                    </form>
                  </div>

                  <div className="flex items-center font-montserrat text-sm gap-4 text-gray-500">
                    Showing 12 results out of 56
                  </div>
                </div>

                <div className="mt-4 mb-24" style={{ overflowX: "scroll" }}>
                  <table
                    border={1}
                    style={{ borderRadius: 20, overflow: "clip" }}
                  >
                    <thead style={{ textAlign: "left" }}>
                      <th className="font-montserrat text-center w-10">
                        <input type="checkbox" name="" id="" />
                      </th>
                      <th className="font-montserrat">ID</th>
                      <th className="font-montserrat">Role Name</th>
                      <th className="font-montserrat">Permission</th>
                      <th className="font-montserrat w-10">Action</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-montserrat text-center">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="font-montserrat">13</td>
                        <td className="font-montserrat">Default</td>
                        <td className="font-montserrat">
                          delete_expense,view_analytics,read_customer
                        </td>
                        <td className="flex gap-3">
                          <GrEdit
                            size={18}
                            onClick={() => setEditRole(!editRole)}
                            className="cursor-pointer"
                          />

                          <button onClick={() => setDeletemodal(true)}>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td className="font-montserrat text-center">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="font-montserrat">16</td>
                        <td className="font-montserrat">Super</td>
                        <td className="font-montserrat">
                          delete_expense,view_analytics,read_customer
                        </td>
                        <td className="flex gap-3">
                          <GrEdit
                            size={18}
                            onClick={() => setEditRole(!editRole)}
                            className="cursor-pointer"
                          />

                          <button onClick={() => setDeletemodal(true)}>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td className="font-montserrat text-center">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="font-montserrat">9</td>
                        <td className="font-montserrat">Test</td>
                        <td className="font-montserrat">
                          delete_expense,view_analytics,read_customer
                        </td>
                        <td className="flex gap-3">
                          <GrEdit
                            size={18}
                            onClick={() => setEditRole(!editRole)}
                            className="cursor-pointer"
                          />

                          <button onClick={() => setDeletemodal(true)}>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-between mt-4 ">
                    <button className="flex gap-1 btn btn-secondary">
                      <img
                        src={DownloadIcon}
                        className="mr-3 font-montserrat"
                        alt=""
                      />
                      Export Items
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h5 className="heading-five block mb-4">User</h5>

                  <div className="flex justify-center gap-3 items-center">
                    <AppBtn
                      className="btn-secondary"
                      title="READ USER"
                      onClick={() => setReadusermodal(!readusermodal)}
                    />
                    <AppBtn
                      className="btn-secondary"
                      title="ADD USER"
                      onClick={() => setAddusermodal(!addusermodal)}
                    />
                  </div>
                </div>

                {/* TABLE */}

                <div className="flex justify-end mt-8 flex-wrap items-center">
                  <div className="search w-full md:w-2/4 mb-3"></div>

                  <div className="flex items-center font-montserrat text-sm gap-4 text-gray-500">
                    Showing 12 results out of 56
                  </div>
                </div>

                <div className="mt-4" style={{ overflowX: "scroll" }}>
                  <table
                    border={1}
                    style={{ borderRadius: 20, overflow: "clip" }}
                  >
                    <thead style={{ textAlign: "left" }}>
                      <th className="font-montserrat text-center w-10">
                        <input type="checkbox" name="" id="" />
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        ID
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        Full Name
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        Email
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        Role
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        Status
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        Phone Number
                      </th>
                      <th className="font-montserrat text-xs font-semibold">
                        Action
                      </th>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-montserrat text-center">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="font-montserrat">13</td>
                        <td className="font-montserrat">David James</td>
                        <td className="font-montserrat">demo@myautohyve.com</td>
                        <td className="font-montserrat">Garage Admin Role</td>
                        <td className="font-montserrat">
                          <span
                            className="py-2 bg-gray-300 px-4"
                            style={{ borderRadius: 10 }}
                          >
                            Inactive
                          </span>
                        </td>
                        <td className="font-montserrat">08144246273</td>
                        <td className="flex items-center gap-3">
                          <GrEdit
                            size={18}
                            onClick={() => setEditUser(!editUser)}
                            className="cursor-pointer"
                          />

                          <AppSwitch />

                          <button onClick={() => setDeletemodal(true)}>
                            <img src={TrashIcon} alt="" className="w-[22px]" />
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td className="font-montserrat text-center">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="font-montserrat">16</td>
                        <td className="font-montserrat">Mr Ejike Emmanuel</td>
                        <td className="font-montserrat">demo@myautohyve.com</td>
                        <td className="font-montserrat">Garage Admin Role</td>
                        <td className="font-montserrat">
                          <span
                            className="py-2 bg-primary px-4"
                            style={{ borderRadius: 10 }}
                          >
                            Active
                          </span>
                        </td>
                        <td className="font-montserrat">08144246273</td>
                        <td className="flex items-center gap-3">
                          <GrEdit
                            size={18}
                            onClick={() => setEditUser(!editUser)}
                            className="cursor-pointer"
                          />

                          <AppSwitch />

                          <button onClick={() => setDeletemodal(true)}>
                            <img src={TrashIcon} alt="" className="w-[22px]" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-between mt-4">
                    <button className="flex gap-1 btn btn-secondary">
                      <img
                        src={DownloadIcon}
                        className="mr-3 font-montserrat"
                        alt=""
                      />
                      Export Items
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <DeleteModal
        deletemodal={deletemodal}
        title={"Are you sure you want to delete this User?"}
        description=""
        closeDeleteModal={closeDeleteModal}
      />

      <AddRoleModal
        addrolemodal={addrolemodal}
        title={"Add Role"}
        description=""
        setAddrolemodal={setAddrolemodal}
      />

      <AddUserModal
        addusermodal={addusermodal}
        title={"Add User"}
        description=""
        setAddusermodal={setAddusermodal}
      />

      <ReadUserModal
        readusermodal={readusermodal}
        title={"Read Users"}
        description=""
        setReadusermodal={setReadusermodal}
      />

      <EditUserModal
        editUser={editUser}
        setEditUser={setEditUser}
        title={"Edit User"}
      />

      <EditRoleModal editRole={editRole} setEditRole={setEditRole} />
    </>
  );
};

export default Settings;
