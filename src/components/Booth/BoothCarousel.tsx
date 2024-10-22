import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import '../guide/styles.css';

interface BoothCarouselProps {
  images: string[]; // 부스 이미지 배열
  handleIndex: (index: number) => void; // 슬라이드 변경 시 호출할 함수
}

export default function BoothCarousel({ images, handleIndex }: BoothCarouselProps) {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        pagination={{
            clickable: true,  // 페이지네이션이 클릭 가능하도록 설정
        }}
        modules={[Pagination]}
        className="mySwiper mb-10"
        centeredSlides={true}
        spaceBetween={10}
        onSlideChange={(e) => {
          handleIndex(e.realIndex + 1);
        }}
      >
        {images && images.length > 0 ? (
          images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="booth-slide">
                <div className="w-full h-auto object-contain mb-5">
                  <img className="w-full h-full object-cover" src={img} alt={`booth-${i}`} />
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          // 이미지가 없을 경우 빈 슬라이드 렌더링
          <SwiperSlide>
            <div className="booth-slide">
              <div className="w-full h-80 rounded-3xl mb-5 bg-gray-100">
                <p className="text-center text-lg">No images available</p>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
