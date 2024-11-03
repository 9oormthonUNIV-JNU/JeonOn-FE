import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import location_white from "@/../public/assets/svgs/location_white.svg";
import clock from "@/../public/assets/svgs/clock.svg";
import { EventType } from "@/constants/events";

type CarouselProps = {
  slides: EventType[];
};

const CoverflowCarousel: React.FC<CarouselProps> = ({ slides }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center overflow-hidden">
      <Swiper
        centeredSlides={true}
        slidesPerView={1.5} // 양옆 슬라이드가 반쯤 보이도록 설정
        loop={true}
        spaceBetween={0.5} // 슬라이드 간 간격을 설정하여 양옆이 잘 보이도록 조정
        onSlideChange={(swiper) => setSelectedIndex(swiper.realIndex)}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {slides.map((event, index) => (
          <SwiperSlide
            key={event.order}
            className="transition-transform duration-300"
            style={{
              transform: selectedIndex === index ? "scale(0.9)" : "scale(0.7)",
              transition: "transform 0.3s ease",
              transformOrigin: "center",
              height: "auto",
            }}
          >
            <div className="relative flex justify-center items-center overflow-hidden rounded-lg pb-[100%]">
              <img
                src={event.img}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 mb-10 gap-2 text-center flex flex-col justify-center">
        <div className="text-xl font-cafe24 text-main">
          {slides[selectedIndex].content}
        </div>
        <div className="flex flex-col text-xs gap-2 font-pretendard text-white">
          <div className="flex flex-row justify-center gap-1">
            <img src={location_white} alt="" />
            <p>{slides[selectedIndex].location}</p>
          </div>
          <div className="flex flex-row justify-center gap-1">
            <img src={clock} alt="" />
            <p>
              {new Date(slides[selectedIndex].start).getDate()}(
              {
                ["일", "월", "화", "수", "목", "금", "토"][
                  new Date(slides[selectedIndex].start).getDay()
                ]
              }
              ){" "}
              {new Date(slides[selectedIndex].start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}{" "}
              ~{" "}
              {new Date(slides[selectedIndex].end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverflowCarousel;
