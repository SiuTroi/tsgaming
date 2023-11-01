import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";

import { ref, child, get } from "firebase/database";
import { database } from "../../firebase";

import speedTransport from "../../assets/freeship.png";
import Loading from "../Loading";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState({});

  const dbRef = ref(database);
  useEffect(() => {
    const getProductDataByIdAsync = async () => {
      await get(child(dbRef, `product_data/${productId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          setProductDetail(snapshot.val());
        }
      });
    };
    getProductDataByIdAsync();
  }, [productId]);

  console.log(typeof productDetail?.productId);
  return (
    <>
      {productDetail?.productId || productDetail?.productId === 0 ? (
        <div className="container mt-32 mx-auto px-4 lg:px-[12%] sm:px-8 xl:px-[14%] 2xl:px-[16%] scroll">
          <div className="flex flex-col sm:flex-row rounded-lg bg-white px-2 py-6">
            <div className="w-full sm:w-[40%] mb-4 md:flex md:justify-center md:items-center md:h-2/3 rounded-lg px-2">
              <img
                src={productDetail?.productImage}
                alt={productDetail?.productName}
                className="h-full px-2 rounded-2xl"
              />
            </div>

            <div className="w-full sm:w-[60%] mb-4 px-2">
              <h1 className="font-semibold text-[20px] overflow-hidden">
                {productDetail?.productName}
              </h1>
              <div className="bg-[#e5e7eb] w-full py-3 flex justify-center items-center rounded-lg my-4">
                <h3 className="font-semibold text-blue-500">
                  ₫{productDetail?.productPrice}
                </h3>
              </div>
              <div className="mt-6">
                <p className="flex text-gray-400">
                  Vận chuyển{" "}
                  <span className="flex px-4 text-[#222]">
                    <img
                      src={speedTransport}
                      alt=""
                      className="h-[20px] mr-1"
                    />{" "}
                    Miễn phí vận chuyển
                  </span>
                </p>
                <p className="flex items-center text-gray-400">
                  Tài trợ{" "}
                  <span className="flex items-center px-4 text-[#222]">
                    <img
                      src={productDetail?.sponsorAvatar}
                      alt=""
                      className="h-[28px] mr-1 rounded-full"
                    />{" "}
                    {productDetail?.sponsorName}
                  </span>
                </p>
              </div>
              <a
                href={productDetail?.productLink}
                target="_blank"
                className="flex items-center max-w-[120px] bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg mt-2"
              >
                <MdProductionQuantityLimits className="text-white mx-1" />
                <span className="text-white">Đặt hàng</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg mt-8 px-4 py-6">
            <div className="bg-[#e5e7eb] w-full p-3 rounded-lg my-4">
              <h3 className="font-semibold text-[#222]">MÔ TẢ SẢN PHẨM</h3>
            </div>
            <p
              className="mt-2 text-gray-500"
              dangerouslySetInnerHTML={{
                __html: productDetail?.productDescription,
              }}
            ></p>
          </div>
          <ProductList />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProductDetail;
