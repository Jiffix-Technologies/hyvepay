// import React from "react";
// import { Link } from "react-router-dom";
// import Google from "../../assets/svgs/flat-color-icons_google.svg";
// import User from "../../assets/svgs/user.svg";
// import Lock from "../../assets/svgs/lock.svg";
// import Eye from "../../assets/svgs/eye.svg";
// import Logo from "../../assets/svgs/hyve_logo.svg";
// import Quote from "../../assets/svgs/blockquote.svg";
// import AppBtn from "../../components/AppBtn/AppBtn";

// const Login = () => {
//   const [pwdfield, setPwdfield] = React.useState(false);

//   const togglePassword = (e, val) => {
//     e.preventDefault();

//     setPwdfield(val);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
//         {/* login form */}
//         <div className="flex flex-col justify-between py-10 items-center px-4">
//           <nav className="w-full flex justify-center md:justify-start">
//             <img src={Logo} alt="logo" className="" />
//           </nav>

//           <div
//             className="w-full flex flex-col justify-center items-center"
//             style={{ maxWidth: 440 }}
//           >
//             <div className="text-center">
//               <h2 className="heading-two text-center">Hello there!</h2>
//               <h5 className="subtitle gray-color">
//                 Enter your information below to log into your account
//               </h5>
//             </div>

//             <div className="divider mt-3 mb-3 md:mt-6 md:mb-6 text-center flex justify-center items-center">
//               {/* <hr /> */}
//               <span>or</span>
//               {/* <hr /> */}
//             </div>

//             <div className="form w-full">
//               <form action="#" method="post">
//                 <div className="prepend w-full mb-5">
//                   <img src={User} alt="" />
//                   <input
//                     type="text"
//                     className="w-full"
//                     placeholder="Your Email"
//                   />
//                 </div>

//                 <div className="prepend w-full">
//                   <img src={Lock} alt="" />
//                   <input
//                     type={pwdfield ? "text" : "password"}
//                     className="w-full"
//                     placeholder="Password"
//                   />
//                   <button onClick={(e) => togglePassword(e, !pwdfield)}>
//                     <img src={Eye} alt="" />
//                   </button>
//                 </div>
//               </form>
//             </div>

//             <div className="justify-end w-full mt-2 flex">
//               <a href="#" className="text-link">
//                 <i>Forgot Password?</i>
//               </a>
//             </div>

//             <AppBtn title=" Log in" className="w-full" />
//             {/* <button className="btn btn-primary btn-lg w-full mt-10 md:mt-20">

//                      </button> */}
//             <Link to="/register" className="text-link mt-2">
//               Don’t have an account? <b>Sign up</b>
//             </Link>
//           </div>
//         </div>

//         {/* image slider */}
//         <div className="login_bg hidden md:flex sticky top-0 flex-col justify-between py-24 items-center px-24">
//           <div className="w-full flex justify-between items-center">
//             <img src={Quote} alt="" />
//             <hr style={{ borderWidth: 0.5, width: 100 }} />
//           </div>

//           <div>
//             <p className="base-text text-white slider-text">
//               The automobile has not merely taken over the street, it has
//               dissolved the living tissue of the city. Its appetite for space is
//               absolutely insatiable; moving and parked, it devours urban land,
//               leaving the buildings as mere islands of habitable space in a sea
//               of dangerous and ugly traffic.
//             </p>

//             <div className="w-full flex justify-between items-center mt-8">
//               <p className="base-text primary-color">James Marston Fitch</p>

//               <div className="nav-btns flex gap-8">
//                 <button className="nav-left-btn">
//                   {/* <img src={ArrowLeft} alt="" /> */}
//                   <svg
//                     width="38"
//                     height="38"
//                     viewBox="0 0 38 38"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M15.1528 9.39062L5.54199 19.0015L15.1528 28.6123"
//                       stroke="#D9D9D9"
//                       stroke-width="1.5"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M32.458 19H5.81055"
//                       stroke="#D9D9D9"
//                       stroke-width="1.5"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>
//                 </button>

//                 <button className="nav-right-btn">
//                   {/* <img src={ArrowRight} alt="" /> */}
//                   <svg
//                     width="38"
//                     height="38"
//                     viewBox="0 0 38 38"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M22.8472 9.39062L32.458 19.0015L22.8472 28.6123"
//                       stroke="#D9D9D9"
//                       stroke-width="1.5"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                     <path
//                       d="M5.54195 19H32.1895"
//                       stroke="#D9D9D9"
//                       stroke-width="1.5"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React from "react";
import AppBtn from "../../components/AppBtn/AppBtn";
import cloudIcon from "../../assets/images/cloudIcon.png";
import { useNavigate } from "react-router-dom";

const Login = ({ setModal, setShowCurrent }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col justify-center   px-10 md:px-28 max-w-prose mx-auto  items-center h-[100%]">
      <div className="text-center mt-36 md:mt-0">
        <h2 className="text-[40px] font-montserrat font-semibold text-center">
          Hello there!
        </h2>
        <h5 className="text-[12px] gray-color">
          Welcome to HyvePay, what would you like to do?
        </h5>
      </div>

      <AppBtn
        title="Sign in with HyveCloud"
        className="w-full bg-[#FAA21B] mt-16 text-[#fff]"
        showIcon={true}
        image={cloudIcon}
        onClick={() => navigate("/login")}
      />
      <AppBtn
        title="Create HyvePay Account"
        className="w-full mt-[35px] border-[#CACACA]  bg-transparent border-[1px] "
        showIcon={false}
        onClick={() => navigate("/register")}
      />
    </div>
  );
};

export default Login;
