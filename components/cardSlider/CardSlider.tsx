"use client"

import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SampleNextArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", height: "40px", width: "40px"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props:any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", height: "40px", width: "40px"}}
        onClick={onClick}
      />
    );
  }

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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
            breakpoint: 1050,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
      ]
  };
  return (
    <div className='flex justify-center items-center w-full overflow-hidden px-5'>
        <div className="w-full p-10">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    </div>
    
  );
}