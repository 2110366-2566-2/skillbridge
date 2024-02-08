"use client"

import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CardSlider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className='flex justify-center items-center w-full overflow-hidden px-40'>
        <div className="w-full p-10">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    </div>
    
  );
}