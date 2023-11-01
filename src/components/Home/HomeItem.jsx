import { Link } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useEffect, useState } from "react";
import Loading from "../Loading";

const HomeItem = (props) => {
  const { data, title, className, isShowAllButton } = props;
  const [hasLoadDataDone, setHasLoadDataDone] = useState(false);

  useEffect(() => {
    !data ? setHasLoadDataDone(false) : setHasLoadDataDone(true);
  }, [data]);


  return (
    <div className={`category-page mb-3 ${className}`}>
      <div className="px-2">
        <h2 className="text-blue-500 text-[32px] mb-3 font-bold">{title}</h2>
      </div>
      {!hasLoadDataDone ? (
        <Loading />
      ) : (
        <div>
          <div className="wrap-product">
            {data.map((item, index) => (
              <div
                key={index}
                className="item-product border-blue-hover relative"
                onClick={() => window.scrollTo(0, 0)}
              >
                <a
                  href={item.productLink}
                  className="add-btn hover:bg-blue-500 hover:text-white transition-all duration-500"
                >
                  <MdProductionQuantityLimits size={12} />
                </a>
                <Link
                  to={`/products/product-detail/${item.productId}`}
                  onCick={() => window.scrollTo(0, 0)}
                >
                  <div className="img-product">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="h-full rounded-2xl"
                    />
                  </div>
                  <p className="mt-12 mb-2 truncate three-dot">
                    {item.productName}
                  </p>
                  <h2 className="font-bold">{item.productPrice} VND</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        {!isShowAllButton && (
          <Link
            className="px-8 py-3 bg-transparent border-solid border border-blue-500 text-blue-500 rounded-lg bg-green-hover 
            hover:bg-blue-500 hover:text-white transition-all duration-500"
            onClick={() => window.scrollTo(0, 0)}
            to={"/products"}
          >
            Tất cả
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeItem;
