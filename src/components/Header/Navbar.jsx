import { NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5"
import { MdProductionQuantityLimits, MdReviews } from "react-icons/md"
import { IoChevronBack } from "react-icons/io5";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const navigation = [
  { title: "Home", route: "/", icon: <IoHome /> },
  { title: "Products", route: "/products", icon: <MdProductionQuantityLimits /> },
  { title: "Review", route: "/reviews", icon: <MdReviews /> },
];
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch({
      type: "GET_PRODUCT",
    });
  }, []);

  return (
    <nav className="w-1/3">
      <button className="md:hidden text-[28px] text-blue-500"
      onClick={() => navigate(-1)}>
        <IoChevronBack />
      </button>
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
