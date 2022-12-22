import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import cartemty from "../assets/cartemty.png";
import { AiOutlineClose } from "react-icons/ai";
import Modalpay from "./Modalpay";
import {formatCurrency} from "../utils/currencyFormart"

const CheckOut = () => {
  const { products, totalPrice } = useSelector((state) => state.CartReducer);
  const user = useSelector((state) => state.UserReducer);
  const [isLogin, setIsLogin] = useState(false);
  const [isShowModalPay, setIsShowModalPay] = useState(false)
  const dispatch = useDispatch();
  const shippingCost = 10;

  const handleCheckout = () => {
    if (user?.userid) {
      setIsShowModalPay(true)
    } else {
      setIsLogin(true);
    }
  };

  return (
    <>
      {isLogin && (
        <div className="overlay pt-16 ">
          <div className="bg-white h-[50%] w-[70vw] md:w-[50vw] xl:w-[30vw] mx-auto mt-12 px-6 pt-10 rounded-xl modal-animation ">
            <div className="text-right">
              <button
                className="p-2 rounded-lg bg-[#f6f6f6] shadow-2xl"
                onClick={() => setIsLogin(false)}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
            <h2 className='text-2xl text-blue-500 font-bold text-center'>Beauty.bd</h2>
            <h1 className="text-center font-semibold text-lg mb-12">
              Login to checkout
            </h1>
            <div className="lg:flex lg:flex-col lg:justify-center lg:items-center">
              <Link to={"/login"} className="lg:w-[220px]">
                <button className="w-full bg-blue-500 py-2 rounded-2xl text-white hover:bg-blue-600">
                  Login
                </button>
              </Link>
              <p className="text-center">or</p>
              <Link to={"/signup"} className="lg:w-[220px]">
                <button className="w-full bg-transparent text-blue-500 border border-solid border-blue-500 hover:bg-blue-600 hover:text-white py-2 rounded-2xl">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="scroll mt-14 md:container md:mx-auto xl:px-48">
        <div className="bg-white mt-5 mb-3 py-3 shadow-lg rounded-lg">
          <h2 className="text-[18px] font-semibold text-center">
            My Shopping Cart
          </h2>
        </div>
        <div className="w-full flex flex-col gap-6 lg:flex-row">
          {products.length >= 1 ? (
            <div className="w-full">
              <div className="flex flex-col md:flex-row flex-wrap gap-2 pb-[50vh] px-2">
                {products.map((item) => (
                  <div
                    key={item.productId}
                    className="shadow-lg w-full md:w-[48%] 2xl:w-[32%] flex items-center gap-4 px-4 py-3 bg-white rounded-lg"
                  >
                    <div className="w-1/4">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="lg:max-w-[80%] lg:mx-auto"
                      />
                    </div>
                    <div className="w-3/4 flex flex-col">
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-[18px]">
                            {item.productName}
                          </h3>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "REMOVE",
                                payload: item.productId,
                              })
                            }
                          >
                            <RiDeleteBin6Fill size={20} color="#EF4444" />
                          </button>
                        </div>
                        <p className="text-gray-500 text-[15px] line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="bg-gray-200 w-[90px] flex items-center justify-around rounded-md">
                          <button
                            className="px-2 text-[22px] text-[#FF7300]"
                            onClick={() => {
                              if (item.quantity <= 1) {
                                if (window.confirm("Do you want to remove the product from the cart?")) {
                                  dispatch({
                                    type: "REMOVE",
                                    payload: item.productId,
                                  });
                                }
                              }
                              if (item.quantity > 1) {
                                dispatch({
                                  type: "DECREASE",
                                  payload: item.productId,
                                });
                              }
                            }}
                          >
                            -
                          </button>
                          {item.quantity}
                          <button
                            className="px-2 text-[22px] text-[#FF7300]"
                            onClick={() =>
                              dispatch({
                                type: "INCREASE",
                                payload: item.productId,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                        <h3 className="font-semibold">
                          {formatCurrency(item.price)}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-48 flex justify-center items-center">
              <div className="md:w-[40%] h-full">
                <img src={cartemty} alt="" className="h-full mx-auto" />
                <h2 className="text-center font-bold text-xl">
                  You have no products in cart
                </h2>
                <Link to={`/products`}>
                  <button className="block w-full lg:w-1/2 mx-auto rounded-xl border border-solid border-blue-500 text-blue-500 mt-2 py-2 
                  hover:bg-blue-500 hover:text-white">
                    Continue shopping
                  </button>
                </Link>
              </div>
            </div>
          )}
          <div className="w-full bg-gray-200 fixed bottom-16 md:bottom-0 right-0 left-0">
            <div className="md:container md:mx-auto xl:px-48">
              <div className="bg-gray-100 px-4 py-2 md:py-3 rounded-lg lg:w-[60%]">
                <h3 className="font-semibold text-[18px] mb-3">Order info</h3>
                <p className="flex justify-between items-center">
                  <span className=" text-gray-400">Subtotal:</span>
                  <span className="font-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className=" text-gray-400">Shipping Cost:</span>
                  <span className="font-semibold">
                    {formatCurrency(products.length >= 1 ? shippingCost : 0)}
                  </span>
                </p>
                <h1 className="flex justify-between items-center font-semibold text-[22px] mt-2">
                  <span>Total:</span>{" "}
                  <span>
                    {formatCurrency(totalPrice + (products.length >= 1 ? shippingCost : 0))}
                  </span>
                </h1>
              </div>
              <div className="w-full md:mt-2 px-1 pb-1 lg:w-[60%]">
                <button
                  className={`w-full rounded-xl bg-blue-500 text-white py-2 ${
                    products.length === 0 && "cursor-not-allowed bg-blue-300"
                  }`}
                  disabled={products.length === 0 && true}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowModalPay && <Modalpay setIsShowModalPay={setIsShowModalPay} />}
    </>
  );
};

export default CheckOut;
