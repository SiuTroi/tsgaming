import React from 'react'
import { FaShoppingCart } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import User from './User'

const Cart = () => {
  const { products } = useSelector(state => state.CartReducer)

  return (
    <div className='w-1/3  flex justify-end items-center gap-4'>
        <Link to={"/checkout"} className="relative">
          <p className='absolute w-5 h-5 rounded-full flex justify-center items-center text-white 
            bg-[#EF4444] -top-2 -right-2 text-[14px]'>{products.length > 0 ? products.length : "0"}</p>
            <FaShoppingCart className='text-2xl text-blue-500' />
        </Link>
        <User />
    </div>
  )
}

export default Cart