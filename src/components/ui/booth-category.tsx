import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FilledBtn } from "../common/Button/filled-btn";
import { WhiteBorderBtn } from "../common/Button/white-border-btn";

interface BoothCategoryProps {
  onCategoryChange: (selectedCategories: string[]) => void;
}

const BoothCategory: React.FC<BoothCategoryProps> = ({ onCategoryChange }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  useEffect(() => {
    onCategoryChange(selectedCategories);
  }, [selectedCategories, onCategoryChange]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(3);
    }
  }, [emblaApi]);

  const renderButton = (category: string) => {
    const isSpecialCategory = ["주/야간", "주간", "야간"].includes(category); // 특별한 카테고리인지 확인

    const selectedClass = selectedCategories.includes(category)
      ? "bg-[#6EFA6E] text-black"
      : isSpecialCategory
      ? "bg-white text-black border-black"
      : "bg-black text-white border-white";

    return (
      <FilledBtn
        className={`h-[3vh] px-4 text-xs font-medium border shrink-0 ${selectedClass}`}
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </FilledBtn>
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex items-center">
      <div className="absolute left-0 top-0 bottom-0 w-[80px] z-10 bg-gradient-to-r from-black pointer-events-none"></div>

      <div className="embla__viewport overflow-hidden px-16" ref={emblaRef}>
        <div className="mt-3 embla__container flex space-x-1 font-medium">
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

      <div className="absolute right-0 top-0 bottom-0 w-[80px] z-10 bg-gradient-to-l from-black pointer-events-none"></div>
    </div>
  );
};

export default BoothCategory;
