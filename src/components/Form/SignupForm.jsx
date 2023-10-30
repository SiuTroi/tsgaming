import { useState } from "react";
import { ref, child, set } from "firebase/database";
import { database } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const { users } = useSelector(state => state.UserReducer)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dbRef = ref(database);

  console.log(users)
  return (
    <>
      {loading && (
        <div className="overlay z-9999">
          <div className="absolute-center loading"></div>
        </div>
      )}
      <div className="px-2">
        <div className="max-w-lg mx-auto px-16 pt-16 pb-24 mt-20 bg-white rounded-2xl shadow-xl">
          <div className="">
            <div className="text-right">
              <button
                className="p-2 rounded-lg bg-[#f6f6f6] shadow-2xl"
                onClick={() => navigate(-1)}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
            <div>
              <h1 className="h1 font-semibold text-[28px]">Sign up</h1>
              <p className="mb-8 font-light text-[14px]">
                You have an account?{" "}
                <Link to={"/login"} className="text-blue-600 font-normal">
                  Login here
                </Link>
              </p>
            </div>
            <div className=""></div>
            <div className="divider mt-4">
              <span className="uppercase text-[#8c98a4]">Or</span>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                passwordConfirmed: "",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("firstName is required!"),
                lastName: Yup.string().required("lastName is required!"),
                // Check email user signup must not coincide with any email on system
                email: Yup.string()
                  .email("E-mail not valid!")
                  .notOneOf(
                    users.length > 0 ? users.map((item) => item.email) : [],
                    "Email already exists in the system!"
                  )
                  .required("email is required!"),
                password: Yup.string().required("password is required!"),
                passwordConfirmed: Yup.string()
                  .oneOf([Yup.ref("password"), null], "password not match!")
                  .required("passwordConfirmed is required!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setLoading(true);
                setTimeout(() => {
                  // (set) Data push to firebase
                  set(child(dbRef, `users/${users.length}`), {
                    email: values.email,
                    password: values.password,
                    userid: users.length,
                    username: `${values.firstName} ${values.lastName}`,
                  });
                  dispatch({
                    type: "USER_SIGNUP",
                    payload: {
                      signupemail: values.email,
                      signupusername: `${values.firstName} ${values.lastName}`,
                      signuppassword: values.password,
                      usersignupid: users.length,
                      historycheckout: [],
                    },
                  });
                  setSubmitting(false);
                  setLoading(false);
                  navigate(`/`);
                  toast.success("Signup successfully!!");
                }, 1000);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="w-full"
                  id="evaluate-form"
                >
                  <div className="flex justify-between">
                    <div className="w-[48%] my-2">
                      <input
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3 ${
                          errors.firstName &&
                          touched.firstName &&
                          errors.firstName
                            ? "border-red"
                            : "border-[#ededed]"
                        }`}
                        value={values.firstName}
                        placeholder="first name"
                      />
                      <p className="text-red-600 text-left font-light text-[12px]">
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </p>
                    </div>
                    <div className="w-[48%] my-2">
                      <input
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3 ${
                          errors.lastName && touched.lastName && errors.lastName
                            ? "border-red"
                            : "border-[#ededed]"
                        }`}
                        value={values.lastName}
                        placeholder="last name"
                      />
                      <p className="text-red-600 text-left font-light text-[12px]">
                        {errors.lastName && touched.lastName && errors.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="w-full my-4">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                      border border-solid p-3 ${
                        errors.email && touched.email && errors.email
                          ? "border-red"
                          : "border-[#ededed]"
                      }`}
                      value={values.email}
                      placeholder="E-mail"
                    />
                    <p className="text-red-600 text-left font-light text-[12px]">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="w-full my-4">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                      border border-solid border-[#ededed] p-3 ${
                        errors.password && touched.password && errors.password
                          ? "border-red"
                          : "border-[#ededed]"
                      }`}
                      value={values.password}
                      placeholder="Password"
                    />
                    <p className="text-red-600 text-left font-light text-[12px]">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <div className="w-full my-4">
                    <input
                      type="password"
                      name="passwordConfirmed"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                      border border-solid p-3 ${
                        errors.passwordConfirmed &&
                        touched.passwordConfirmed &&
                        errors.passwordConfirmed
                          ? "border-red"
                          : "border-[#ededed]"
                      } `}
                      value={values.passwordConfirmed}
                      placeholder="Passowrd comfirmed"
                    />
                    <p className="text-red-600 text-left font-light text-[12px]">
                      {errors.passwordConfirmed &&
                        touched.passwordConfirmed &&
                        errors.passwordConfirmed}
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-[12px] font-light my-2 p-4 rounded-2xl 
                    w-full bg-blue-500 text-white"
                  >
                    Đăng ký
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
