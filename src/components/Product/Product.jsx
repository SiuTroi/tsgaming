import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/currencyFormart'

const Product = () => {
  const { products } = useSelector(state => state.ProductReducer)
  const [width, setWidth] = useState(window.innerWidth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: "GET_PRODUCT"})
  }, [])

  useEffect(() => {

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className='pb-20 px-4 mt-4 lg:px-[12%] sm:px-8 xl:px-[14%] 2xl:px-[16%]'>
      <h1 className='font-medium text-[24px] mb-3 ml-3 text-blue-500'>All Product</h1>
      <div className='lg:flex md:gap-4 scroll'>
        <div className='flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center sm:justify-start'>
          {products && products.map(item => (
            <Link to={`/products/${item.productName}`} key={item.id} className={` md:w-[32%] lg:w-[29%] xl:w-[23.33333%] 
            ${width < 350 ? "w-full" : "w-[48%]"} relative mb-4`}>
              <div className='h-[260px] sm:h-[321px] 2xl:h-[360px] bg-white p-8 rounded-[30px] 
              hover:border-[2px] hover:border-solid hover:border-blue-500 flex justify-center items-center'>
                <button className='add-btn hover:bg-blue-500 hover:text-white'>+</button>
                <img src={item.imageUrl} alt="" className='h-full mx-auto min-w-[120px] sm:w-full md:h-[215px] object-contain' />
              </div>
              <div className=''>
                <h1 className='mt-2 mb-3 font text-[#4d4d4d]'>{item.productName}</h1>
                <span className='font-extrabold text-[20px] mr-2'>{formatCurrency(item.price)}</span> <span className='line-through text-gray-400'>{formatCurrency(item.price * 3)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Product