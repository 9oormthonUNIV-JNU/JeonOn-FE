// 부스 페이지와 관리자 -> 부스 등록 페이지에서 사용됨

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
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  // 카테고리 상태가 변경될 때 상위 컴포넌트로 상태 전달
  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories, onCategoryChange]);

  // 좌우 스크롤 버튼 함수
  const handleLeftClick = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const handleRightClick = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

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
    <div className="relative w-full max-w-lg mx-auto flex items-center">
      {/* 좌측 스크롤 버튼 */}
      <button
        className="pt-3 absolute left-5 z-20 h-full flex items-center"
        onClick={handleLeftClick}
      >
        <img src={left} alt="left" className="h-6" />
      </button>

      {/* 좌측 그라데이션 오버레이 */}
      <div className="absolute left-0 top-0 bottom-0 w-[80px] z-10 bg-gradient-to-r from-black pointer-events-none"></div>

      {/* 캐러셀 뷰포트 */}
      <div className="embla__viewport overflow-hidden px-16" ref={emblaRef}>
        <div className="mt-3 embla__container flex space-x-2 font-medium">
          {/* 카테고리 버튼들 렌더링 */}
          {renderButton("음식")}
          {renderButton("체험")}
          {renderButton("플리마켓")}
          {renderButton("홍보")}
          {renderButton("기타")}
          {renderButton("주/야간")}
          {renderButton("주간")}
          {renderButton("야간")}
        </div>
      </div>

      {/* 우측 그라데이션 오버레이 */}
      <div className="absolute right-0 top-0 bottom-0 w-[80px] z-10 bg-gradient-to-l from-black pointer-events-none"></div>

      {/* 우측 스크롤 버튼 */}
      <button
        className="pt-3 absolute right-5 z-20 h-full flex items-center"
        onClick={handleRightClick}
      >
        <img src={right} alt="right" className="h-6" />
      </button>
    </div>
  );
};

export default BoothCategory;
