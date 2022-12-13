import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import LoginForm from './components/Form/LoginForm'
import SignupForm from './components/Form/SignupForm'
import Header from './components/Header/Header'
import HistoryCheckout from './components/HistoryCheckout'
import Home from './components/Home'
import Review from './components/Review'
import UserPage from './components/User/UserPage'
const Product = lazy(() => import('./components/Product/Product'))


const App = () => {

  return (
    <div>
      <Header />
      <Suspense fallback={<div className='overlay z-9999'><div className='absolute-center loading'></div></div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:productname' element={<Product />} />
          <Route path='/reviews' element={<Review />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/user' element={<UserPage />} />
          <Route path='/historycheckout' element={<HistoryCheckout />} />

          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App