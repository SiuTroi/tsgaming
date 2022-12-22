import { useEffect, useState } from 'react'
import { ref, child, get, set } from "firebase/database";
import { database } from "../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Modalpay = ({ setIsShowModalPay }) => {
    const [users, setUsers] = useState([]);
    const { products } = useSelector((state) => state.CartReducer);
    const user = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch()
    const dbRef = ref(database);

    useEffect(() => {
        get(child(dbRef, `users`)).then((snapshot) => {
          if (snapshot.exists()) {
            setUsers(snapshot.val());
          }
        });
      }, []);
    
    const handleCheckout = (values) => {
        if(window.confirm("Confirm this is the address to receive the goods?")){
            const find = users.find((item) => item.userid === user.userid);
            const x = products.filter(
                (item) =>
                (item.infoPayer = {
                    timeOfPayment: `${new Date().getHours()}:${new Date().getMinutes()} | ${new Date().toLocaleDateString()}`,
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    address: values.address
                })
            );
            if (find) {
                set(child(dbRef, `users/${find.userid}`), {
                    ...find,
                    historycheckout: [...(find?.historycheckout ?? []), ...x],
                });
            }
            if (!find) {
                set(child(dbRef, `users/${users.length}`), {
                    ...find,
                    userid: user.userid,
                    historycheckout: [...x],
                });
            }

            dispatch({ type: "RESET_CART" });
            setIsShowModalPay(false)
            toast.success("Order successfully!!")
        }
    };

  return (
    <>
        <div className='overlay flex justify-center items-center'>
            <div className='bg-white w-[92vw] h-[96vh] relative rounded-2xl shadow-xl px-6 pt-12 lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw] modal-animation'>
                <button className='absolute top-4 right-4' 
                onClick={() => setIsShowModalPay(false)}>
                    <AiOutlineClose size={24} />
                </button>
                <div>
                    <h1 className='h1 text-[22px]'>Information checkout</h1>
                    <Formik
                        initialValues={{ 
                            fullName: "",
                            email: "" , 
                            phone: "", 
                            address: "" 
                        }}
                        validationSchema={Yup.object({
                            fullName: Yup.string().required("fullName is required!"),
                            email: Yup.string().email("Email not valid!"),
                            phone: Yup.string().required("phone is required!"),
                            address: Yup.string().required("address is required!"),
                        })}
                        onSubmit={(values, { setSubmitting }) => handleCheckout(values)}
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
                                    <label htmlFor="fullName">Full name: <span className='text-red-600'>*</span> </label>
                                    <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full py-3 px-4 rounded-2xl outline-blue-400 text-[12px] font-light 
                                    border border-solid p-3 ${errors.fullName && touched.fullName && errors.fullName ? "border-red" : "border-[#ededed]"}`}
                                    value={values.fullName}
                                    placeholder="recipient's name. Ex: Nguyễn. A"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                    {errors.fullName && touched.fullName && errors.fullName}
                                    </p>
                                </div>
                                <div className="w-full my-4">
                                    <label htmlFor="email">E-mail</label>
                                    <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full py-3 px-4 rounded-2xl outline-blue-400 text-[12px] font-light 
                                    border border-solid p-3 ${errors.email && touched.email && errors.email ? "border-red" : "border-[#ededed]"}`}
                                    value={values.email}
                                    placeholder="Ex: NguyenA@gmail.com"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                    {errors.email && touched.email && errors.email}
                                    </p>
                                </div>
                                <div className="w-full my-4">
                                    <label htmlFor="phone">Phone: <span className='text-red-600'>*</span></label>
                                    <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full py-3 px-4 rounded-2xl outline-blue-400 text-[12px] font-light 
                                    border border-solid p-3 ${errors.phone && touched.phone && errors.phone ? "border-red" : "border-[#ededed]"}`}
                                    value={values.phone}
                                    placeholder="Ex: 0123456789"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                    {errors.phone && touched.phone && errors.phone}
                                    </p>
                                </div>
                                <div className="w-full my-4">
                                    <label htmlFor="address">Address <span className='text-red-600'>*</span></label>
                                    <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full py-3 px-4 rounded-2xl outline-blue-400 text-[12px] font-light 
                                    border border-solid p-3 ${errors.address && touched.address && errors.address ? "border-red" : "border-[#ededed]"}`}
                                    value={values.address}
                                    placeholder="Ex: 2/27, p.Hiệp Phú, Thủ Đức, HCM"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                        {errors.address && touched.address && errors.address}
                                    </p>
                                </div>
                            <button
                                type="submit"
                                className="text-[14px] font-light my-2 p-4 rounded-2xl 
                                w-full bg-blue-500 text-white md:w-[220px]"
                            >
                            Xác nhận
                            </button>
                            </form>
                        )}
                        </Formik>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modalpay