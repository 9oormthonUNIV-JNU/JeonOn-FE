import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
// import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';
import calendar from '@/../public/assets/svgs/guide/calendar.svg';
import location from '@/../public/assets/svgs/guide/location.svg';
import GuideCarousel from '@/components/guide/GuideCarousel';

export default function GuideDetail() {
  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10">
        안내
      </h1>
      <div className="px-6">
        <div className="mb-3">
          <span className="bg-[#7CFA7C] text-xs px-5 py-1 rounded-full">
            제휴업체
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

        <GuideCarousel />

        <div className="flex justify-start items-center mb-3">
          <img src={location} alt="location" />
          <span className="text-white text-[10px]">매장 위치</span>
        </div>
        <div className="flex justify-start items-center mb-3">
          <img src={calendar} alt="calendar" className="ml-1 mr-1" />
          <span className="text-white text-[10px]">
            11월 6일(수) ~ 11월 30일(토)
          </span>
        </div>

        <div>
          <img src={divideLine} alt="divide-line" />
        </div>
        <div>{/* 여기에 설명이 들어갈 예정입니다 */}</div>
      </div>
    </div>
  );
}
