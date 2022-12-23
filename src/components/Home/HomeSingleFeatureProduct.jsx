import React from "react";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/currencyFormart";
import { toast } from "react-toastify";

const HomeSingleFeatureProduct = () => {
  const {products} = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const decreaseProduct = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div>
          <div
            className="pt-12 bg-transparent lg:flex  lg:px-4 xl:mx-[10%] 2xl:mx-[16%]"
          >
            <div className="py-2 mx-auto lg:bg-white lg:w-1/2 lg:flex lg:justify-center lg:items-center lg:rounded-2xl lg:shadow-xl">
              <img
                src={products[9]?.imageUrl}
                alt={products[9]?.productName}
                className="w-[250px] mx-auto"
              />
            </div>
            <div className="px-4 flex flex-col bg-transparent lg:w-1/2">
              <div className="mt-12">
                <p className="text-gray-400">Sell off 0%</p>
                <h3 className="text-lg">{products[9]?.productName}</h3>
              </div>
              <div className="flex items-center gap-4 my-6">
                <div className="flex items-center gap-4 border-green rounded-3xl">
                  <button
                    onClick={decreaseProduct}
                    className={`p-2 ${quantity === 1 && "disabled"}`}
                  >
                    <AiOutlineMinus />
                  </button>
                  <p>{quantity}</p>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="flex items-center flex-wrap gap-3">
                  <h2 className="font-bold">
                    {formatCurrency(products[9]?.price)}
                  </h2>
                  <p className="text-gray-400 line-through">
                    {formatCurrency(products[9]?.price * 6)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1 items-center">
                  <AiFillStar color="#fd7f28" />
                  <AiFillStar color="#fd7f28" />
                  <AiFillStar color="#fd7f28" />
                  <AiFillStar color="#fd7f28" />
                  <BsStarHalf color="#fd7f28" />
                </div>
                <p className="underline font-light text-[14px]">124 Evaluate</p>
              </div>
              <div className="my-4 pt-4">
                <p className="font-normal text-[14px] text-justify text-[#0000008f]">
                  {products[9]?.description}
                </p>
                <div className="flex flex-col w-full my-16">
                  <button
                    className="w-full flex justify-center items-center py-4 text-white bg-[#fe7c22] hover:bg-[#fb700d] gap-2 rounded-xl
                     transition-all duration-500"
                    onClick={() =>{
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: { product: products[9], quantity: quantity },
                      }); toast.success("Added product successfully!!")}
                    }
                  >
                    <CiShoppingCart color="white" size={18} />
                      Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default HomeSingleFeatureProduct;
