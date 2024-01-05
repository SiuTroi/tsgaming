import { Helmet } from "react-helmet"
import comingsoon from "../assets/comming-soon.png"

const Blogs = () => {
  return (
    <>
    <Helmet>
      <title>TS Gaming - Gaming Blogs Coming Soon...</title>
    </Helmet>
    <div className='container mx-auto mt-20'>
      <div className='flex justify-center items-center'>
        <img src={comingsoon} alt="comingsoon" className='w-96' />
      </div>
    </div>
    </>
  )
}

export default Blogs