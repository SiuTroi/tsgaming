import { NavLink } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const navigation = [
  { title: "Home", route: "/" },
  { title: "Products", route: "/products" },
  { title: "Review", route: "/reviews" },
];
const Navbar = () => {
  const { product } = useSelector((state) => state.ProductReducer);
  const [toggleMenu, setToggleMenu] = useState(false);
  const dispatch = useDispatch()
  console.log(product)
  
  useEffect(() => {
    dispatch({
      type: "GET_PRODUCT",
    });
  }, []);

  return (
    <nav className="w-1/3">
      <ul className="hidden md:flex items-center gap-8">
        {navigation.map((item) => (
          <NavLink
            key={item.title}
            className="text-gray-500 text-lg"
            to={
              item.route === "/products"
                ? `/products/${product?.productName}`
                : item.route
            }
          >
            {item.title}
          </NavLink>
        ))}
      </ul>
      <div className="md:hidden">
        <button
          className="border border-solid border-[#f6f7f9] p-2 rounded-md shadow-md"
          onClick={() => setToggleMenu(true)}
        >
          <BiMenuAltLeft />
        </button>
      </div>
      {toggleMenu && (
        <div className="overlay">
          <div className="w-[48%] h-[100vh] bg-[#f6f6f6] shadow-lg  px-6 pt-4">
            <div className="flex justify-end">
              <button
                className="border border-solid border-[#f6f7f9] bg-white p-2 rounded-md"
                onClick={() => setToggleMenu(false)}
              >
                <IoChevronBack />
              </button>
            </div>
            <ul className="w-full pt-12 flex flex-col gap-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.title}
                  to={
                    item.route === "/products"
                      ? `/products/${product?.productName}`
                      : item.route
                  }
                  className="text-gray-500"
                  onClick={() => setToggleMenu(false)}
                >
                  {item.title}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
