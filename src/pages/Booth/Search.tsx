export default function BoothSearch() {
  return (
    <div className="w-[390px] h-[844px] relative bg-black">
      <div className="left-[162px] top-[40px] absolute text-[#56fb56] text-[35px] font-normal font-['Cafe24 ClassicType']">
        부스
      </div>
      <div className="w-7 h-7 left-[302px] top-[18px] absolute">
        <div className="w-[16.33px] h-[16.33px] left-[4.67px] top-[4.67px] absolute rounded-full border-2 border-[#00ff00]" />
      </div>
      <div className="w-[334px] h-[101px] left-[28px] top-[198px] absolute">
        <div className="w-[334px] h-[101px] left-0 top-0 absolute">
          <div className="w-[334px] h-[101px] left-0 top-0 absolute bg-white rounded-[10px] border border-white" />
          <div className="w-[18px] h-[18px] left-[11px] top-[8px] absolute">
            <div className="w-[10.50px] h-[10.50px] left-[3px] top-[3px] absolute rounded-full border-2 border-black" />
          </div>
          <div className="w-[313px] h-[0px] left-[11px] top-[32px] absolute border border-[#c8c8c8]"></div>
        </div>
        <div className="left-[34px] top-[36px] absolute">
          <span className="text-[#166ff4] text-[15px] font-normal font-['Pretendard']">
            라
          </span>
          <span className="text-black text-[15px] font-normal font-['Pretendard']">
            멘
          </span>
        </div>
        <div className="w-[42px] h-[21px] left-[34px] top-[55px] absolute">
          <span className="text-[#166ff4] text-[15px] font-normal font-['Pretendard']">
            라
          </span>
          <span className="text-black text-[15px] font-normal font-['Pretendard']">
            이브
            <br />
          </span>
        </div>
        <div className="w-[42px] h-[18px] left-[34px] top-[73px] absolute">
          <span className="text-[#166ff4] text-[15px] font-normal font-['Pretendard']">
            라
          </span>
          <span className="text-black text-[15px] font-normal font-['Pretendard']">
            라라
            <br />
          </span>
        </div>
        <div className="left-[34px] top-[9px] absolute text-black text-[15px] font-normal font-['Pretendard']">
          라
        </div>
      </div>
      <div className="w-[334px] h-10 left-[28px] top-[129px] absolute">
        <div className="w-[21px] h-[21px] left-[296px] top-[8px] absolute">
          <div className="w-[12.25px] h-[12.25px] left-[3.50px] top-[3.50px] absolute rounded-full border-2 border-white" />
        </div>
        <div className="w-[334px] h-10 left-0 top-0 absolute rounded-[30px] border border-white" />
        <div className="left-[17px] top-[14px] absolute">
          <span className="text-white text-xs font-normal font-['NanumSquare Neo']">
            부스명을 정확하게 입력해주세요.
          </span>
          <span className="text-white text-[7px] font-normal font-['NanumSquare Neo']">
            {" "}
          </span>
        </div>
      </div>
      <div className="w-[147px] left-[121px] top-[385px] absolute text-white text-xl font-medium font-['Pretendard']">
        실시간 인기 부스
      </div>
      <div className="w-[339px] h-10 left-[25px] top-[432px] absolute">
        <div className="w-[339px] h-10 left-0 top-0 absolute bg-white rounded-[15px]">
          <div className="w-[55px] h-6 left-[55px] top-[9px] absolute text-black text-xl font-medium font-['Pretendard']">
            라이브
          </div>
          <div className="w-4 h-[13px] left-[304px] top-[9px] absolute" />
          <div className="w-3 h-[11.53px] left-[306px] top-[18.31px] absolute text-black text-[10px] font-normal font-['Pretendard']">
            34
          </div>
        </div>
        <div className="w-[26px] h-[27px] left-[23px] top-[7px] absolute" />
        <div className="w-[29px] h-2 left-[22px] top-[13px] absolute text-center text-[#7bf97b] text-[10px] font-black font-['Pretendard']">
          1위
        </div>
      </div>
      <div className="w-[339px] h-10 left-[23px] top-[479px] absolute">
        <div className="w-[339px] h-10 left-0 top-0 absolute bg-white rounded-[15px]">
          <div className="w-[55px] h-6 left-[55px] top-[9px] absolute text-black text-xl font-medium font-['Pretendard']">
            라이브
          </div>
          <div className="w-4 h-[13px] left-[304px] top-[9px] absolute" />
          <div className="w-3 h-[11.53px] left-[306px] top-[18.31px] absolute text-black text-[10px] font-normal font-['Pretendard']">
            24
          </div>
        </div>
        <div className="w-[26px] h-[27px] left-[23px] top-[7px] absolute" />
        <div className="w-[29px] h-2 left-[22px] top-[13px] absolute text-center text-[#7bf97b] text-[10px] font-black font-['Pretendard']">
          2위
        </div>
      </div>
    </div>
  );
}
