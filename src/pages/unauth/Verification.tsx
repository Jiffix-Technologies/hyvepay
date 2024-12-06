import React, { useState } from "react";
import Logo from "../../assets/svgs/hyve_logo.svg";
import Quote from "../../assets/svgs/blockquote.svg";
import OtpInput from "react-otp-input";

const Verification = () => {
  const [otp, setOtp] = useState("");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* login form */}
        <div className="flex flex-col justify-between py-10 items-center px-4">
          <nav className="w-full flex justify-center md:justify-start">
            <img src={Logo} alt="logo" className="" />
          </nav>

          <div
            className="w-full flex flex-col justify-center items-center"
            style={{ maxWidth: 440 }}
          >
            <div className="text-center">
              <h2 className="heading-two text-center">AutoHyve</h2>
              <h2
                className="heading-two text-center"
                style={{ marginTop: -20 }}
              >
                Account Verification
              </h2>
              <h5 className="subtitle gray-color">
                We have send you four digit OTP to your registered phone number.
                Please enter the code within the next 5 minutes to complete the
                verification process.
              </h5>
            </div>

            <div className="otp-inputs flex gap-4 mt-8">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputType={"number"}
                renderSeparator={<span className="mr-3"> </span>}
                // renderInput={(props) => <input {...props} />}
                renderInput={(props) => <input {...props} />}
              />
            </div>

            <button
              className={
                otp.length == 4
                  ? "btn btn-primary btn-lg w-full mt-20 md:mt-40 md:mb-10"
                  : "btn btn-primary disabled btn-lg w-full mt-20 md:mt-40 md:mb-10"
              }
            >
              Verify & Create Account
            </button>
          </div>
        </div>

        {/* image slider */}
        <div className="login_bg hidden md:flex sticky top-0 flex-col justify-between py-24 items-center px-24">
          <div className="w-full flex justify-between items-center">
            <img src={Quote} alt="" />
            <hr style={{ borderWidth: 0.5, width: 100 }} />
          </div>

          <div>
            <p className="base-text text-white slider-text">
              The automobile has not merely taken over the street, it has
              dissolved the living tissue of the city. Its appetite for space is
              absolutely insatiable; moving and parked, it devours urban land,
              leaving the buildings as mere islands of habitable space in a sea
              of dangerous and ugly traffic.
            </p>

            <div className="w-full flex justify-between items-center mt-8">
              <p className="base-text primary-color">James Marston Fitch</p>

              <div className="nav-btns flex gap-8">
                <button className="nav-left-btn">
                  {/* <img src={ArrowLeft} alt="" /> */}
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.1528 9.39062L5.54199 19.0015L15.1528 28.6123"
                      stroke="#D9D9D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M32.458 19H5.81055"
                      stroke="#D9D9D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button className="nav-right-btn">
                  {/* <img src={ArrowRight} alt="" /> */}
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 38 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.8472 9.39062L32.458 19.0015L22.8472 28.6123"
                      stroke="#D9D9D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.54195 19H32.1895"
                      stroke="#D9D9D9"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
