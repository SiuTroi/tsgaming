import { Formik } from "formik";
import { ref, child, get, set } from "firebase/database";
import { database } from "../../firebase";
import * as Yup from "yup"
import { Link, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `users`)).then((snapshot) => {
      if(snapshot.exists()) {
        setUsers(snapshot.val())
      } else {
        console.log("No data available")
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div>
        <div className="max-w-lg mx-auto px-16 pt-16 pb-24 mt-12 bg-white rounded-2xl shadow-xl">
        {loading && <div className='overlay z-9999'><div className='absolute-center loading'></div></div>}

        <h1 className="text-center font-semibold text-[22px] mb-12">Log in</h1>
        <Formik
              initialValues={{ email: "", password: "", loginError: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("E-mail không hợp lệ.")
                  .required("Trường này là bắt buộc!"),
                password: Yup.string().required("Trường này là bắt buộc!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                users.map(item => {
                    if (values.email === item.email && values.password === item.password) {
                        dispatch({
                          type: "USER_LOGIN",
                          payload: {
                            userid: item.userid,
                            username: item.username,
                            email: values.email,
                            password: values.password,
                          },
                        });
                        navigate(-1);
                    }
                })
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
                      className="w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                      border border-solid border-[#ededed] p-3"
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
                      className="w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                      border border-solid border-[#ededed] p-3"
                      value={values.password}
                      placeholder="********"
                    />
                    <p className="text-red-600 text-left font-light text-[14px]">
                      {errors.password && touched.password && errors.password}
                    </p>
                    
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
  )
}

export default LoginForm