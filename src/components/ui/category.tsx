import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import left from "@/../public/assets/svgs/left.svg";
import right from "@/../public/assets/svgs/right.svg";
import { FilledBtn } from "../common/Button/filled-btn";
import { WhiteBorderBtn } from "../common/Button/white-border-btn";

// onCategoryChange 함수의 반환 타입을 명시적으로 void로 지정
interface BoothCategoryProps {
  onCategoryChange: (selectedCategories: string[]) => void;
}

const BoothCategory: React.FC<BoothCategoryProps> = ({ onCategoryChange }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  // 선택된 버튼들을 관리하는 배열
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 버튼 클릭 시 실행되는 함수
  const handleCategoryClick = (category: string) => {
    // 이미 선택된 카테고리라면 배열에서 제거, 아니면 추가
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  // 카테고리 상태가 변경될 때 상위 컴포넌트로 상태 전달
  useEffect(() => {
    onCategoryChange(selectedCategories); // 상태가 변경될 때마다 상위 컴포넌트에 전달
  }, [selectedCategories, onCategoryChange]);

  // 카테고리 버튼 렌더링
  const renderButton = (category: string) => {
    return selectedCategories.includes(category) ? (
      <FilledBtn
        className="h-[3vh] px-4 text-xs font-semibold"
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </FilledBtn>
    ) : (
      <WhiteBorderBtn
        className="h-[3vh] px-4 text-xs font-thin border-2"
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </WhiteBorderBtn>
    );
  };

  return (
    <div className="relative embla w-full max-w-lg mx-auto">
      <div className="embla__viewport overflow-hidden px-4" ref={emblaRef}>
        <div className="mt-5 embla__container flex space-x-2 font-medium">
          <img src={left} alt="left" />
          
          {/* 버튼 렌더링 */}
          {renderButton("음식")}
          {renderButton("체험")}
          {renderButton("플리마켓")}
          {renderButton("홍보")}
          {renderButton("기타")}
          {renderButton("주/야간")}
          {renderButton("주간")}
          {renderButton("야간")}
          
          <img src={right} alt="right" />
        </div>
      </div>
    </div>
  );
};

export default BoothCategory;
