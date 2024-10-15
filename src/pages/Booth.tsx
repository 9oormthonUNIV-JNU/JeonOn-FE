import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui의 Button 컴포넌트 사용
import BoothCategory from "@/components/ui/category";

export default function Booth() {
  const [selected, setSelected] = useState<number | null>(null);

  // 카테고리 상태 관리
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleClick = (number: number) => {
    setSelected(number);
  };

  // BoothCategory 컴포넌트에서 선택된 카테고리를 업데이트하는 함수
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories); // 카테고리 상태를 업데이트
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-main text-4xl font-cafe24 mb-14">타임테이블</h1>
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

      {/* BoothCategory 컴포넌트에서 선택된 카테고리를 상위 컴포넌트로 전달 */}
      <BoothCategory onCategoryChange={handleCategoryChange} />

      {/* 선택된 카테고리를 렌더링하는 div */}
      <div className="mt-4">
        <h2 className="text-xl text-white mb-2">선택된 카테고리:</h2>
        {selectedCategories.length === 0 ? (
          <p className="text-white">카테고리가 선택되지 않았습니다.</p>
        ) : (
          <ul className="text-white">
            {selectedCategories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        )}
      </div>

      {/* 
        1. 어떤 카테고리가 눌려있는지 props(selectedCategory) 받아오기
        2. 전부 눌려있을 때 '조건에 해당하는 부스가 없습니다.' 렌더링
        3. 전부 안눌려있을 때 '모든 부스 랜더링'
        4. 지금 필터링 해야할 거 두개임 (날짜, 카테고리)
       */}

      {/* <FilteredBooth /> */}
    </div>
  );
}
