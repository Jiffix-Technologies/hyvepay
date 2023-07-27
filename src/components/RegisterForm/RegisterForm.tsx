import { Form, Formik, FormikHelpers } from "formik";
import AppInput, {
  AppPhoneInput,
  MySelect,
  MyTextInput,
} from "../AppInput/AppInput";
import * as Yup from "yup";
import useAppDispatch from "../../hooks/useAppDispatch";
import {
  clearSignupStatus,
  garageSignUpAction,
} from "../../reducers/authReducer";
import InputHeader from "../InputHeader/InputHeader";
import AppBtn from "../AppBtn/AppBtn";
import { useEffect, useState } from "react";
import { stateLga } from "../../contsants/states";
import { useNavigate } from "react-router-dom";
import Eye from "../../assets/svgs/eye.svg";
import { customStyles } from "../../contsants/customStyles";
import useAppSelector from "../../hooks/useAppSelector";
import { showMessage } from "../../helpers/notification";

const RegisterForm = () => {
  const [state, setState] = useState<any[]>([]);
  // const [district, setDistrict] = useState<any[]>([]);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  const authState = useAppSelector((state) => state.authReducer);

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    state: { label: "", value: "" },
    // district: { label: "", value: "" },
    password: "",
    confirmPassword: "",
    businessName: "",
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    let stateArray: any[] = [];
    const newData = Object.entries(stateLga);
    newData.map((item, index) => {
      stateArray.push({
        value: item[0],
        label: item[0],
      });
    });
    setState(stateArray);
  }, []);

  // useEffect(() => {
  //   if (value != null) {
  //     let districtArray: any[] = [];
  //     const newData: any = Object.entries(stateLga).find(
  //       (_items) => _items[0] === value
  //     );

  //     newData[1].map((item: any, index: any) => {
  //       districtArray.push({
  //         value: item,
  //         label: item,
  //       });
  //     });
  //     setDistrict(districtArray);
  //   }
  // }, [value]);

  useEffect(() => {
    if (authState.signupStatus === "completed") {
      showMessage("Signup successful", "Please proceed to login", "success");
      navigate("/login");
    } else if (authState.signupStatus === "failed") {
      showMessage(authState.signupError, "", "error");
    }

    dispatch(clearSignupStatus());
  }, [authState.signupStatus]);

  return (
    <div className="form w-full mt-10">
      <Formik
        enableReinitialize
        initialValues={formState}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required("First name is required")
            .matches(/^\S*$/, "First name must not contain whitespace")
            .typeError("First name is required"),
          lastName: Yup.string()
            .required("Last name is required")
            .matches(/^\S*$/, "Last name must not contain whitespace")
            .typeError("Last name is required"),
          email: Yup.string()
            .email()
            .required("Email is required")
            .typeError("Email address is required"),
          phoneNumber: Yup.string()
            .required("Phone number is required")
            .matches(/^\S*$/, "Phone Number must not contain whitespace")
            .typeError("Phone number is required"),
          address: Yup.string().required("Address is required")
          .matches(/^\S*$/, "Address must not contain whitespace"),
          state: Yup.object({
            label: Yup.string().required("State is required"),
            value: Yup.string().required("State is required"),
          })
            .required("State is required")
            .typeError("Please select city"),
          password: Yup.string()
            .min(8)
            .required("Password is required")
            .matches(/^\S*$/, "Password must not contain whitespace")
            .typeError(
              "Password is required and must be a minimum of 8 characters"
            ),
          confirmPassword: Yup.string()
            .min(8)
            .test(
              "confirmPassword",
              "Confirm password does not match password",
              function (confirmPassword) {
                const { password } = this.parent;
                return confirmPassword === password;
              }
            ),
          businessName: Yup.string().required("Business Name is required") .typeError("Business Name is required"),
        })}
        onSubmit={(values, helpers: FormikHelpers<any>) => {
          console.log("values> ", values);
          dispatch(
            garageSignUpAction({
              firstName: values.firstName,
              lastName: values.lastName,
              name: values.businessName,
              phone: values.phoneNumber,
              email: values.email.toLowerCase(),
              password: values.password,
              state: values.state.value,
              address: values.address,
              dialCode: values.phoneNumber,
            })
          );
          //   helpers.resetForm();
        }}
      >
        <Form>
          <div className="form-group flex-col md:flex-row">
            <div>
              <MyTextInput
                hasPLaceHolder={true}
                placeholderTop="First Name*"
                placeholder="First Name"
                name="firstName"
              />
            </div>
            <div className="md:mt-0 -mt-5">
              <MyTextInput
                hasPLaceHolder={true}
                placeholderTop="Last Name*"
                placeholder="Last Name"
                name="lastName"
              />
            </div>
          </div>
          <div className="mt-0 md:mt-5 mb-0 md:mb-10">
            <MyTextInput
              hasPLaceHolder={true}
              placeholderTop="Email Address*"
              placeholder="Enter your valid email address"
              name="email"
            />
          </div>

          <div className="mt-0 md:mt-5 mb-0 md:mb-10">
            <MyTextInput
              hasPLaceHolder={true}
              placeholderTop="Workshop/Business Name*"
              placeholder="Your Workshop/Business Name"
              name="businessName"
              
            />
          </div>

          <div className="md:mt-5">
            <AppPhoneInput
              placeholderTop="Phone Number*"
              placeholder="Number* (WhatsApp)"
              hasPLaceHolder={true}
              name="phoneNumber"
            />
          </div>

          <div className="mt-5 md:mt-10">
            <MyTextInput
              hasPLaceHolder={true}
              placeholderTop="Address/Location*"
              placeholder="Enter your address"
              name="address"
            />
          </div>

          <div className="mt-5 md:mt-10">
            <InputHeader text="State*" />

            <MySelect
              name="state"
              options={state}
              styles={customStyles}
              placeholder="Choose state"
            />
          </div>

          <div className="mt-5 md:mt-10">
            <MyTextInput
              rightImg={Eye}
              leftImg={Lock}
              hasPLaceHolder={true}
              placeholderTop="Password *"
              placeholder="Min of 8 characters"
              name="password"
            />
          </div>
          <div className="mt-5 md:mt-10">
            <MyTextInput
              rightImg={Eye}
              leftImg={Lock}
              hasPLaceHolder={true}
              placeholderTop="Confirm Password *"
              placeholder="password must match"
              name="confirmPassword"
            />
          </div>

          <span className="text-[10px] md:text-[12px] gray-color mt-8 inline-block font-montserrat italic">
            By clicking ‘Proceed’ you agree with the AutoHyve Terms and Policies
          </span>

          <AppBtn
            className="w-full bg-[#FAA21B]  text-[#000] mt-3"
            title="Proceed"
            type={"submit"}
            spinner={authState.signupStatus === "loading"}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
