import { useState } from "react";
import { useSelector } from "react-redux";
import HomeItem from "../Home/HomeItem";

const ProductList = () => {
  const { productData } = useSelector((state) => state.ProductDataReducer);
  const [loadmore, setLoadmore] = useState(5);
  // const limitProductShow = productData.slice(0, loadmore);

  return (
    <>
      {productData?.length ? (
        <HomeItem data={productData?.slice(1, 5)} title="Có thể bạn thích" className=" xl:mx-0 2xl:mx-0" />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProductList;
