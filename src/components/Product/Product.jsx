import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/currencyFormart";
import { AiOutlineClose } from "react-icons/ai";
import { FcFilledFilter } from "react-icons/fc";
import { toast } from "react-toastify";

const Product = () => {
  const { products } = useSelector((state) => state.ProductReducer);
  const [isShowModalFilter, setShowModalFilter] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [productMap, setProductMap] = useState(products);
  const [isCancelFilter, setCancelFilter] = useState(false);
  const [filterValue, setFilterValue] = useState({
    from: "",
    to: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setFilterValue({
      ...filterValue,
      [e.target.name]: value,
    });
  };

  const handleFilter = () => {
    // filter product follow by price
    const getFilterProduct = (from, to) =>
      products.filter((item) => item.price > from && item.price < to);
    const productFilter = getFilterProduct(filterValue.from, filterValue.to);

    // set productMap follow by isShowModalFilter false or true
    const x = isShowModalFilter ? productFilter : products;
    setProductMap(x);
    setCancelFilter(true);
    setShowModalFilter(false);
  };

  const handleCancelFilter = () => {
    setCancelFilter(false);
    setProductMap(products);
  };

  // Responesive for screen < 350
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className="pb-20 px-4 mt-16 lg:px-[12%] sm:px-8 xl:px-[14%] 2xl:px-[16%]">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-[24px] mb-3 ml-3 text-blue-500">
          All Product
        </h1>
        {isCancelFilter ? (
          <button
            onClick={handleCancelFilter}
            className="bg-transparent px-6 py-2 rounded-2xl shadow-2xl hover:bg-blue-500 hover:text-white 
            transition-all duration-500"
          >
            Cancel filter
          </button>
        ) : (
          <button
            className="flex gap-2 items-center mr-6"
            onClick={() => setShowModalFilter(true)}
          >
            <span>Filter</span>
            <FcFilledFilter size={22} />
          </button>
        )}
        {isShowModalFilter && (
          <div className="overlay">
            <div className="w-full md:w-[40vw] xl:w-[30vw] bg-white h-full ml-auto p-6">
              <div className="flex items-center">
                <h1 className="flex-1 text-center font-bold text-2xl text-blue-500">
                  Filter by price
                </h1>{" "}
                <button onClick={() => setShowModalFilter(false)}>
                  <AiOutlineClose size={24} />
                </button>
              </div>

              <h3 className="h3 text-[20px] font-medium mt-16">Price:</h3>
              <div className="mt-4">
                <div className="flex items-center my-3">
                  <label htmlFor="from" className="w-16 text-gray-400">
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    id="from"
                    className="flex-1 px-2 py-1 outline-none border border-solid border-blue-500 rounded-lg "
                    value={filterValue.from}
                    onChange={handleChange}
                  />
                  <span className="ml-2">$</span>
                </div>
                <div className="flex items-center my-3">
                  <label htmlFor="to" className="w-16 text-gray-400">
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    id="to"
                    className="flex-1 px-2 py-1 outline-none border border-solid border-blue-500 rounded-lg "
                    value={filterValue.to}
                    onChange={handleChange}
                  />
                  <span className="ml-2">$</span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-transparent px-6 py-2 rounded-2xl shadow-2xl hover:bg-blue-500 hover:text-white 
                  transition-all duration-500"
                  onClick={handleFilter}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:flex md:gap-4 scroll">
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center sm:justify-start">
          {productMap.length > 0 ? (
            productMap.map((item) => (
              <div
                key={item.productId}
                className={`relative md:w-[32%] lg:w-[24vw] xl:w-[17vw] 2xl:w-[16vw]
            ${width < 350 ? "w-full" : "w-[48%]"} relative mb-4`}
              >
                <button
                  className="add-btn hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: { product: item, quantity: 1 },
                    });
                    toast.success("Added product successfully!!");
                  }}
                >
                  +
                </button>
                <Link to={`/products/${item.productId}`}>
                  <div
                    className="h-[260px] sm:h-[321px] 2xl:h-[360px] bg-white p-8 rounded-[30px] 
                    hover:border-[2px] hover:border-solid hover:border-blue-500 flex justify-center items-center"
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-full mx-auto min-w-[120px] sm:w-full md:h-[215px] object-contain"
                    />
                  </div>
                  <div className="">
                    <h1 className="mt-2 mb-3 font text-[#4d4d4d]">
                      {item.productName}
                    </h1>
                    <span className="font-extrabold text-[20px] mr-2">
                      {formatCurrency(item.price)}
                    </span>{" "}
                    <span className="line-through text-gray-400">
                      {formatCurrency(item.price * 3)}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="h-[50vh] mt-8 ml-4">
              <h1 className="text-center font-medium text-2xl">
                There are no matching products for this filter
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
