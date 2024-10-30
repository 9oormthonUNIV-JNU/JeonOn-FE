import homeMain from '@/../public/images/mainHome.png';
import Footer from '@/components/Home/Footer';

import '../../public/assets/fonts/Font.css';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[url('/images/mainBackground.png')] h-full bg-contain bg-center">
        <div className="mb-12">
          <img src={homeMain} alt="home" />
        </div>
        <div className="px-10 flex flex-col justify-center items-center gap-3 pb-5 mb-24">
          <div className="bg-main-guide w-full h-full flex flex-col justify-center items-center gap-10 py-16 border-4 border-main rounded-3xl">
            <div className="flex flex-col justify-center items-center text-white text-xl font-cafe24">
              <div>지금은</div>
              <div>서비스 사용 기간이</div>
              <div>아닙니다.</div>
            </div>
            <div className="flex flex-col justify-center items-center text-white text-xl font-cafe24">
              <div>11월 5일 화요일에</div>
              <div>만나요~</div>
            </div>
            <div className="flex flex-col justify-center items-center text-white text-xl font-cafe24">
              <div>감사합니다 :)</div>
            </div>
          </div>
        </div>
        <Footer />
        <div className="h-2"></div>
      </div>
    </div>
  );
}
