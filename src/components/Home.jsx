import Favorite from "./Home/Favorite"
import FeaturedProduct from "./Home/FeaturedProduct"
import HomeSingleFeatureProduct from "./Home/HomeSingleFeatureProduct"
import Slide from "./Home/Silde"

const Home = () => {
  return (
    <div className='container mx-auto'>
      <Slide />
      <Favorite />
      <FeaturedProduct />
      <HomeSingleFeatureProduct />
    </div>
  )
}

export default Home