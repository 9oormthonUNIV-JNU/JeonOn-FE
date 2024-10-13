import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
// import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';
import calendar from '@/../public/assets/svgs/guide/calendar.svg';
import location from '@/../public/assets/svgs/guide/location.svg';

import GuideCarousel from '@/components/guide/GuideCarousel';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPartnerDetail } from '@/api/guide';
import axios from 'axios';
import { getToken } from '@/utils/tokenHandler';

// type TPartnersDetail = {
//   name: string;
//   description: string;
//   image: [string];
//   location: string;
//   start_date: string;
//   end_date: string;
//   bookmark: boolean;
//   created_at: string;
// };

export default function GuideDetail() {
  const { id } = useParams();
  // const { data } = useQuery({
  //   queryKey: ['partners-detail', id],
  //   queryFn: () => getPartnerDetail(id),
  // });

  const test = async () => {
    try {
      const res = await axios.post('http://3.37.52.107:8080/api/v1/login', {
        nickname: '망공',
        password: 'sqg8ac42@',
      });
      getToken(res.headers['access-token']);
    } catch (error) {
      console.error(error);
    }
  };
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
        <div>
          <button className="text-white" onClick={test}>
            로그인 테스트
          </button>
        </div>
      </div>
    </div>
  );
}
