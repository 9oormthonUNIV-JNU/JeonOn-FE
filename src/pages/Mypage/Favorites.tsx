import rightArrow from '@/../public/assets/svgs/rightArrow.svg';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div className="mb-9">
        <h1 className="text-[#0F0] text-[35px] text-center font-bold font-cafe24 mb-2">
          마이
        </h1>
        <h3 className="text-xl text-white text-center font-pretendard">
          즐겨찾기
        </h3>
      </div>

      <div className="px-5 flex flex-col justify-center items-stretch gap-14">
        <div
          className="flex justify-between items-center px-2"
          onClick={() => navigate('/my-page/favorites/booth')}
        >
          <h2 className="text-white text-xl font-pretendard">부스</h2>
          <div>
            <img src={rightArrow} alt="right-arrow" />
          </div>
        </div>

        <div
          className="flex justify-between items-center px-2"
          onClick={() => navigate('/my-page/favorites/announcement')}
        >
          <h2 className="text-white text-xl font-pretendard">콘텐츠</h2>
          <div>
            <img src={rightArrow} alt="right-arrow" />
          </div>
        </div>

        <div
          className="flex justify-between items-center px-2"
          onClick={() => navigate('/my-page/favorites/affiliate')}
        >
          <h2 className="text-white text-xl font-pretendard">제휴업체</h2>
          <div>
            <img src={rightArrow} alt="right-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}
