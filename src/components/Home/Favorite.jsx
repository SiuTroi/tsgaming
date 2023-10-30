import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";
import { useGetDataRange } from "../../hooks/useGetDataRange";
import { useEffect, useState } from "react";

const Favorite = () => {
  const { productData } = useSelector((state) => state.ProductDataReducer);

  const dataResult = useGetDataRange(0, 3);
  const [dataLoad, setDataLoad] = useState(dataResult.data || []);

  useEffect(() => {
    setDataLoad(dataResult.data || []);
    console.log(dataLoad);
  }, [dataResult.data]);

  return (
    <div className="favorite">
      <HomeItem data={dataResult.data} title="Sản phẩm yêu thích" />
    </div>
  );
};

export default Favorite;
