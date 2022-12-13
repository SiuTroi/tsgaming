import { AiOutlineUser } from "react-icons/ai"
import { Link } from "react-router-dom"

const User = () => {
  return (
    <div>
        <Link to={"/user"}>
            <AiOutlineUser className="text-blue-500 text-2xl" />
        </Link>
    </div>
  )
}

export default User