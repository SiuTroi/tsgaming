import React from 'react'
import Cart from './Cart'
import Logo from './Logo'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className=' bg-white shadow-md '>
      <div className='flex justify-between items-center py-2 px-4 md:px-0 container mx-auto'>
        <Navbar />
        <Logo />
        <Cart />
      </div>
    </div>
  )
}

export default Header