import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import Cart from './Cart'
import Logo from './Logo'
import Navbar from './Navbar'
import Search from './Search'
import User from './User'

const Header = () => {
  const [searchToggle, setSearchToggle] = useState(false)
  return (
    <div className='fixed top-0 right-0 left-0 z-50 h-[52px] px-4 lg:px-[12%] sm:px-8 xl:px-[14%] 2xl:px-[16%] bg-white shadow-md '>
      <div className='flex justify-between items-center py-2'>
        <div className='w-1/3'>
          <Navbar />
        </div>
        <div className='w-1/3'>
        <Logo />
        </div>
        <div className='w-1/3 flex justify-end items-center gap-4'>
          <button onClick={() => setSearchToggle(true)}>
            <CiSearch className="text-blue-500 text-2xl hover:scale-110"  />
          </button>
          <Cart />
          <User />
        </div>
        {searchToggle && <Search setSearchToggle={setSearchToggle} />}
      </div>
    </div>
  )
}

export default Header