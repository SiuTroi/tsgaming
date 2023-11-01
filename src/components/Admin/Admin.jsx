import { Formik } from "formik";
import { child, get, ref, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase";
import { useState } from "react";
import Filebase64 from "react-file-base64";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetCountDatabase } from "../../hooks/useGetCountDatabase";

function Admin() {
  const count = useGetCountDatabase();
  const { productData } = useSelector((state) => state.ProductDataReducer);
  const [imageBase64, setImageBase64] = useState({
    productImg: "",
    sponsorAvatar: "",
  });
  const [productDescription, setProductDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dbRef = ref(database);

  return (
    <div className="mt-12">
      <Formik
        initialValues={{
          productName: "",
          productPrice: "",
          productLink: "",
          productDescription: "",
          sponsorName: "",
          discount: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // (set) Data push to firebase
            set(child(dbRef, `product_data/${count}`), {
              productId: count,
              productName: values.productName,
              productPrice: values.productPrice,
              productImage: imageBase64.productImg,
              productLink: values.productLink,
              productDescription: productDescription,
              sponsorAvatar: imageBase64.sponsorAvatar,
              sponsorName: values.sponsorName,
              discount: values.discount,
            });
            dispatch({
              type: "CREATE_NEW_PRODUCT",
              payload: {
                productId: count,
                productName: values.productName,
                productPrice: values.productPrice,
                productImage: imageBase64.productImg,
                productLink: values.productLink,
                productDescription: productDescription,
                sponsorAvatar: imageBase64.sponsorAvatar,
                sponsorName: values.sponsorName,
                discount: values.discount,
              },
            });
            setSubmitting(false);
            navigate(`/siutroiAdmin`);
            toast.success("create successfully!!");
          }, 1000);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto px-16 pt-16 pb-24 mt-20 bg-white rounded-2xl shadow-xl"
            id="evaluate-form"
          >
            <div className=" justify-between">
              {/* Product name */}
              <div className="mt-4 mb-2">
                <label htmlFor="productName">Tên Sản Phẩm</label>
                <input
                  type="text"
                  name="productName"
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3 `}
                  value={values.productName}
                  placeholder="Tên Sản Phẩm"
                />
              </div>

              {/* Price */}
              <div className="mt-4 mb-2">
                <label htmlFor="productPrice">Giá Sản Phẩm</label>
                <input
                  type="text"
                  name="productPrice"
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3`}
                  value={values.productPrice}
                  placeholder="Giá"
                />
              </div>
            </div>
            <div className=" justify-between">
              {/* Image */}
              <div className="mt-4 mb-2">
                <label htmlFor="productImage">Ảnh Sản Phẩm</label>
                <img
                  src={imageBase64.productImg && imageBase64.productImg}
                  alt=""
                  className="mb-3 rounded-xl"
                />
                <Filebase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  name="productImage"
                  value={imageBase64.productImg}
                  onDone={({ base64 }) =>
                    setImageBase64({ ...imageBase64, productImg: base64 })
                  }
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3 `}
                />
              </div>

              {/* Link */}
              <div className="mt-4 mb-2">
                <label htmlFor="productLink">Link Sản Phẩm</label>
                <input
                  type="text"
                  name="productLink"
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3`}
                  value={values.productLink}
                  placeholder="Link sản phẩm"
                />
              </div>
            </div>
            <div className=" justify-between">
              {/* Description */}
              <div className="mt-4 mb-2">
                <label htmlFor="productDescription">Mô tả Sản Phẩm</label>
                <ReactQuill
                  theme="snow"
                  value={productDescription}
                  onChange={setProductDescription}
                />
                {/* <textarea
                  type="text"
                  name="productDescription"
                  onChange={handleChange}
                  className={`w-full py-3 h-48 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3 `}
                  value={values.productDescription}
                  placeholder="Mô tả Sản Phẩm"
                /> */}
              </div>

              {/* sponsorAvatar */}
              <div className="mt-4 mb-2">
                <label htmlFor="sponsorAvatar">Ảnh Tài Trợ</label>
                <img
                  src={imageBase64.sponsorAvatar && imageBase64.sponsorAvatar}
                  alt=""
                  className="mb-3 rounded-xl"
                />
                <Filebase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  name="sponsorAvatar"
                  value={imageBase64.sponsorAvatar}
                  onDone={({ base64 }) =>
                    setImageBase64({ ...imageBase64, sponsorAvatar: base64 })
                  }
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3 `}
                />
              </div>

              {/* sponsorName */}
              <div className="mt-4 mb-2">
                <label htmlFor="sponsorName">Tên Tài Trợ</label>
                <input
                  type="text"
                  name="sponsorName"
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3`}
                  value={values.sponsorName}
                  placeholder="Tên Tài Trợ"
                />
              </div>

              {/* Discount */}
              <div className="mt-4 mb-2">
                <label htmlFor="discount">Giảm giá</label>
                <input
                  type="text"
                  name="discount"
                  onChange={handleChange}
                  className={`w-full py-3 px-4 rounded-2xl outline-none text-[12px] font-light 
                        border border-solid border-[#ededed] p-3`}
                  value={values.discount}
                  placeholder="Giả giá"
                />
              </div>
            </div>

            <button
              type="submit"
              className="text-[12px] font-light mt-4 mb-2 p-4 rounded-2xl 
                    w-full bg-blue-500 text-white"
            >
              Tạo mới sản phẩm
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Admin;
