import { useState } from 'react';
import favorites from '@/../public/assets/svgs/favorites.svg';
import bookmark from '@/../public/assets/svgs/bookmark.svg';
import love from '@/../public/svgs/love.svg';
import { useNavigate } from 'react-router-dom';
import GuideCarousel from '@/components/guide/GuideCarousel';
import { useQuery } from '@tanstack/react-query';
import { getZones, getPartners } from '@/api/guide';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';

export default function Guide() {
  const [clicked, setClicked] = useState(true);
  const navigate = useNavigate();
  const clickedStyle =
    'text-xl text-[#0F0] border-b-2 border-[#0F0] h-12 px-2 flex justify-center items-center';
  const defaultStyle =
    'text-xl text-white h-12 px-2 flex justify-center items-center';

  const { data } = useQuery({
    queryKey: ['guide', clicked],
    queryFn: async () => {
      if (clicked) return await getZones();
      if (!clicked) return await getPartners();
    },
  });
  console.log(data);

  const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-3">
        안내
      </h1>
      <div className="w-full h-12 border-b border-[#5B5B5B] flex justify-center gap-24 items-center mb-8">
        <div
          className={clicked ? clickedStyle : defaultStyle}
          onClick={() => setClicked(true)}
        >
          지도
        </div>
        <div
          className={clicked ? defaultStyle : clickedStyle}
          onClick={() => setClicked(false)}
        >
          제휴업체
        </div>
      </div>
      {!clicked ? (
        <div className="flex flex-col justify-center items-center gap-5 px-5">
          {data?.data.map((item: any) => (
            <div
              key={item.id}
              id={item.id}
              className="w-full h-24 bg-white rounded-2xl px-5 py-3"
              onClick={(e) => navigate(`/guide/${e.currentTarget.id}`)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl">{item.name}</h3>
                <div>
                  {bookmark ? (
                    <img src={bookmark} alt="favorites" />
                  ) : (
                    <img src={favorites} alt="favorites" />
                  )}
                </div>
              </div>
              <div>
                <span className="text-xs font-normal">{item.description}</span>
              </div>
              <div className="flex justify-end items-end">
                <span className="text-[10px]">
                  {formatDateToYYYYMMDD(item.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-5">
          <div className="mb-16">
            <GuideCarousel images={[]} />
          </div>
          <div className="w-full bg-map rounded-xl border border-[#0F0] flex flex-col">
            {items.map((item, index) => (
              <div className="px-3" key={index}>
                <div
                  className={`gap-3 flex justify-start px-2 py-3 border-b border-[#0F0] ${
                    index === items.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div>
                    <img src={love} alt="description" />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="text-sm text-white">
                      지도 설명 제목(ex,1번 푸드트럭 존)
                    </h1>
                    <span className="text-[10px] text-white">
                      내용(ex, 518 거리 위치)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
