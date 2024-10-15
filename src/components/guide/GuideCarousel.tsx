import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import './styles.css';
import { useEffect, useState } from 'react';

export default function GuideCarousel(images: any) {
  const [imgs, setImgs] = useState(images);
  useEffect(() => {
    setImgs(images);
  }, []);
  console.log(imgs);
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
        {/* {images ? (
          images?.images.map((img: any, i: number) => (
            <SwiperSlide key={i}>
              <div>
                <div className="w-full h-80 rounded-3xl mb-5">
                  <img src={img} alt="image" />
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div>
              <div className="w-full h-80 rounded-3xl mb-5"></div>
            </div>
          </SwiperSlide>
        )} */}
      </Swiper>
    </div>
  );
}
