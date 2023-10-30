import { useSelector } from "react-redux"
import Favorite from "./Favorite"
import HomeSingleFeatureProduct from "./HomeSingleFeatureProduct"
import NewVideoOfTSGaming from "./NewVideoOfTSGaming"
import Slide from "./Silde"

const Home = () => {
  const { productData } = useSelector(state => state.ProductDataReducer)
  return (
    <>
      {!productData > 0 ? <div className="overlay z-9999">
          <div className="absolute-center loading"></div>
        </div> : <div className='container mx-auto'>
      <Slide />
      <NewVideoOfTSGaming />
      <Favorite />
      <HomeSingleFeatureProduct />
    </div>}
    </>
    
  )
}

export default Home