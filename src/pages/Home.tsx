import home from '@/../public/assets/images/home.png';

export default function Home() {
  return (
    <div className="bg-custom-gradient h-screen">
      <div className="mb-20">
        <img src={home} alt="home" />
      </div>
      <div className="px-12 flex flex-col justify-evenly items-center gap-3 pb-5">
        <div className="w-full h-14 bg-black rounded-3xl flex justify-center items-center text-[#0F0] text-xl">
          안내
        </div>
        <div className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl">
          타임테이블
        </div>
        <div className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl">
          부스
        </div>
        <div className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl">
          타임캡슐
        </div>
        <div className="w-full h-14 bg-black rounded-full flex justify-center items-center text-[#0F0] text-xl">
          피드백
        </div>
      </div>
    </div>
  );
}
