"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

const ProductImageSlide = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  return (
    <div className="w-full lg:w-[300px] xl:w-[480px] shrink-0">
      <div className="w-full aspect-square relative flex border-[1px] border-input">
        <Swiper
          onSlideChange={(e) => setCurrentImage(e.realIndex)}
          onSwiper={setSwiperRef} // Set the Swiper instance
          navigation={false} // Disable Swiper's default navigation
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="h-full rounded-[7px]">
              <Image
                src={image}
                alt={alt}
                width={1000}
                height={1000}
                className="w-full h-full object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="h-full absolute top-0 left-0 flex items-center z-50">
          <button
            style={{ clipPath: "polygon(0 100%, 14% 0, 98% 0, 82% 100%)" }}
            onClick={handlePrev}
            className="-full w-[30px] h-[30px]  bg-black center text-yellow-300 rotate-180 relative active:left-[-10px]"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="w-fit h-full absolute top-0 right-0 flex items-center z-50">
          <button
            style={{ clipPath: "polygon(0 100%, 14% 0, 98% 0, 82% 100%)" }}
            onClick={handleNext}
            className="-full w-[30px] h-[30px]  bg-black center text-yellow-300 relative active:right-[-10px]"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="w-full relative flex items-center justify-start gap-[5px] mt-[20px]">
        {images.map((image, index) => (
          <Image
            key={index}
            onClick={() => swiperRef?.slideTo(index)} // Navigate to the selected image
            src={image}
            alt={alt}
            width={70}
            height={70}
            style={{ transition: "0.3s" }}
            className={`w-[70px] h-[70px] object-cover cursor-pointer ${
              index === currentImage ? "opacity-[1]" : "opacity-[0.5]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlide;
