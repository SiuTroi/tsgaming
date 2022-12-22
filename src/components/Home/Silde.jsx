import React, { useEffect, useState } from 'react';
import {IoIosArrowBack} from "react-icons/io"
import {MdNavigateNext} from "react-icons/md"

import specialoffer from "../../assets/specialoffer.png"
import savingmoney from "../../assets/savingmoney.png"
import freeship from "../../assets/freeship.png"
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";


const amotions = [
  {
    img: specialoffer,
    title: "Endow",
    decs: "With promotions up to 69%."
  },
  {
    img: savingmoney,
    title: "Save",
    decs: "We have a special loyalty program for our customers."
  },
  {
    img: freeship,
    title: "Speed",
    decs: "International standard delivery speed."
  },
]
const Slide = () => {
    const { products } = useSelector(state => state.ProductReducer)
  return (
    <div className='mt-32 px-4 xl:mx-[10%] 2xl:mx-[16%]'>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper bg-white h-[30vh] md:h-[50vh] pt-10 rounded-3xl px-6"
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.imageUrl} alt={item.productName} 
          className="rounded-3xl homeSlide" /></SwiperSlide>
        ))}
      </Swiper>
      <div className='px-4 flex justify-between mt-16 sm:mt-24'>
        {amotions.map((item, index) => (
          <div key={index} className="w-[32%] bg-[#ededed] p-2 sm:p-4 lg:py-6 rounded-lg lg:flex lg:flex-row-reverse amotions" >
            <div className="mx-auto translate-y-[-60%] sm:translate-y-[-50%] md:translate-y-[-40%] lg:translate-y-[-10%] w-[75%] lg:w-[220px]
                 lg:flex lg:justify-center lg:items-center">
              <img src={item.img} alt={item.img} 
              className=""/>
            </div>
            <div className='w-full lg:mt-12'>
              <h3 className=' mx-auto text-center w-[80%] -mt-4 lg:mt-0 text-[18px] font-semibold after z-[2] relative 
              lg:text-left lg:mx-0'>{item.title}</h3>
            <p className='text-[13px] sm:text-[17px] text-center lg:text-left'>{item.decs}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slide