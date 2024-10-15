import { useState } from "react";

interface BoothDateProps {
  selected: number | null;
  onDateChange: (number: number) => void; // 날짜 변경 시 호출할 함수
}

export default function BoothDate({ selected, onDateChange }: BoothDateProps) {
  const dates = [
    { number: 5, day: "화" },
    { number: 6, day: "수" },
    { number: 7, day: "목" },
  ];

  return (
    <div className="relative w-full max-w-[90vw] h-auto mx-auto mt-[-2rem]">
      {/* 숫자와 요일을 나란히 배치하는 부모 컨테이너 */}
      <div className="flex justify-center items-end gap-[20vw]">
        {dates.map((date) => (
          <div
            key={date.number}
            className="mb-12 flex flex-col items-center relative"
            style={{
              height: "10rem", // 부모 요소의 높이 고정
            }}
          >
            {/* 숫자를 나타내는 버튼 */}
            <div
              className={`absolute bottom-0 cursor-pointer font-['Pretendard'] transition-all duration-300 transform ${
                selected === date.number
                  ? "text-[#00ff00] text-[5rem] translate-y-[-15%] scale-110" // 선택된 상태
                  : "text-white text-[4rem] hover:translate-y-[-10%] hover:text-[#00ff00]" // 기본 상태 및 hover
              }`}
              onClick={() => onDateChange(date.number)}
            >
              {date.number}
            </div>

            {/* 요일을 나타내는 텍스트 */}
            <div
              className={`absolute bottom-[-1.5rem] text-[1.2rem] font-extrabold font-['NanumSquare Neo'] ${
                selected === date.number ? "text-[#00ff00]" : "text-white"
              }`}
            >
              {date.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
