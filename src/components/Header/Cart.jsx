import React from 'react'
import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { products } = useSelector(state => state.CartReducer)

  return (
    <div className='hover:scale-110'>
        <Link to={"/checkout"} className="relative hover:scale-110">
          <p className='absolute w-5 h-5 rounded-full flex justify-center items-center text-white 
            bg-[#EF4444] -top-2 -right-2 text-[14px]'>{products.length > 0 ? products.length : "0"}</p>
            <FaShoppingCart className='text-2xl text-blue-500' />
        </Link>
    </div>
  )
}

export default Cart