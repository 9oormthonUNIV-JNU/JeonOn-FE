import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
// import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css';

export default function GuideDetail() {
  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10">
        안내
      </h1>
      <div className="px-6">
        <div className="mb-3">
          <span className="bg-[#7CFA7C] text-xs px-5 py-1 rounded-full">
            공지사항
          </span>
        </div>
        <div className="mb-1 flex justify-between items-center">
          <h1 className="text-white text-3xl">제목</h1>
          <div>
            <img src={bookmark} alt="favorites" />
          </div>
        </div>
        <div className="mb-3">
          <span className="text-white text-xs">2024-01-01</span>
        </div>

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

        <div>
          <img src={divideLine} alt="divide-line" />
        </div>
      </div>
    </div>
  );
}
