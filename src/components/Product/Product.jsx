import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ProductDetail from './ProductDetail'
import ProductList from './ProductList'

const Product = () => {
  const { productname } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: "GET_ONE_PRODUCT", productname})
  }, [productname])

  return (
    <div className='container w-full mx-auto lg:flex md:gap-4 mt-4 scroll'>
      <ProductDetail />
      <ProductList />
    </div>
  )
}

export default Product