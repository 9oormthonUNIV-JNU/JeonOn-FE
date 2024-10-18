import { useState } from "react";
import BoothCategory from "@/components/ui/category";
import BoothDate from "@/components/Booth/booth-date";

export default function Booth() {
  const [selected, setSelected] = useState<number | null>(null);

  // 카테고리 상태 관리
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleDateChange = (number: number) => {
    setSelected(number);
  };

  // BoothCategory 컴포넌트에서 선택된 카테고리를 업데이트하는 함수
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories); // 카테고리 상태를 업데이트
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-main text-4xl font-cafe24">부스</h1>

      <BoothDate selected={selected} onDateChange={handleDateChange} />

      <img
        className="w-[80vw] h-[80vw] max-h-[305px] max-w-[303px] rounded-lg"
        src="https://via.placeholder.com/305x303"
        alt=""
      />

      {/* BoothCategory 컴포넌트에서 선택된 카테고리를 상위 컴포넌트로 전달 */}
      <BoothCategory onCategoryChange={handleCategoryChange} />

      {/* <FilteredBooth /> */}
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
    </div>
  );
}
