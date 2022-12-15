import { useState, useEffect } from "react";
import { ref, child, get, set } from "firebase/database";
import { database } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import clapping from "../assets/clapping.png";
import { AiOutlineClose } from "react-icons/ai";
import Modalpay from "./Modalpay";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { products, totalPrice } = useSelector((state) => state.CartReducer);
  const { product } = useSelector((state) => state.ProductReducer);
  const user = useSelector((state) => state.UserReducer);
  const [isLogin, setIsLogin] = useState(false);
  const [isShowModalPay, setIsShowModalPay] = useState(false)
  const [isCheckout, setIsCheckout] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const shippingCost = 10;

  // console.log(!user)
  const dbRef = ref(database);
  useEffect(() => {
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        setUsers(snapshot.val());
      }
    });
  }, [])

  const handleCheckout = () => {
    if (user?.userid) {
      setIsShowModalPay(true)
    } else {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsCheckout(false);
    }, 4000);
    return () => clearTimeout(timerId);
  }, [isCheckout]);

  return (
    <>
      {isLogin && (
        <div className="overlay">
          <div className="bg-white h-[60vh] w-[70vw] md:w-[50vw] xl:w-[30vw] mx-auto mt-12 px-6 pt-10 rounded-xl">
            <div className="text-right">
              <button
                className="p-2 rounded-lg bg-[#f6f6f6] shadow-2xl"
                onClick={() => setIsLogin(false)}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
            <h1 className="text-center font-semibold text-lg mb-12">
              Login to checkout
            </h1>
            <div>
              <Link to={"/login"}>
                <button className="w-full bg-blue-500 mb-3 py-2 rounded-2xl text-white">
                  Login
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="w-full bg-transparent text-blue-500 border border-solid border-blue-500 py-2 rounded-2xl">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="scroll md:container md:mx-auto xl:px-48">
        <div className="bg-white mt-5 mb-3 py-3 shadow-lg rounded-lg">
          <h2 className="text-[18px] font-semibold text-center">
            My Shopping Cart
          </h2>
        </div>
        <div className="w-full flex flex-col gap-6 lg:flex-row">
          {products.length >= 1 ? (
            <div className="lg:w-[60%]">
              <div className="flex flex-col gap-2">
                {products.map((item) => (
                  <div
                    key={item.productId}
                    className="shadow-lg flex items-center gap-4 px-4 py-3 bg-white rounded-lg"
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
                        <p className="text-gray-500 text-[15px]">
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
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.price)}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="lg:w-[60%]">
              <h2 className="text-center mt-12 font-bold text-xl">
                You have no products in cart
              </h2>
            </div>
          )}
          <div className="lg:w-[40%]">
            <div className="bg-gray-100 px-4 py-3 rounded-lg">
              <h3 className="font-semibold text-[18px] mb-3">Order info</h3>
              <p className="flex justify-between items-center">
                <span className=" text-gray-400">Subtotal:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(totalPrice)}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span className=" text-gray-400">Shipping Cost:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(products.length >= 1 ? shippingCost : 0)}
                </span>
              </p>
              <h1 className="flex justify-between items-center font-semibold text-[22px] mt-2">
                <span>Total:</span>{" "}
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    totalPrice + (products.length >= 1 ? shippingCost : 0)
                  )}
                </span>
              </h1>
            </div>
            <div className="w-full px-1">
              <button
                className={`w-full rounded-xl bg-blue-500 text-white mt-2 py-2 ${
                  products.length === 0 && "cursor-not-allowed bg-blue-300"
                }`}
                disabled={products.length === 0 && true}
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <Link to={`/products/${product.productName}`}>
                <button className="block w-full rounded-xl border border-solid border-blue-500 text-blue-500 mt-2 py-2">
                  Continue shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
        {isCheckout && (
          <div
            className="fixed items-center w-[300px] gap-2 left-4 bottom-4 bg-[#10B981] rounded-xl z-50 
        flex "
          >
            <div className="w-[42px]">
              <img src={clapping} alt="clapping" />
            </div>
            <p className="flex-1 text-white">Thank your for purchchased!!!</p>
          </div>
        )}
      </div>
      {isShowModalPay && <Modalpay setIsShowModalPay={setIsShowModalPay} />}
    </>
  );
};

export default CheckOut;
