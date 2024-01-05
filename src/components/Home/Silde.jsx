import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import superZoldyckKillua from "../../assets/zoldyck killua.png"
import superBright from "../../assets/super bright.png"
import tsgaming from "../../assets/tsgaimg-faicon.png"


import useWindowDimensions from '../../utils/windowDimensions';
import { useGetDataRange } from '../../hooks/useGetDataRange';

// amotions data array
const amotions = [
  {
    img: superZoldyckKillua,
    title: "Super Zoldyck Killuav",
    decs: "”Cậu thật là ngầu. Tớ thì không có những thứ đó. Những thứ mà tớ muốn làm, giống như cậu vậy”",
    link: "https://shorten.asia/xtYa3exa"
  },
  {
    img: tsgaming,
    title: "Super Kamado Tanjiro",
    decs: "“Tôi có thể làm được. Tôi biết tôi có thể làm được. Dù có thương tích ra sao, tôi cũng phải hoàn thành việc này. Dù thế nào đi nữa thì tôi vẫn có thể làm được.”",
    link: "https://shorten.asia/7bUkFKD5"
  },
  {
    img: superBright,
    title: "Super Toshiro Hitsugaya",
    decs: "“Một người không nên bị đánh bại bởi quá khứ của mình, chỉ cần nhìn về phía trước và không ngừng tiến bước.”",
    link: "https://shorten.asia/nqqNSbUQ"
  },
]
const Slide = () => {
  const { width } = useWindowDimensions();
  const [countToShowImageSlide, setCountToShowImageSlide] = useState(width);
  const [widthAmotionItem, setWidthAmotionItem] = useState("");
  const { productData } = useSelector(state => state.ProductDataReducer);

  const dataResult = useGetDataRange(0, 3);
  const [dataLoad, setDataLoad] = useState(dataResult.data || []);

  useEffect(() => {
    setDataLoad(dataResult.data || []);
    console.log(dataLoad)
  }, [dataResult.data])

  useEffect(() => {
    if(width < 540) {
      setCountToShowImageSlide(1);
      setWidthAmotionItem("w-[100%]")
    } else if (width > 500 && width < 736) {
      setCountToShowImageSlide(2)
      setWidthAmotionItem("w-[48%]")
    } else {
      setCountToShowImageSlide(3)
      setWidthAmotionItem("w-[32%]")
    }
  }, [width])
  return (
    <div className='mt-32 px-4 xl:mx-[10%] 2xl:mx-[16%]'>
      {/* Swiper libary */}
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={countToShowImageSlide}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-white h-[50vh] sm:h-[40vh] lg:h-[50vh] pt-10 rounded-3xl px-6"
      >
        {dataLoad.map((item) => (
          <SwiperSlide key={item.productName}>
            <div className='relative'>
              <img src={item.productImage} alt={item.productName} className="rounded-3xl" />
              <a href={item.productLink}  className='block absolute left-[50%] translate-x-[-50%] bottom-8 bg-blue-500 text-white rounded-xl min-w-[120px] px-6 py-2 shadow-2xl hover:bg-white hover:text-blue-500 transition-all duration-500'>
                Đặt hàng
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='px-4 flex justify-between flex-wrap mt-16 sm:mt-24'>
        {/* Render amotions */}
        {amotions.map((item, index) => (
          <a href={item.link} target='_blank' key={index} className={`${widthAmotionItem} bg-[#ededed] p-2 my-3 sm:p-4 lg:py-6 rounded-lg lg:flex lg:flex-row-reverse amotions block`} >
            <div className={`mx-auto translate-y-[${width < 540 ? '-60%' : "-10%"}] sm:translate-y-[-50%] md:translate-y-[-40%] lg:translate-y-[-10%] 
            w-[75%] lg:w-[220px] lg:flex lg:justify-center lg:items-center`}>
              <img src={item.img} alt={item.img} className="mx-auto"/>
            </div>
            <div className='w-full lg:mt-12'>
              <h3 className=' mx-auto text-center w-[80%] -mt-4 lg:mt-0 text-[18px] font-semibold after z-[2] relative 
              lg:text-left lg:mx-0'>{item.title}</h3>
            <p className='text-[13px] sm:text-[15px] text-center lg:text-left'>{item.decs}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Slide