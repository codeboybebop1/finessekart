import Carousel1 from '../../assets/Carousel_1.jpg';
import Carousel2 from "../../assets/Carousel_2.jpg"
import Carousel3 from "../../assets/Carousel_3.jpg"
import Carousel4 from '../../assets/Carousel_4.jpg'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export function Carousel(){
    const navigate = useNavigate();
     const [index, setIndex] = useState(0);

     const slides = [
  {
    image: Carousel1,
    title: "Buy/Sell Art Online",
  },
  {
    image: Carousel2,
    title: "Every Shade tells a Story",
  },
  {
    image: Carousel3,
    title: "Embrace the Colors",
  },
  {
    image: Carousel4,
    title: "Support Local Artists",
  }
];


      useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);


    return(
        <>
        <div className='w-full h-[100%] overflow-hidden'>
             <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="w-full h-full flex-shrink-0 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${slide.image})` }}
          >

            {/* Text */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white w-fit bg-gray-500/50 rounded-md pr-6">
              <h2 className=" sm:text-2xl md:text-3xl lg:text-4xl font-bold opacity-100 p-6 ">{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-[80%] w-full flex justify-evenly items-center font-semibold">
  <div className="bg-white/90 flex justify-center items-center py-2 px-8 
                sm:text-xl md:text-2xl border lg:text-2xl 
                cursor-pointer
                shadow-[4px_4px_0px_0px_black] 
                hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                transition-all duration-150 hover:underline hover:decoration-1" onClick={()=>{navigate("/shop")}}>Shop Now</div>
  <div className="bg-white/90 flex justify-center items-center py-2 px-8 
                sm:text-xl md:text-2xl border lg:text-2xl 
                cursor-pointer
                shadow-[4px_4px_0px_0px_black] 
                hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                transition-all duration-150 hover:underline hover:decoration-1" onClick={()=>{navigate("/SellerSignup")}}>Become a Seller</div>
</div>
        </div>
        </>
    );
}