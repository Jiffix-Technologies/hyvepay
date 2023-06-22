import React, { useState } from "react";

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

        {/* Views */}
        <div>
          {view == 0 ? (
            <>
              <h5 className="font-bold">HyvePay Pin</h5>
              <p className="">Please set your password for HyvePay</p>

              <div className="mt-4 ">
                <div className="flex modal rounded-none gap-4">
                  <div>
                    <label htmlFor="">HyvePay Pin</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Enter a pin for your HyvePay account"
                    />
                    <br />
                    <small>Your pin must be minimum of 4 digits</small>
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
