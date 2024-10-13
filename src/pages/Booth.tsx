import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui의 Button 컴포넌트 사용

export default function Booth() {
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (number: number) => {
    setSelected(number);
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-14">
        부스
      </h1>
      <div className="mb-10 flex justify-center items-center gap-[10px] px-[30px] text-center">
        {[5, 6, 7].map((number) => (
          <Button
            key={number} // 고유한 number 값을 key로 사용
            className={`hover:bg-black bg-black text-white cursor-pointer transition-all duration-300 transform ${
              selected === number
                ? "text-[#00ff00] scale-110 text-[70px]" // 선택된 상태
                : "text-[50px] hover:text-[#00ff00]" // 기본 상태 및 hover
            }`}
            onClick={() => handleClick(number)} // 클릭한 number로 상태 업데이트
          >
            {number}
          </Button>
        ))}
      </div>
      <div className="text-white w-[80vw] max-w-[305px] h-[80vw] max-h-[305px] relative border-2 border-white">
        부스 이미지
      </div>
    </div>
  );
}
