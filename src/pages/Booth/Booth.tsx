import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoothCategory from "@/components/ui/booth-category";
import BoothDate from "@/components/Booth/BoothDate";
import BoothCards from "@/components/Booth/BoothCards";

export default function Booth() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // 카테고리 상태 관리
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleDateChange = (number: number) => {
    setSelectedDate(number);
  };

  // BoothCategory 컴포넌트에서 선택된 카테고리를 업데이트하는 함수
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories); // 카테고리 상태를 업데이트
  };

  // BoothCards에서 카드 선택 시 호출되는 함수로 부스 ID를 받아 처리
  const handleCardSelect = (boothId: number) => {
    const categoryQuery =
      selectedCategories.length > 0
        ? `&categories=${encodeURIComponent(selectedCategories.join(","))}`
        : "";
    navigate(`/booth/${boothId}${categoryQuery}`); // 카테고리가 없으면 쿼리에서 제외
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-main text-4xl font-cafe24">부스</h1>

      <BoothDate selectedDate={selectedDate} onDateChange={handleDateChange} />

      <img
        className="w-[80vw] h-[80vw] max-h-[305px] max-w-[303px] rounded-lg"
        src="https://via.placeholder.com/305x303"
        alt=""
      />

      {/* BoothCategory 컴포넌트에서 선택된 카테고리를 상위 컴포넌트로 전달 */}
      <BoothCategory onCategoryChange={handleCategoryChange} />

      {/* BoothCards에 카드 선택 이벤트를 전달 */}
      <BoothCards
        selectedDate={selectedDate}
        selectedCategories={selectedCategories}
        onCardSelect={handleCardSelect} // 부스 선택 시 호출
      />
    </div>
  );
}
