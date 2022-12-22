import { useSelector } from "react-redux";
import HomeItem from "./HomeItem";


const FeaturedProduct = () => {
    const { products } = useSelector(state => state.ProductReducer)
  return (
    <div className="featured">
      <HomeItem
        data={products.slice(3, 9)}
        title="Featured products"
      />
    </div>
  );
};

export default FeaturedProduct;