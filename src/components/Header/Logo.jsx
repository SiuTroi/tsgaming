import { Link } from "react-router-dom";
import tsgamingLogo from "../../assets/tsgaming-logo-web.png"
const Logo = () => {
  
  return (
    <div className=''>
      <Link to={"/"} className="flex justify-center items-center">
        <img className="h-[42px]" src={tsgamingLogo} alt="TS Gaming Logo" />
      </Link>
    </div>
  )
}

export default Logo 
