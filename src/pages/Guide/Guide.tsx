import { useState } from 'react';
// import favorites from '@/../public/assets/svgs/favorites.svg';
import bookmark from '@/../public/assets/svgs/bookmark.svg';
import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getNofifications, getPartners } from '@/api/guide';

export default function Guide() {
  const [clicked, setClicked] = useState(true);
  const navigate = useNavigate();
  const clickedStyle =
    'text-xl text-[#0F0] border-b-2 border-[#0F0] h-12 px-2 flex justify-center items-center';
  const defaultStyle =
    'text-xl text-white h-12 px-2 flex justify-center items-center';

  // const { data } = useQuery({
  //   queryKey: ['guide', clicked],
  //   queryFn: () => {
  //     if (clicked) getNofifications();
  //     if (!clicked) getPartners();
  //   },
  // });

  return (
    <div className="h-screen">
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
      <div className="flex flex-col justify-center items-center gap-5 px-5">
        <div
          id="1"
          className="w-full h-24 bg-white rounded-2xl px-5 py-3"
          onClick={(e) => navigate(`/guide/${e.currentTarget.id}`)}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl">제목</h3>
            <div>
              <img src={bookmark} alt="favorites" />
            </div>
          </div>
          <div>
            <span className="text-xs font-normal">
              본문내용본문내용 본문내용 본문내용
            </span>
          </div>
          <div className="flex justify-end items-end">
            <span className="text-[10px]">2024-01-01</span>
          </div>
        </div>
        <div
          id="2"
          className="w-full h-24 bg-white rounded-2xl px-5 py-3"
          onClick={(e) => navigate(`/guide/${e.currentTarget.id}`)}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl">제목</h3>
            <div>
              <img src={bookmark} alt="favorites" />
            </div>
          </div>
          <div>
            <span className="text-xs font-normal">
              본문내용본문내용 본문내용 본문내용
            </span>
          </div>
          <div className="flex justify-end items-end">
            <span className="text-[10px]">2024-01-01</span>
          </div>
        </div>
        <div
          id="3"
          className="w-full h-24 bg-white rounded-2xl px-5 py-3"
          onClick={(e) => navigate(`/guide/${e.currentTarget.id}`)}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl">제목</h3>
            <div>
              <img src={bookmark} alt="favorites" />
            </div>
          </div>
          <div>
            <span className="text-xs font-normal">
              본문내용본문내용 본문내용 본문내용
            </span>
          </div>
          <div className="flex justify-end items-end">
            <span className="text-[10px]">2024-01-01</span>
          </div>
        </div>
      </div>
    </div>
  );
}