import comingsoon from "../assets/comming-soon.png"

const Home = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center'>
        <img src={comingsoon} alt="comingsoon" className='w-96' />
      </div>
    </div>
  )
}

export default Home