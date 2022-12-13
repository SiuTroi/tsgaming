import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa"
import { useEffect } from 'react'
import clapping from "../../assets/clapping.png"

const ProductDetail = () => {
  const { product } = useSelector(state => state.ProductReducer)
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isAddSuccess, setIsAddSuccess] = useState(false) 

  const decQuantity = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if(quantity < 99) {
      setQuantity(quantity + 1)
    }
  }
  const addToCart = () => {
      setQuantity(1)
      dispatch({
        type: "ADD_TO_CART",
        payload: { product, quantity }
      })
      setIsAddSuccess(true)
  }
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsAddSuccess(false)
    }, 4000)
    return () => clearTimeout(timerId)
  }, [isAddSuccess])
  return (
    <div className='bg-white lg:w-[60%] md:flex md:flex-col lg:h-[88vh] rounded-lg'>
      <div className='pt-6 bg-white md:flex md:justify-center md:items-center md:h-2/3 rounded-lg '>
        <img src={product.imageUrl} alt={product.productName} className="md:max-w-[80%] lg:max-w-[50%]" />
      </div>
      <div className='px-4 mt-4 md:h-1/3 pb-6'>
        <h1 className='font-semibold text-[20px] md:mt-12'>{product.productName}</h1>
        <p className='mt-2 text-gray-500'>{product.description}</p>
        <div className='mt-20 flex justify-between items-center'>
          <div className='bg-gray-200 w-[90px] flex items-center justify-around rounded-md'>
            <button 
            className={`px-2 text-[22px] ${quantity === 1 && "cursor-not-allowed"}`} 
            disabled={quantity === 1 && true}
            onClick={decQuantity}>-</button>
            {quantity}
            <button className='px-2 text-[22px] text-[#FF7300]' 
            onClick={increaseQuantity}>+</button>
          </div>
          <div className='flex items-center gap-3'>
            <h2 className='font-semibold'>{new Intl.NumberFormat('en-US', {style : 'currency', currency : 'USD'}).format(product.price * quantity)}</h2>
            <button className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg' 
              onClick={addToCart}>
              <FaShoppingCart className='text-white' /> 
              <span className='text-white'>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
      {isAddSuccess && 
      <div className='fixed items-center w-[200px] gap-2 left-4 bottom-4 bg-[#10B981] rounded-xl z-50 
      flex '>
          <div className='w-[42px]'>
            <img src={clapping} alt="clapping" />
          </div>
          <p className='flex-1 text-white'>Added Successfully!</p>
        </div>}
    </div>
  )
}

export default ProductDetail