import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css';

export default function GuideCarousel({ images, handleIndex }: any) {
  const imageArray = Array.isArray(images) ? images : images?.split(',');

  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper mb-10"
        centeredSlides={true}
        spaceBetween={10}
        onSlideChange={(e) => {
          handleIndex(e.realIndex + 1);
        }}
      >
        {imageArray && imageArray.length > 0 ? (
          imageArray.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <div>
                <div className="w-full h-80 rounded-3xl mb-5">
                  <img className="w-full h-full" src={img} alt={`image-${i}`} />
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          // images가 없을 경우 빈 슬라이드 렌더링
          <SwiperSlide>
            <div>
              <div className="w-full h-80 rounded-3xl mb-5"></div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
