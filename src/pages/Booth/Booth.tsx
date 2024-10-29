import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoothCategory from "@/components/ui/booth-category";
import BoothDate from "@/components/Booth/BoothDate";
import BoothCards from "@/components/Booth/BoothCards";
import BoothCarousel from "@/components/Booth/BoothCarousel";
import square from "@/../public/images/518-square_booth.png";
import backgate from "@/../public/images/backgate-street_booth.png";

export default function Booth() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const images=[square, backgate];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handleDateChange = (number: number) => {
    setSelectedDate(number);
  };

  const handleIndex = (index: number) => {
    const location = index === 0 ? 'backgate-street' : 'square-518';
    setSelectedLocation(location);
  };

  // BoothCategory 컴포넌트에서 선택된 카테고리를 업데이트하는 함수
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories); // 카테고리 상태를 업데이트
  };

  

  // BoothCards에서 카드 선택 시 호출되는 함수로 부스 ID를 받아 처리
  // 쿼리 문자열 생성 및 페이지 이동
  const handleCardSelect = (boothId: number) => {
    navigate(`/booth/${boothId}`);
  }

  return (
    <div className="h-auto flex flex-col items-center">
      <h1 className="text-main text-4xl font-cafe24 mb-5">부스</h1>

      <BoothDate selectedDate={selectedDate} onDateChange={handleDateChange} />

      <div className="mb-5 max-w-[90%]">
            <BoothCarousel images={images} handleIndex={handleIndex} />
          </div>

      {/* BoothCategory 컴포넌트에서 선택된 카테고리를 상위 컴포넌트로 전달 */}
      <BoothCategory onCategoryChange={handleCategoryChange} />

      {/* BoothCards에 카드 선택 이벤트를 전달 */}
      <BoothCards
        selectedDate={selectedDate}
        selectedCategories={selectedCategories}
        selectedLocation={selectedLocation}
        onCardSelect={handleCardSelect} // 부스 선택 시 호출
      />
    </div>
  );
}
