import HomeItem from "../Home/HomeItem";
import { useEffect, useState } from "react";
import { useGetDataLimitToFirst } from "../../hooks/useGetDataLimitToFirst";
import Loading from "../Loading";
import { Helmet } from "react-helmet";

import tsgamingFaicon from "../../assets/tsgaimg-faicon.png";
import { uriDomain } from "../../constant";
const Product = () => {
  const [loadMore, setLoadMore] = useState(8);
  const dataResult = useGetDataLimitToFirst(loadMore);
  const [dataloadMore, setDataLoadMore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setDataLoadMore(dataResult.data || []);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [dataResult.data, loadMore]);

  const handleLoadmore = () => {
    if (loadMore > dataResult.data.length) {
    } else {
      setLoadMore(loadMore + 8);
      setIsLoading(true);
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TS Gaming - Sản Phẩm</title>
        <link rel="icon" sizes="32x32" href={tsgamingFaicon} />
        <link rel="apple-touch-icon" sizes="32x32" href={tsgamingFaicon} />
        <link rel="canonical" href={uriDomain} />
        {/* {homeSeo.description && <meta name="description" content={homeSeo.description.trim()}  />} */}
        <meta name="keywords" content="TS Gaming" />
        <meta name="author" content="TS Gaming" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content={uriDomain} />
        <meta property="og:auther" content="TS Gaming" />
        <meta property="og:keywords" content="TS Gaming" />
        {/* {homeSeo.description && <meta property="og:description" content={homeSeo.description.trim()} />} */}
        <meta property="og:image" content={tsgamingFaicon} />
        <meta property="og:type" content="article" />
      </Helmet>
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
