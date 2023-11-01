import { useSelector } from "react-redux";
import Favorite from "./Favorite";
import HomeSingleFeatureProduct from "./HomeSingleFeatureProduct";
import NewVideoOfTSGaming from "./NewVideoOfTSGaming";
import Slide from "./Silde";
import Loading from "../Loading";

const Home = () => {
  const { productData } = useSelector((state) => state.ProductDataReducer);
  return (
    <>
      {!productData > 0 ? (
        <Loading />
      ) : (
        <div className="container mx-auto">
          <Slide />
          <NewVideoOfTSGaming />
          <Favorite />
          <HomeSingleFeatureProduct />
        </div>
      )}
    </>
  );
};

export default Home;
