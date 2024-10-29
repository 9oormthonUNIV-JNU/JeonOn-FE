import React, { useRef } from "react";
import left from "@/../public/assets/svgs/left.svg";
import right from "@/../public/assets/svgs/right.svg";
import "./BoothCarousel.css";

interface BoothCarouselProps {
  images: string[];
  handleIndex: (index: number) => void;
}

export default function BoothCarousel({
  images,
  handleIndex,
}: BoothCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(
        carouselRef.current.scrollLeft / carouselRef.current.offsetWidth
      );
      handleIndex(index);
    }
  };

  return (
    <div className="carousel-container">
      <button className="left-arrow" onClick={scrollLeft}>
        <img src={left} alt="left" className="h-4 w-4" />
      </button>

      <div
        ref={carouselRef}
        className="carousel-slide scrollbar-hide"
        onScroll={handleScroll}
        style={{
          overflowX: "scroll",
          display: "flex",
          scrollSnapType: "x mandatory",
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="carousel-item flex-shrink-0 w-full"
            style={{ minWidth: "100%", scrollSnapAlign: "center" }}
          >
            <img
              src={img}
              alt={`carousel-${index}`}
              className="carousel-image"
              style={{ width: "336px", height: "336px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <button className="right-arrow" onClick={scrollRight}>
        <img src={right} alt="right" className="h-4 w-4" />
      </button>
    </div>
  );
}
