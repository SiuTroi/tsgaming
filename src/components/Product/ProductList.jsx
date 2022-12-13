import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { products } = useSelector(state => state.ProductReducer)


  return (
    <div className='lg:w-[40%]'>
      <div className='flex flex-col gap-2 mt-16 lg:mt-0'>
        {products.map(item => (
          <div key={item.productId} className='shadow-lg flex items-center gap-4 px-4 py-3 bg-white rounded-lg'>
            <div className='w-1/4 lg:w-1/5'>
              <img src={item.imageUrl} alt={item.productName} className="" />
            </div>
            <div className='w-3/4 lg:w-4/5 flex flex-col'>
              <div>
                <h3 className='font-semibold text-[18px]'>{item.productName}</h3>
                <p className='text-gray-500 text-[15px]'>{item.description}</p>
              </div>
              <div className='flex justify-between items-center mt-6'>
                <h3 className='font-semibold'>{new Intl.NumberFormat('en-US', {style : 'currency', currency : 'USD'}).format(item.price)}</h3>
                <Link to={`/products/${item.productName}`} onClick={() => window.scrollTo(0,0)}>
                  <button className='text-blue-500'>Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList