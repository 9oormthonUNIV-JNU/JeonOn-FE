import React, { useCallback, useRef, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { events, EventType } from "@/constants/events";

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel: React.FC = () => {
  const options: EmblaOptionsType = {
    loop: false,
    align: "center",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 슬라이드 인덱스
  const tweenFactor = useRef<number>(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((): void => {
    if (!emblaApi) return; // emblaApi가 초기화되었는지 확인
    tweenNodes.current = emblaApi.slideNodes().map((slideNode: HTMLElement) => {
      return slideNode.querySelector(".embla__slide__content") as HTMLElement;
    });
  }, [emblaApi]);

  const setTweenFactor = useCallback((): void => {
    if (!emblaApi) return; // emblaApi가 초기화되었는지 확인
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, [emblaApi]);

  const tweenScale = useCallback((): void => {
    if (!emblaApi) return; // emblaApi가 초기화되었는지 확인
    const scrollProgress = emblaApi.scrollProgress(); // 현재 스크롤 위치를 반환
    const slidesInView = emblaApi.slidesInView(); // 화면에 보이는 슬라이드 인덱스

    emblaApi
      .scrollSnapList()
      .forEach((scrollSnap: number, snapIndex: number) => {
        const diffToTarget = scrollSnap - scrollProgress;
        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current); // 중앙에 가까울수록 tweenValue가 1에 가까워짐
        const scale = numberWithinRange(tweenValue, 0.85, 1).toString(); // 0.85 ~ 1 범위의 스케일 값을 계산
        const tweenNode = tweenNodes.current[snapIndex];

        if (tweenNode) {
          // 중앙에 가장 가까운 슬라이드만 scale 적용
          if (slidesInView.includes(snapIndex)) {
            tweenNode.style.transform = `scale(${scale})`;
          } else {
            tweenNode.style.transform = `scale(0.85)`; // 중앙에서 벗어난 슬라이드는 기본 크기
          }
        }
      });
  }, [emblaApi]);

  // 슬라이드 선택 이벤트 핸들러
  const onSelect = useCallback((): void => {
    if (!emblaApi) return; // emblaApi가 초기화되었는지 확인
    const index = emblaApi.selectedScrollSnap(); // 현재 선택된 슬라이드의 인덱스 가져오기
    setSelectedIndex(index); // 선택된 인덱스를 상태로 저장
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return; // emblaApi가 초기화되었는지 확인

    setTweenNodes();
    setTweenFactor();
    tweenScale();

    emblaApi.on("reInit", () => {
      setTweenNodes();
      setTweenFactor();
      tweenScale();
    });
    emblaApi.on("scroll", tweenScale); // 인수 전달 없이 함수만 참조
    emblaApi.on("select", onSelect); // 인수 전달 없이 함수만 참조

    return () => {
      if (emblaApi) {
        emblaApi.off("select", onSelect);
        emblaApi.off("scroll", tweenScale); // 이벤트 리스너 제거
      }
    };
  }, [emblaApi, tweenScale, setTweenNodes, setTweenFactor, onSelect]);

  const specialGuests: EventType[] = events.filter(
    (event) => event.special === true
  );

  const virtualGuests: EventType[] = [
    {
      order: 0,
      start: "",
      end: "",
      content: "virtual",
      location: "",
      special: true,
      img: "",
    },
    ...specialGuests,
    {
      order: events.length + 1,
      start: "",
      end: "",
      content: "virtual",
      location: "",
      special: true,
      img: "",
    },
  ];

  const realSelectedIndex = selectedIndex - 1; // 가상 슬라이드를 제외한 실제 슬라이드의 인덱스 계산

  const selectedGuest =
    realSelectedIndex >= 0 && realSelectedIndex < specialGuests.length
      ? specialGuests[realSelectedIndex]
      : null;

  return (
    <div className="embla w-full max-w-4xl mx-auto">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {virtualGuests.map((guest, index) => (
            <div
              key={index}
              className={`embla__slide flex-none ${
                guest.content === "virtual" ? "w-8" : "w-36"
              }`}
              style={
                guest.content === "virtual"
                  ? { pointerEvents: "none", opacity: 0 }
                  : {}
              }
            >
              {guest.content === "virtual" ? (
                <div className="embla__slide__content"></div>
              ) : (
                <div className="embla__slide__content bg-white w-36 h-36 rounded-xl flex items-center justify-center transition-transform duration-300 ease-out">
                  <img
                    src={guest.img}
                    alt={guest.content}
                    className="object-cover rounded-xl"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 선택된 슬라이드의 이름을 박스 아래에 표시 */}
      {/* mt-2로 간격을 줄여서 캐러셀과 텍스트 사이의 공간을 줄임 */}
      {selectedGuest && (
        <div className="mt-2 font-neurimbo text-center text-lg font-bold text-main">
          {selectedGuest?.content || ""}
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
