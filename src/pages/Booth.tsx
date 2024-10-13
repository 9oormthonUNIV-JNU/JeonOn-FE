export default function Booth() {
  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-14">
        부스
      </h1>
      <div className="flex justify-center items-center gap-[30px] px-[30px] text-center">
        <div className="text-white text-[50px] font-normal font-['Pretendard']">
          5
        </div>
        <div className="text-white text-[50px] font-normal font-['Pretendard']">
          6
        </div>
        <div className="text-white text-[50px] font-normal font-['Pretendard']">
          7
        </div>
      </div>
    </div>
  );
}
