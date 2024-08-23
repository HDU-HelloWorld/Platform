'use client'
import Link from 'next/link'
import '@arco-design/web-react/dist/css/arco.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { IconIdcard } from '@arco-design/web-react/icon'
export default function Home() {
  return (
    <section className="h-full w-full flex flex-col items-center ">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        className="h-1/5 w-full"
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}>
        <SwiperSlide style={{ backgroundColor: 'gray' }}></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      <nav className="flex flex-row justify-around items-center w-full h-1/10 mt-3">
        <Link
          href={'recruit'}
          className="flex flex-col items-center text-base hover:scale-105  duration-100 cursor-pointer">
          <IconIdcard className="text-5xl  " />
          <p>社团纳新</p>
        </Link>
        <Link
          href={'recruit'}
          className="flex flex-col items-center text-base hover:scale-105  duration-100 cursor-pointer">
          <IconIdcard className="text-5xl  " />
          <p>社团纳新</p>
        </Link>
        <Link
          href={'recruit'}
          className="flex flex-col items-center text-base hover:scale-105  duration-100 cursor-pointer">
          <IconIdcard className="text-5xl  " />
          <p>社团纳新</p>
        </Link>
      </nav>
    </section>
  )
}
