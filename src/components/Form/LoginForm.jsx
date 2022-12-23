import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { users } = useSelector(state => state.UserReducer)
  const [loading, setLoading] = useState(false)
  const [isLoginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className="px-2">
      <div className="max-w-lg mx-auto mt-20 px-16 pt-16 pb-24 bg-white rounded-2xl shadow-xl">
        {loading && <div className='overlay z-9999'><div className='absolute-center loading'></div></div>}
        <div className="text-right">
          <button
            className="p-2 rounded-lg bg-[#f6f6f6] shadow-2xl"
            onClick={() => navigate(-1)}
          >
            <AiOutlineClose size={16} />
          </button>
        </div>
        <div>
          <h1 className="h1 font-semibold text-[28px]">Login</h1>
            <p className="mb-8 font-light text-[14px]">
              You have no any account?{" "}
              <Link to={"/signup"} className="text-blue-600 font-normal">
                Signup here
              </Link>
            </p>
        </div>
        <Formik
          initialValues={{ email: "", password: ""}}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("E-mail not valid!")
              .required("E-mail is required!"),
            password: Yup.string().required("Password is required!"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true)
            setTimeout(() => {
              users.map(item => {
                // Check user account with account on system
                if (
                  values.email === item.email &&
                  values.password === item.password
                ) {
                  dispatch({
                    type: "USER_LOGIN",
                    payload: {
                      userid: item.userid,
                      username: item.username,
                      email: values.email,
                      password: values.password,
                    },
                  });
                  navigate(`/`);
                  toast.success("Login successfully!!");
                } else {
                  setLoginError(true);
                }
              });
              setLoading(false)
            }, 1000)
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
            <form onSubmit={handleSubmit} className="w-full" id="evaluate-form">
              <div className="w-full my-4">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-4 rounded-2xl outline-blue-400 text-[12px] font-light 
                      border border-solid p-3 ${
                        errors.email && touched.email && errors.email
                          ? "border-red"
                          : "border-[#ededed]"
                      }`}
                  value={values.email}
                  placeholder="E-mail"
                />
                <p className="text-red-600 text-left font-light text-[14px]">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className="w-full my-4">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full py-3 px-4 rounded-2xl outline-blue-400 text-[12px] font-light 
                      border border-solid border-[#ededed] p-3 ${
                        errors.password && touched.password && errors.password
                          ? "border-red"
                          : "border-[#ededed]"
                      }`}
                  value={values.password}
                  placeholder="********"
                />
                <p className="text-red-600 text-left font-light text-[14px]">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Validate when wrong user accont */}
                {isLoginError && (
                  <p className="text-red-600 text-left font-light">
                    wrong email or password!
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="text-[14px] font-light my-2 p-4 rounded-2xl 
                    w-full bg-blue-500 text-white"
              >
                Đăng nhập
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
