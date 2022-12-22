import React, { useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { formatCurrency } from "../../utils/currencyFormart";
import Logo from "./Logo";

const Search = ({ setSearchToggle }) => {
  const { products } = useSelector((state) => state.ProductReducer);
  const hotProducts = products.slice(4, 9);
  const [productSearch, setProductSearch] = useState(hotProducts);
  const [valueSearch, setValueSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setValueSearch(e.target.value);
    if (!e.target.value) return setProductSearch(hotProducts);

    const resultsArray = products.filter((item) =>
      item.productName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    );
    setProductSearch(resultsArray);
  };

  return (
    <div className="overlay">
      <div
        className="w-[98vw] md:w-full bg-[#f6f6f6] mx-auto h-[90vh] mt-[10vh] shadow-2xl 
        rounded-tl-3xl rounded-tr-3xl overflow-hidden relative md:h-[100vh] md:mt-0 md:rounded-none "
      >
        <div className="max-w-[96vw] flex justify-around items-center pt-8 px-2 md:py-4 md:border-b-[8px] md:border-solid md:border-[#115e5c]">
          <button onClick={() => setSearchToggle(false)}>
            <Logo />
          </button>
          <div className="flex bg-white items-center rounded-xl w-[60%] overflow-hidden sm:max-w-[440px] md:min-w-[400px] ">
            <span className="p-3 flex justify-center items-center rounded-xl">
              <CiSearch />
            </span>
            <input
              type="text"
              onChange={handleSearch}
              className="py-2 px-3 pl-0 rounded-xl outline-none"
            />
          </div>
          <button
            onClick={() => setSearchToggle(false)}
            className="p-3 rounded-xl shadow-2xl bg-white"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="mt-12 md:mt-0 lg:px-4 xl:mx-[10%] 2xl:mx-[16%] h-[85vh] overflow-y-scroll scroll">
          {valueSearch.length > 0 ? (
            <h1 className="text-[#fe7c22] text-[18px] font-medium mx-4 md:mt-8">
              Results for search "{valueSearch}"
            </h1>
          ) : (
            <h1 className="text-[#fe7c22] text-[18px] font-medium mx-4 md:mt-8 mb-3">
              Most searched
            </h1>
          )}
          <div className="wrap-product">
            {productSearch.map((item) => (
              <div className="item-product relative border-blue-hover">
                <button
                  className="add-btn"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: { product: item, quantity: 1 },
                    });
                    toast.success("Added product successfully!");
                  }}
                >
                  <AiOutlinePlus size={12} />
                </button>
                <Link
                  to={`/products/${item.productId}`}
                  key={item?.productId}
                  onClick={() => {
                    setSearchToggle(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="img-product">
                    <img
                      src={item?.imageUrl}
                      alt={item?.productName}
                      className="h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="mt-8 mb-2">{item?.productName}</h2>
                    <h2 className="font-bold">{formatCurrency(item.price)}</h2>
                    <p className="line-through text-gray-300">
                      {formatCurrency(item.price * 3)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
