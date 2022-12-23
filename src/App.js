import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import LoginForm from './components/Form/LoginForm'
import SignupForm from './components/Form/SignupForm'
import Header from './components/Header/Header'
import HistoryCheckout from './components/HistoryCheckout'
import ProductDetail from './components/Product/ProductDetail'
import Review from './components/Review'
import UserPage from './components/User/UserPage'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom'
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from 'react-redux'

const Home = lazy(() => import('./components/Home'))
const Product = lazy(() => import('./components/Product/Product'))

const App = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const user = useSelector(state => state.UserReducer)

  // disptach for saga get data
  useEffect(() => {
    dispatch({ type: "GET_DATA" });
  }, [user.userid]);
  return (
    <div>
      <Header />
      <Suspense fallback={<div className='overlay z-9999'><div className='absolute-center loading'></div></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Product />} />
          <Route path='/products/:productid' element={<ProductDetail />} />
          <Route path='/reviews' element={<Review />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/user' element={<UserPage />} />
          <Route path='/user/historycheckout' element={<HistoryCheckout />} />

          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </Suspense>
      {pathname === "/checkout" ? <div></div> : <Footer />}
    </div>
  )
}

export default App