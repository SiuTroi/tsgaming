import { useSelector } from "react-redux";
import HomeItem from "../Home/HomeItem";
import { useEffect, useState } from "react";
import { child, get, orderByChild, query, ref, limitToFirst } from "firebase/database";
import { database } from "../../firebase";
// import { firebase } from 'firebase/app';
import 'firebase/database';
import { useGetDataRange } from "../../hooks/useGetDataRange";

const Product = () => {
  const { productData } = useSelector((state) => state.ProductDataReducer);
  const [loadMore, setLoadMore] = useState(3);
  const dataResult = useGetDataRange(0, loadMore);
  const [dataloadMore, setDataLoadMore] = useState(dataResult.data || []);
  const dbRef = ref(database);

  // useEffect(() => {
    
  //   if (dataResult.data !== null) {
  //     // Truy cập và sử dụng dữ liệu ở đây
  //     console.log(dataResult.data);
  //   }
  //   // const getProductDataAsync = async () => {
  //   //   const productDataQuery = query(
  //   //     child(dbRef, `product_data`),
  //   //     limitToFirst(3)
  //   //   );
  
  //   //   try {
  //   //     const snapshot = await get(productDataQuery);
  //   //     snapshot.forEach((childSnapshot) => {
  //   //       const data = childSnapshot.val();
  //   //       // Xử lý dữ liệu ở đây
  //   //       console.log(data);
  //   //     });
  //   //   } catch (error) {
  //   //     console.error("Error retrieving product data:", error);
  //   //   }
  //   // };
  //   // getProductDataAsync();
  // }, [dataResult.data]);

  useEffect(() => {
    setDataLoadMore(dataResult.data || []);
    console.log(dataloadMore)
  }, [dataResult.data, productData, loadMore])

  const handleLoadmore = () => {
    setLoadMore(loadMore + 2);
  };

  // console.log(data)
  return (
    <>
      {productData ? (
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
      ) : (
        <div className="overlay z-9999">
          <div className="absolute-center loading"></div>
        </div>
      )}
    </>
  );
};

export default Product;
