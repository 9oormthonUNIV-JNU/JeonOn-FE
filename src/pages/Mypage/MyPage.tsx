import rightArrow from '@/../public/assets/svgs/rightArrow.svg';
import { useNavigate } from 'react-router-dom';

export default function MyPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-14">
        마이
      </h1>
      <div className="px-5">
        <div className="w-full h-20 bg-white rounded-lg mb-12 px-5 flex justify-start items-center">
          <h2 className="text-xl">닉네임(로그인 아이디)</h2>
        </div>
        <div
          className="flex justify-between items-center px-2"
          onClick={() => navigate('/my-page/favorites')}
        >
          <h2 className="text-white text-xl">즐겨찾기</h2>
          <div>
            <img src={rightArrow} alt="right-arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}
