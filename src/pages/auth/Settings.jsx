import React, { useState } from "react";
import settings from "../../assets/images/settings.png";
import DeleteIcon from "../../assets/svgs/delete.svg";
import DownloadIcon from "../../assets/svgs/download-icon.svg";
import SearchIcon from "../../assets/svgs/vuesax/linear/search-normal.svg";
import EditIcon from "../../assets/svgs/edit-icon.svg";
import TrashIcon from "../../assets/svgs/vuesax/linear/trash.svg";
import InactiveToggleIcon from "../../assets/svgs/toggle-inactive.svg";
import ActiveToggleIcon from "../../assets/svgs/toggle-active.svg";

import { Link } from "react-router-dom";

const Settings = () => {
  const [view, setView] = useState(0);

  return (
    <>
      <div className="mb-20 mt-24">
        <div className="flex justify-between flex-wrap items-center mt-10 my-4 setting-tabs">
          {/* <h5 className="heading-five font-montserrat">Settings</h5> */}

          <div className="flex md:flex-row mt-3 md:mt-0 gap-4">
            <button
              onClick={() => setView(0)}
              className={view == 0 ? "btn btn-primary" : "btn btn-secondary"}
            >
              Hyvepay
            </button>

            <button
              onClick={() => setView(1)}
              className={view == 1 ? "btn btn-primary" : "btn btn-secondary"}
            >
              Account Settings
            </button>

            <button
              onClick={() => setView(2)}
              className={view == 2 ? "btn btn-primary" : "btn btn-secondary"}
            >
              User & Role Managment
            </button>

            <button
              onClick={() => setView(3)}
              className={view == 3 ? "btn btn-primary" : "btn btn-secondary"}
            >
              Preferences
            </button>
          </div>
        </div>

        <div>
          {view == 0 ? (
            <>
              <div className="p-14 hyvepay-setting rounded-3xl">
                <h5 className="font-bold">HyvePay Pin</h5>
                <p className="">Please set your password for HyvePay</p>

                <div className="mt-4 ">
                  <div className="flex  rounded-none gap-4 w-full">
                    <div className="w-full">
                      <label htmlFor="">HyvePay Pin</label>
                      <br />
                      <input
                        type="text"
                        className="w-full bg-gray-100 border-none"
                        placeholder="Enter a pin for your HyvePay account"
                      />
                      <br />
                      <small>Your pin must be minimum of 4 digits</small>
                    </div>

                    <div className="w-full">
                      <label htmlFor="">Confirm HyvePay Pin</label>
                      <br />
                      <input
                        className="w-full bg-gray-100 border-none"
                        type="text"
                        placeholder="Enter a pin for your HyvePay account"
                      />
                      <br />
                      <small>Your pin must be minimum of 4 digits</small>
                    </div>
                  </div>
                  <div className="w-full mt-8">
                    <label htmlFor="">AutoHyve Account Password</label>
                    <br />
                    <input
                      className="w-[50%] bg-gray-100 border-none"
                      type="text"
                      placeholder="Enter your AutoHyve account password"
                    />
                    <br />
                    <small>Your pin must be minimum of 4 digits</small>
                  </div>

                  <div className="flex justify-end">
                    <button className="btn btn-primary uppercase">
                      submit
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : view == 1 ? (
            <>
              <div className="p-14 hyvepay-setting rounded-3xl">
                <div className="flex items-center justify-between">
                  <h5 className="heading-five">Business Profile</h5>

                  <button className="btn btn-primary uppercase">save</button>
                </div>

                <div className="flex mt-10 justify-between items-center">
                  <div>
                    <h5 className="">Your Company’s Logo</h5>
                    <p>
                      Kindly upload/update your business logo if you have one
                    </p>
                  </div>
                  <img src={settings} alt="" className="w-[100px] h-[100px]" />
                </div>

                <hr className="mt-14 mb-14" />

                <div className="flex gap-4 w-full">
                  <div className="w-full">
                    <label htmlFor="">Company Full Name</label>
                    <br />
                    <input
                      type="text"
                      className="w-full bg-gray-100 border-none"
                      placeholder="Company Name"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">Name of Director</label>
                    <br />
                    <input
                      className="w-full bg-gray-100 border-none"
                      type="text"
                      placeholder="Director Name"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>
                </div>

                <div className="flex mt-8 gap-4 w-full">
                  <div className="w-full">
                    <label htmlFor="">Business Category</label>
                    <br />
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">Choose business category</option>
                    </select>
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">Business Registration Status</label>
                    <br />
                    {/* <input className='w-full bg-gray-100 border-none' type="text" placeholder='Director Name' /> */}
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">
                        Choose business registration status
                      </option>
                    </select>
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>
                </div>

                <div className="flex mt-8 gap-4 w-full">
                  <div className="w-full">
                    <label htmlFor="">Workshop Address</label>
                    <br />
                    <input
                      type="text"
                      className="w-full bg-gray-100 border-none"
                      placeholder="Full Address"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">State</label>
                    <br />
                    {/* <input className='w-full bg-gray-100 border-none' type="text" placeholder='Director Name' /> */}
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">Choose state</option>
                    </select>
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>
                </div>

                <div className="flex mt-8 gap-4 w-full">
                  <div className="w-full">
                    <label htmlFor="">District</label>
                    <br />
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">Choose district</option>
                    </select>
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">Tax Identity Number (TIN)</label>
                    <br />
                    {/* <input className='w-full bg-gray-100 border-none' type="text" placeholder='Director Name' /> */}
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">Enter your TIN</option>
                    </select>
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>
                </div>

                <div className="flex mt-8 gap-4 w-full">
                  <div className="w-full">
                    <label htmlFor="">Name of Manager</label>
                    <br />
                    <input
                      type="text"
                      className="w-full bg-gray-100 border-none"
                      placeholder="Manager Name"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">CAC Number</label>
                    <br />
                    {/* <input className='w-full bg-gray-100 border-none' type="text" placeholder='Director Name' /> */}
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">Enter your CAC number</option>
                    </select>
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>
                </div>
              </div>
              <div className="p-14 hyvepay-setting rounded-3xl mt-14">
                <div className="flex items-center justify-between">
                  <h5 className="heading-five">Employment Information</h5>

                  <button className="btn btn-primary uppercase">save</button>
                </div>

                <div className="flex mt-8 gap-4 w-full">
                  <div className="w-full">
                    <label htmlFor="">Contact Number</label>
                    <br />
                    <input
                      type="text"
                      className="w-full bg-gray-100 border-none"
                      placeholder="Enter Contact Number"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">Total Staffs</label>
                    <br />
                    {/* <input className='w-full bg-gray-100 border-none' type="text" placeholder='Director Name' /> */}
                    <input
                      type="text"
                      className="w-full bg-gray-100 border-none"
                      placeholder="Enter the Total Staffs"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">Total Technicians</label>
                    <br />
                    <input
                      className="w-full bg-gray-100 border-none"
                      type="text"
                      placeholder="Enter Total Techicans"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>
                </div>
              </div>

              <div className="p-14 hyvepay-setting rounded-3xl mt-14">
                <div className="flex items-center justify-between">
                  <h5 className="heading-five">Brands</h5>

                  <button className="btn btn-primary uppercase">save</button>
                </div>

                <div className="flex mt-8 mb-4 gap-4 w-full items-end">
                  <div className="w-full">
                    <label htmlFor="">Make</label>
                    <br />
                    <select
                      name=""
                      id=""
                      className="bg-gray-100 none w-full sm border-none"
                    >
                      <option value="">Brand Make</option>
                    </select>
                    {/* <input type="text" className='w-full bg-gray-100 border-none' placeholder='Enter Contact Number' /> */}
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    <label htmlFor="">Model Year</label>
                    <br />
                    {/* <input className='w-full bg-gray-100 border-none' type="text" placeholder='Director Name' /> */}
                    <input
                      type="text"
                      className="w-full bg-gray-100 border-none"
                      placeholder="From"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <div className="w-full">
                    {/* <label htmlFor="">Total Technicians</label><br /> */}
                    <input
                      className="w-full bg-gray-100 border-none"
                      type="text"
                      placeholder="To"
                    />
                    {/* <br /><small>Your pin must be minimum of 4 digits</small> */}
                  </div>

                  <button className="bg-red-500 px-5 rounded-lg">
                    <img src={DeleteIcon} alt="" style={{ height: 60 }} />
                  </button>
                </div>
                <Link to="/" className="primary-color">
                  Add New Brand
                </Link>
              </div>
            </>
          ) : view == 2 ? (
            <>
              <div className="py-14 border-none rounded-3xl">
                <h5 className="heading-five block mb-4">Roles</h5>
                <div className="flex items-center justify-between">
                  <select
                    name=""
                    id=""
                    className="btn btn-secondary sm border-1"
                  >
                    <option value="">Sort by</option>
                  </select>

                  <button className="btn btn-secondary uppercase">
                    add role
                  </button>
                </div>

                {/* TABLE */}

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

                  <div className="flex items-center gap-4 text-gray-500">
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
                          <button>
                            <img src={EditIcon} alt="" />
                          </button>

                          <button>
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
                          <button>
                            <img src={EditIcon} alt="" />
                          </button>

                          <button>
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
                          <button>
                            <img src={EditIcon} alt="" />
                          </button>

                          <button>
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
                    <button className="btn btn-secondary uppercase">
                      read users
                    </button>

                    <button className="btn btn-secondary uppercase">
                      add user
                    </button>
                  </div>
                </div>

                {/* TABLE */}

                <div className="flex justify-end mt-8 flex-wrap items-center">
                  <div className="search w-full md:w-2/4 mb-3"></div>

                  <div className="flex items-center gap-4 text-gray-500">
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
                      <th className="font-montserrat">ID</th>
                      <th className="font-montserrat w-60">Full Name</th>
                      <th className="font-montserrat w-30">Email</th>
                      <th className="font-montserrat">Role</th>
                      <th className="font-montserrat">Status</th>
                      <th className="font-montserrat">Phone Number</th>
                      <th className="font-montserrat">Action</th>
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
                        <td className="flex gap-3">
                          <button>
                            <img src={EditIcon} alt="" />
                          </button>

                          <button>
                            <img src={InactiveToggleIcon} alt="" />
                          </button>

                          <button>
                            <img src={TrashIcon} alt="" />
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
                        <td className="flex gap-3">
                          <button>
                            <img src={EditIcon} alt="" />
                          </button>

                          <button>
                            <img src={ActiveToggleIcon} alt="" />
                          </button>

                          <button>
                            <img src={TrashIcon} alt="" />
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td className="font-montserrat text-center">
                          <input type="checkbox" name="" id="" />
                        </td>
                        <td className="font-montserrat">9</td>
                        <td className="font-montserrat">Mr Olusola Segun</td>
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
                        <td className="flex gap-3">
                          <button>
                            <img src={EditIcon} alt="" />
                          </button>

                          <button>
                            <img src={ActiveToggleIcon} alt="" />
                          </button>

                          <button>
                            <img src={TrashIcon} alt="" />
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
