import { NavLink } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoHome } from "react-icons/io5"
import { MdProductionQuantityLimits, MdReviews } from "react-icons/md"
import { IoChevronBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const navigation = [
  { title: "Home", route: "/", icon: <IoHome /> },
  { title: "Products", route: "/products", icon: <MdProductionQuantityLimits /> },
  { title: "Review", route: "/reviews", icon: <MdReviews /> },
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
            to={item.route}
          >
          {item.title}
          </NavLink>
        ))}
      </ul>
      <div className="fixed z-50 left-0 right-0 bottom-0 w-full shadow-3xl md:hidden">
          <div className=" bg-white border-t border-solid border-gray-200 px-6 pt-4 pb-2">
            <ul className="w-full flex justify-between gap-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.route}
                  className="text-gray-500 flex flex-col items-center"
                  onClick={() => setToggleMenu(false)}
                >
                  <div>
                    {item.icon}
                  </div>
                  <p>{item.title}</p>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
