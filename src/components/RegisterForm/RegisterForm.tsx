import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import AppInput, {
  AppPhoneInput,
  MyChangePassInput,
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
import Select from "react-select";
import AppInputWithPhone from "../AppInputWithPhone/AppInputWithPhone";

const accountType = [
  "individual",
  "cooperate"
]

const createUserSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  phone: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Phone number should be numbers")
    .min(11, "Phone number should be 11 digits")
    .max(11, "Phone number should be 11 digits")
    .label("Phone Number"),
  state: Yup.string().required().label("State"),
  district: Yup.string().required().label("District"),
  address: Yup.string().required().label("Address"),
  accountType: Yup.string().required().label("Account Type"),
  name: Yup.string().label("Business Name"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/,
      'Password does not meet requirement.'
    )
    .required('Password is required')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm password and password do not match ')
    .required('Confirm password is required')
    .label('Confirm Password'),
});

const RegisterForm = () => {
  const [state, setState] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [value, setValue] = useState(null);

  const authState = useAppSelector((state) => state.authReducer);

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

  useEffect(() => {
    if (authState.signupStatus === "completed") {
      showMessage("Signup successful", "Please proceed to login", "success");
      navigate("/login");
    } else if (authState.signupStatus === "failed") {
      showMessage(authState.signupError, "", "error");
    }

    dispatch(clearSignupStatus());
  }, [authState.signupStatus]);
  const termsPage =
    "https://hyvetech.notion.site/HyveTech-Limited-Terms-of-Use-138c1d3439b6420c9649f0d0003f65ad";
  const policyPage =
    "https://hyvetech.notion.site/HyveTech-Limited-Privacy-Policy-79ccd19af6c94d0d8df441abcb2d991e";

  const handleSubmit = (values: any) => {

    const phone = values.phone
    const newPhone = `${phone}`.startsWith("234")
                        ? phone
                        : `${phone}`.startsWith("0")
                          ? `${phone}`.replace("0", "234")
                          : `${phone}`.replace("", "234")

    const data = { ...values, phone: newPhone};
      dispatch(garageSignUpAction({
        ...data,
        email: values.email.toLowerCase().trim(),
        password: values.password,
        confirm_password: values.confirmPassword
      }))
  }
  
  return (
    <div className="form w-full mt-10">
      <Formik
        enableReinitialize
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          state: "",
          district: "",
          accountType: "",
          name: "" 
        }}
        validationSchema={createUserSchema}
        onSubmit={(values, helpers: FormikHelpers<any>) => {
          handleSubmit(values)
          // helpers.resetForm();
        }}
      >
        {({ setFieldValue, values, handleChange, handleBlur }) => (
          <Form>
            <div className="form-group flex-col md:flex-row w-full">
              <div className="md:mt-0 mt-5 flex-1">
                <MyTextInput
                  hasPLaceHolder={true}
                  placeholderTop="First Name*"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
              </div>
              <div className="md:mt-0 mt-5 flex-1">
                <MyTextInput
                  hasPLaceHolder={true}
                  placeholderTop="Last Name*"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
              </div>
            </div>
            <div className="mt-0 md:mt-5 mb-0 md:mb-10">
              <MyTextInput
                hasPLaceHolder={true}
                placeholderTop="Email Address*"
                placeholder="Enter your valid email address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </div>

            <div className="mt-5 md:mt-5">
              <InputHeader text="Account Type" />
              
              <Select
                options={accountType.map(option => ({ value: option, label: option }))}
                onChange={(item) => {
                  setFieldValue("accountType", String(item?.value));
                }}
                name="accountType"
                styles={customStyles}
                placeholder="Account Type"
                onBlur={handleBlur}
                value={{
                  value: values.accountType,
                  label: values.accountType,
                }}
              />
            </div>

            {values.accountType === 'cooperate' && (<div className="mt-5 md:mt-5">
              <MyTextInput
                hasPLaceHolder={true}
                placeholderTop="Business Name*"
                placeholder="Enter business name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                required={values.accountType === 'cooperate'}
              />
            </div>)}

            <div className="md:mt-5">
              <AppInputWithPhone
                placeholderTop="Phone Number*"
                placeholder="Number* (WhatsApp)"
                hasPLaceHolder={true}
                name="phone"
                type="text"
                onChange={(event: any) => {
                  setFieldValue("phone", event?.target?.value);
                }}
                onBlur={handleBlur}
                value={values.phone}
              />
            </div>

            <div className="mt-5 md:mt-10">
              <MyTextInput
                hasPLaceHolder={true}
                placeholderTop="Address/Location*"
                placeholder="Enter your address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
              />
            </div>

            <div className="mt-5 md:mt-10">
              <InputHeader text="State*" />

              <Select
                options={state}
                onChange={(item) => {
                  setValue(item?.value);
                  setFieldValue("district", "");
                  setFieldValue("state", String(item?.value));
                }}
                name="state"
                styles={customStyles}
                placeholder="Choose state"
                // onBlur={handleBlur}
                value={{
                  value: values.state,
                  label: values.state,
                }}
              />
            </div>
            <div className="mt-5 md:mt-5">
              <InputHeader text="District*" />

              <Select
                options={district}
                styles={customStyles}
                placeholder="Choose district"
                name="district"
                onChange={(item) =>
                  setFieldValue("district", String(item?.value))
                }
                value={{
                  value: values.district,
                  label: values.district,
                }}
              />
            </div>

            <div className="mt-5 md:mt-10">
              <MyChangePassInput
                hasPLaceHolder={true}
                placeholderTop="Password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                type="password"
              />
            </div>
            <div className="mt-5 md:mt-10">
              <MyChangePassInput
                hasPLaceHolder={true}
                placeholderTop="Confirm New Password"
                placeholder="Re-enter new password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                type="password"
              />
            </div>

            <span className="text-[10px] md:text-[12px] gray-color mt-8 inline-block font-montserrat italic">

              By clicking ‘Proceed’ you agree with the AutoHyve{" "}
              <Link className="text-orange-400" to={termsPage}>
                <strong>Terms</strong>
              </Link>{" "}
              and{" "}
              <Link className="text-orange-400" to={policyPage}>
                <strong>Policies</strong>
              </Link>
            </span>

            <AppBtn
              className="w-full bg-[#FAA21B]  text-[#000] mt-3"
              title="Proceed"
              type={"submit"}
              spinner={authState.signupStatus === "loading"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
