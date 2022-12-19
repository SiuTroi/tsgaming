import React from 'react'
import Cart from './Cart'
import Logo from './Logo'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='px-4 lg:px-[12%] sm:px-8 xl:px-[14%] 2xl:px-[16%] bg-white shadow-md '>
      <div className='flex justify-between items-center py-2'>
        <Navbar />
        <Logo />
        <Cart />
      </div>
    </div>
  )
}

export default Header