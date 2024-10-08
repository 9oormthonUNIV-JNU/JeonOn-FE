import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css';

export default function GuideCarousel() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper mb-10"
        centeredSlides={true}
        spaceBetween={10}
      >
        <SwiperSlide>
          <div>
            <div className="w-full h-80 rounded-3xl mb-5"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="w-full h-80 rounded-3xl mb-5"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="w-full h-80 rounded-3xl mb-5"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
