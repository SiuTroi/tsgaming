import HomeItem from "../Home/HomeItem";
import { useEffect, useState } from "react";
import { useGetDataLimitToFirst } from "../../hooks/useGetDataLimitToFirst";
import Loading from "../Loading";

const Product = () => {
  const [loadMore, setLoadMore] = useState(4);
  const dataResult = useGetDataLimitToFirst(loadMore);
  const [dataloadMore, setDataLoadMore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setDataLoadMore(dataResult.data || []);
    setIsLoading(false);
  }, [dataResult.data, loadMore]);

  const handleLoadmore = () => {
    if (loadMore > dataResult.data.length) {
    } else {
      setLoadMore(loadMore + 4);
      setIsLoading(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-32">
          <HomeItem
            data={dataloadMore}
            title="Cùng mua ốp điện thoại thôi"
            isShowAllButton={true}
          />
          <button
            className="px-8 py-3 bg-transparent border-solid border border-blue-500 text-blue-500 rounded-lg bg-green-hover 
              hover:bg-blue-500 hover:text-white transition-all duration-500 ml-[50%] -translate-x-[50%]"
            onClick={handleLoadmore}
          >
            Tải thêm
          </button>
        </div>
      )}
    </>
  );
};

export default Product;
