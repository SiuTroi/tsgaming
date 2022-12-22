import { useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currencyFormart";
import { toast } from "react-toastify";

const HomeItem = (props) => {
  const { data, title } = props;
  const dispatch = useDispatch();
  return (
    <div className="category-page mb-3">
      <div>
        <h2 className="text-blue-500 text-[32px] mb-3 font-bold">{title}</h2>
      </div>
      <div>
        <div className="wrap-product">
          {data.map((item) => (
            <div key={item.productId} className="item-product border-blue-hover relative">
              <button
                className="add-btn hover:bg-blue-500 hover:text-white transition-all duration-500"
                onClick={() =>{
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: { product: item, quantity: 1 },
                  }); toast.success("Added product successfully!!")}
                }
              >
                <AiOutlinePlus size={12} />
              </button>
              <Link
                to={`/products/${item.productId}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <div className="img-product">
                  <img src={item.imageUrl} alt={item.productName} className="h-full" />
                </div>
                <p className="mt-12 mb-2 three-dot">{item.productName}</p>
                <h2 className="font-bold">
                  {formatCurrency(item.price)}
                </h2>
                <p className="text-gray-400 line-through">
                  {formatCurrency(item.price * 3)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
          <button
            className="px-8 py-3 bg-transparent border-solid border border-blue-500 text-blue-500 rounded-lg bg-green-hover 
            hover:bg-blue-500 hover:text-white transition-all duration-500"
            onClick={() => window.scrollTo(0, 0)}
          >
            See all
          </button>
      </div>
    </div>
  );
};

export default HomeItem;
