import { useEffect, useState } from 'react'
import { ref, child, get, set } from "firebase/database";
import { database } from "../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Modalpay = ({ setIsShowModalPay }) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { products } = useSelector((state) => state.CartReducer);
    const user = useSelector((state) => state.UserReducer);
    const navigate = useNavigate()
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
        if(window.confirm("Xác nhận đây là địa chỉ để nhận hàng?")){
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
        }
    };

  return (
    <>
        {loading && <div className='overlay z-9999'><div className='absolute-center loading'></div></div>}
        <div className='overlay flex justify-center items-center'>
            <div className='bg-white w-[92vw] h-[96vh] relative rounded-2xl shadow-xl px-6 pt-12 lg:w-[70vw] xl:w-[60vw] 2xl:w-[50vw]'>
                <button className='absolute top-4 right-4' 
                onClick={() => setIsShowModalPay(false)}>
                    <AiOutlineClose size={24} />
                </button>
                <div>
                    <h1 className='h1 text-[22px]'>Thông tin thanh toán</h1>
                    <Formik
                        initialValues={{ 
                            fullName: "",
                            email: "" , 
                            phone: "", 
                            address: "" 
                        }}
                        validationSchema={Yup.object({
                            fullName: Yup.string().required("Họ tên là bắt buộc!"),
                            email: Yup.string().email("Email không hợp lệ!"),
                            phone: Yup.string().required("SĐT tên là bắt buộc!"),
                            address: Yup.string().required("Địa chỉ là bắt buộc!"),
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
                                    <label htmlFor="fullName">Họ tên <span className='text-red-600'>*</span> </label>
                                    <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                                    border border-solid border-[#ededed] p-3"
                                    value={values.fullName}
                                    placeholder="Họ tên người nhận. VD: Nguyễn. A"
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
                                    className="w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                                    border border-solid border-[#ededed] p-3"
                                    value={values.email}
                                    placeholder="VD: NguyenA@gmail.com"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                    {errors.email && touched.email && errors.email}
                                    </p>
                                </div>
                                <div className="w-full my-4">
                                    <label htmlFor="phone">Số điện thoại <span className='text-red-600'>*</span></label>
                                    <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                                    border border-solid border-[#ededed] p-3"
                                    value={values.phone}
                                    placeholder="VD: 0123456789"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                    {errors.phone && touched.phone && errors.phone}
                                    </p>
                                </div>
                                <div className="w-full my-4">
                                    <label htmlFor="address">Địa chỉ <span className='text-red-600'>*</span></label>
                                    <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                                    border border-solid border-[#ededed] p-3"
                                    value={values.address}
                                    placeholder="VD: 2/27, p.Hiệp Phú, Thủ Đức, HCM"
                                    />
                                    <p className="text-red-600 text-left font-light text-[14px]">
                                        {errors.address && touched.address && errors.address}
                                    </p>
                                </div>
                            <button
                                type="submit"
                                className="text-[14px] font-light my-2 p-4 rounded-2xl 
                                w-full bg-[#167674] text-white md:w-[220px]"
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