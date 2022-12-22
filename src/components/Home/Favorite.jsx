import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";


const Favorite = () => {
    const { products } = useSelector(state => state.ProductReducer)
  return (
    <div className="favorite">
      <HomeItem
        data={products.slice(0, 4)}
        title="Favorite Shop"
      />
    </div>
  );
};

export default Favorite;