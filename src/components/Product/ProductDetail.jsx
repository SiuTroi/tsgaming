import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa"
import { useEffect } from 'react'
import ProductList from './ProductList'
import { useParams } from 'react-router-dom'
import { formatCurrency } from '../../utils/currencyFormart'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { productid } = useParams()
  const { product } = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product: product, quantity: quantity }
    })
    setQuantity(1)
    toast.success("Added product successfully!!")
  }
  useEffect(() => {
    dispatch({type: "GET_ONE_PRODUCT", productid: productid})
  }, [productid])

  return (
      <div className='container px-4 mt-16 sm:px-0 w-full mx-auto lg:flex md:gap-4 scroll'>
        <div className='bg-white lg:w-[60%] md:flex md:flex-col lg:h-[88vh] rounded-lg'>
          <div className='pt-6 bg-white md:flex md:justify-center md:items-center md:h-2/3 rounded-lg '>
            <img src={product?.imageUrl} alt={product?.productName} className="md:max-w-[80%] lg:max-w-[50%]" />
          </div>
          <div className='px-4 mt-4 md:h-1/3 pb-6'>
            <h1 className='font-semibold text-[20px] md:mt-12'>{product?.productName}</h1>
            <p className='mt-2 text-gray-500'>{product?.description}</p>
            <div className='mt-8 md:mt-20 flex justify-between items-center'>
              <div className='bg-gray-200 w-[90px] flex items-center justify-around rounded-md'>
                <button className={`px-2 text-[22px] ${quantity === 1 && "cursor-not-allowed"}`} 
                disabled={quantity === 1 && true}
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                {quantity}
                <button className='px-2 text-[22px] text-[#FF7300]' 
                onClick={() => quantity < 99 && setQuantity(quantity + 1)}>+</button>
              </div>
              <div className='flex items-center gap-3'>
                <h2 className='font-semibold'>{formatCurrency(product?.price)}</h2>
                <button className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg' 
                  onClick={addToCart}>
                  <FaShoppingCart className='text-white' /> 
                  <span className='text-white'>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProductList />
    </div>
  )
}

export default ProductDetail