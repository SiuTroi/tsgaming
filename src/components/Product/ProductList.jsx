import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/currencyFormart';

const ProductList = () => {
  const { products } = useSelector(state => state.ProductReducer)
  const [loadmore, setLoadmore] = useState(5)
  const limitProductShow = products.slice(0, loadmore)

  return (
    <div className='lg:w-[40%]'>
      <div className='flex flex-col gap-2 mt-16 lg:mt-0'>
        {limitProductShow.map(item => (
          <div key={item.productId} className='shadow-lg flex items-center gap-4 px-4 py-3 bg-white rounded-lg'>
            <div className='w-1/4 lg:w-1/5'>
              <img src={item.imageUrl} alt={item.productName} className="" />
            </div>
            <div className='w-3/4 lg:w-4/5 flex flex-col'>
              <div>
                <h3 className='font-semibold text-[18px]'>{item.productName}</h3>
                <p className='text-gray-500 text-[15px] line-clamp-2'>{item.description}</p>
              </div>
              <div className='flex justify-between items-center mt-6'>
                <h3 className='font-semibold'>{formatCurrency(item.price)}</h3>
                <Link to={`/products/${item.productId}`} onClick={() => window.scrollTo(0,0)}>
                  <button className='text-blue-500'>Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {loadmore < products.length && <button onClick={() => setLoadmore(loadmore + 5)}
        className="bg-blue-500 rounded-xl text-white w-[160px] py-2 mx-auto mt-3 hover:bg-blue-600">Load more</button>}
      </div>
    </div>
  )
}

export default ProductList