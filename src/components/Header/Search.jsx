import React, { useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";

import Logo from "./Logo";

const Search = ({ setSearchToggle }) => {
  const { productData } = useSelector((state) => state.ProductDataReducer);
  const hotProducts = productData.slice(1, 5);
  const [productSearch, setProductSearch] = useState(hotProducts);
  const [valueSearch, setValueSearch] = useState("");

  const handleSearch = (e) => {
    setValueSearch(e.target.value);
    if (!e.target.value) return setProductSearch(hotProducts);

    const resultsArray = productData.filter((item) =>
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
        <div className="max-w-[96vw] flex justify-around items-center pt-8 px-2 md:py-4 md:border-b-[8px] md:border-solid md:border-blue-500">
          <button className="hidden md:block" onClick={() => setSearchToggle(false)}>
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
              Đề xuất
            </h1>
          )}
          <div className="wrap-product mb-32">
            {productSearch.map((item) => (
              <div key={item.productId} className="item-product relative border-blue-hover">
                <a
                  className="add-btn"
                  href={item.productLink}
                >
                  <MdProductionQuantityLimits size={12} />
                </a>
                <Link
                  to={`/products/product-detail/${item.productId}`}
                  key={item.productId}
                  onClick={() => {
                    setSearchToggle(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="img-product">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="h-full rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="mt-8 mb-2 truncate">{item.productName}</h2>
                    <h2 className="font-bold">{item.productPrice} VND</h2>
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
