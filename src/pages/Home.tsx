import home from '@/../public/images/home.png';
import Footer from '@/components/Home/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-custom-gradient h-screen">
      <div className="mb-24">
        <img src={home} alt="home" />
      </div>
      <div className="px-12 flex flex-col justify-evenly items-center gap-3 pb-5 mb-16">
        <div
          className="w-full h-14 bg-main-guide rounded-3xl flex flex-col justify-center items-center text-white shadow-2xl border border-[#0F0]"
          onClick={() => navigate('/guide')}
        >
          <h1 className="text-xl">안내</h1>
          <span className="text-xs">
            지도와 제휴업체를 한 눈에 볼 수 있어요!
          </span>
        </div>
        <div
          className="w-full h-14 bg-black rounded-3xl flex justify-center items-center text-[#0F0] text-xl shadow-2xl"
          onClick={() => navigate('/contents')}
        >
          콘텐츠
        </div>
        <div
          className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl shadow-2xl"
          onClick={() => navigate('/time-table')}
        >
          타임테이블
        </div>
        <div
          className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl shadow-2xl"
          onClick={() => navigate('/booth')}
        >
          부스
        </div>
        <div
          className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl shadow-2xl"
          onClick={() => navigate('/time-capsule')}
        >
          타임캡슐
        </div>
        <div
          className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl shadow-2xl"
          onClick={() => navigate('/feedback')}
        >
          피드백
        </div>
      </div>

      <Footer />
      <div className="h-2"></div>
    </div>
  );
}
