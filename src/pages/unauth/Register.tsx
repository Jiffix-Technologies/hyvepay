import { useNavigate } from "react-router-dom";
import hyveLogo from "../../assets/images/hyveLogo.png";
import Quote from "../../assets/svgs/blockquote.svg";
import TextHeader from "../../components/TextHeader/TextHeader";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-0">
      <div className="w-full flex flex-col justify-center mt-20 px-10 md:px-28  mb-20 items-center h-[100%]">
        <div className="w-[100%] md:w-[50%] top-0 right-0 left-0 flex bg-white z-50 fixed justify-center md:justify-start py-5 pl-8">
          <img src={hyveLogo} alt="logo" className=" w-[150px]" />
        </div>

        <TextHeader
          title="Create HyvePay Account"
          subTitle="Fill in the information below to create your account"
          className="text-center"
          subTextCassName="text-center"
        />

        <RegisterForm />

        <p className=" mt-2 font-montserrat text-[15px]">
          Already have an account?{" "}
          <b onClick={() => navigate("/login")} className="cursor-pointer">
            Sign in
          </b>
        </p>
      </div>

      <div className="login_bg hidden md:flex fixed right-0 w-[50%] top-0 flex-col justify-between py-24 items-center px-24">
        <div className="w-full flex justify-between items-center">
          <img src={Quote} alt="" />
          <hr style={{ borderWidth: 0.5, width: 100 }} />
        </div>

        <div>
          <p className=" text-white slider-text font-montserrat">
            The automobile has not merely taken over the street, it has
            dissolved the living tissue of the city. Its appetite for space is
            absolutely insatiable; moving and parked, it devours urban land,
            leaving the buildings as mere islands of habitable space in a sea of
            dangerous and ugly traffic.
          </p>

          <div className="w-full flex justify-between items-center mt-8">
            <p className="base-text primary-color font-montserrat">
              James Marston Fitch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
