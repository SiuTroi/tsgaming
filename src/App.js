import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {Helmet} from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import "swiper/css";
import "swiper/css/pagination";

import { Admin, Footer, Home, Notification } from './components'
import LoginForm from './components/Form/LoginForm'
import SignupForm from './components/Form/SignupForm'
import Header from './components/Header/Header'
import ProductDetail from './components/Product/ProductDetail'
import Blogs from './components/Blogs'
import UserPage from './components/User/UserPage'

// import Checkout from './components/Checkout'
// import HistoryCheckout from './components/HistoryCheckout'

import tsgamingFaicon from "./assets/tsgaimg-faicon.png"
import { uriDomain } from './constant';
import Loading from './components/Loading';

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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TS Gaming - Trang Chủ</title>
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
      <div>
        <Notification />
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Product />} />
            <Route path='/products/product-detail/:productId' element={<ProductDetail />} />
            <Route path='/blogs' element={<Blogs />} />
  
            <Route path='/user' element={<UserPage />} />
            
            {/* <Route path='/checkout' element={<Checkout />} /> */}
            {/* <Route path='/user/historycheckout' element={<HistoryCheckout />} /> */}
  
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
  
            {/* Admin */}
            <Route path='/siutroiAdmin' element={<Admin />} />
          </Routes>
        </Suspense>
        {pathname === "/checkout" ? <div></div> : <Footer />}
      </div>
    </>
  )
}

export default App