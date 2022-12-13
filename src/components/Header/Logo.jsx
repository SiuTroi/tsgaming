import { Link } from "react-router-dom"
const Logo = () => {
  
  return (
    <div className='w-1/3'>
      <Link to={"/"}>
        <h2 className='text-2xl text-blue-500 font-bold text-center'>Beauty.bd</h2>
      </Link>
    </div>
  )
}

export default Logo 
