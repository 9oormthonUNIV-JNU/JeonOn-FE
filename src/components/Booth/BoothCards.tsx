import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import time from "@/../public/assets/svgs/time_black.svg";
import location from "@/../public/assets/svgs/location_black.svg";
import { boothsList } from "@/api/booth"; // API 호출 함수
import LikingBooth from "../Booth/LikingBooth.tsx";

interface BoothCardsProps {
  selectedCategories: string[];
  selectedDate: number | null;
  selectedLocation: string;
  onCardSelect: (boothId: number) => void; // 카드 선택 시 호출되는 함수
}

interface Booth {
  id: number;
  name: string;
  location: string;
  index: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  like: boolean;
  like_count: number;
}

export default function BoothCards({
  selectedCategories,
  selectedDate,
  selectedLocation,
  onCardSelect,
}: BoothCardsProps) {
  const [booths, setBooths] = useState<Booth[]>([]);

  // Query string 생성 로직 (위치 필터링은 제외)
  const createQueryString = () => {
    const categoryMapping: { [key: string]: string } = {
      음식: "food",
      체험: "experience",
      플리마켓: "flea-market",
      홍보: "promotion",
      기타: "etc",
    };

    const periodMapping: { [key: string]: string } = {
      주간: "daytime",
      야간: "nighttime",
      "주/야간": "alltime",
    };

    // 필터링된 카테고리 값 추출
    const categories = selectedCategories
      .filter(
        (category) => categoryMapping[category as keyof typeof categoryMapping]
      )
      .map(
        (category) => categoryMapping[category as keyof typeof categoryMapping]
      );

    const periods = selectedCategories
      .filter(
        (category) => periodMapping[category as keyof typeof periodMapping]
      )
      .map((category) => periodMapping[category as keyof typeof periodMapping]);

    if (categories.length == 0 && periods.length == 0) {
      return ""; // 필터가 없으면 빈 쿼리로 처리
    }

    // 쿼리스트링 생성
    let queryString = `?`;

    if (categories.length > 0) {
      queryString += `category=${categories.join(",")}&`;
    }
    if (periods.length > 0) {
      queryString += `period=${periods.join(",")}`;
    }
    // 필터링 조건이 없으면 빈 문자열을 반환
    return queryString;
  };

  // 날짜 비교 함수
  const isDateInRange = (
    selectedDay: number,
    startDate: string,
    endDate: string
  ): boolean => {
    const startDay = new Date(startDate).getDate(); // start_date의 일(day) 추출
    const endDay = new Date(endDate).getDate(); // end_date의 일(day) 추출
    return selectedDay >= startDay && selectedDay <= endDay;
  };

  // API 호출로 부스 데이터를 받아오는 로직
  useEffect(() => {
    const getBooths = async () => {
      try {
        const queryString = createQueryString();
        const result = await boothsList(queryString); // API 요청
        console.log("API Response Data: ", result);
        let boothData: Booth[] = result?.data || [];
        console.log(boothData);

        // selectedDate 필터링 적용
        if (selectedDate !== null) {
          boothData = boothData.filter((booth) => {
            return isDateInRange(
              selectedDate,
              booth.start_date,
              booth.end_date
            );
          });
        }

        // selectedLocation 필터링 적용
        if (selectedLocation) {
          boothData = boothData.filter((booth) => {
            return booth.location === selectedLocation;
          });
        }

        setBooths(boothData);
      } catch (error) {
        console.error("Error fetching booths:", error);
      }
    };

    getBooths();
  }, [selectedCategories, selectedDate, selectedLocation]);

  const formatLocation = (locationStr: string, boothIndex: number) => {
    let locationText = "";
  
    // locationStr에 따라 해당하는 위치 이름을 설정
    if (locationStr === "square-518") {
      locationText = "5.18 광장";
    } else if (locationStr === "backgate-street") {
      locationText = "후문 거리";
    } else {
      locationText = "대운동장"; // 추가적인 위치가 있을 경우에 대비한 기본값
    }
  
    // 부스 번호를 포함한 문장을 반환
    return `${locationText} ${boothIndex}번 부스`;
  };

  // 시간을 포맷하는 함수
  const formatTime = (timeStr: string) => {
    return timeStr.slice(0, 5); // 'HH:MM:SS'에서 초 부분을 제외한 'HH:MM' 형식으로 변환
  };

  // 날짜와 시간을 포맷하는 함수
  const formatDateTime = (
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string
  ) => {
    const startDay = new Date(start_date).getDate(); // 시작 날짜에서 일(day) 추출
    const endDay = new Date(end_date).getDate();
    const formattedStartTime = formatTime(start_time);
    const formattedEndTime = formatTime(end_time);
    if (startDay !== endDay) {
      return `${startDay}일, ${endDay}일, ${formattedStartTime} ~ ${formattedEndTime}`;
    }

    // 시작 날짜와 종료 날짜가 같으면 기존 형식으로 표시
    return `${startDay}일, ${formattedStartTime} ~ ${formattedEndTime}`;
  };

  // 조건에 따라 렌더링
  return (
    <div className="bg-black w-full flex flex-col items-center space-y-4 mb-10 mt-5">
      {booths.length === 0 ? (
        <div className="mt-20 text-center text-white text-lg font-medium">
          조건에 해당하는 부스가 없습니다.
        </div>
      ) : (
        booths.map((booth) => (
          <Card
            key={booth.id}
            onClick={() => onCardSelect(booth.id)} // 카드 클릭 시 부스 ID 전달
            className="relative w-[90vw] max-w-[90vw] bg-white rounded-[15px] shadow-md mt-5 mx-auto"
          >
            <CardHeader className="grid grid-cols-[auto_1fr] gap-2 items-center p-0.5">
              <div className="mt-2 font-cafe24 ml-2 w-5 h-5 bg-black rounded-full flex items-center justify-center text-[#00ff00] text-bold pb-1 text-sm">
                {booth.id}
              </div>
              <CardTitle className="text-black text-[2.5vh] font-semibold font-['Pretendard']">
                {booth.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="ml-6 text-[1.2vh] px-4 pb-4">
            <div className="relative flex items-center space-x-1">
  <img src={location} className="w-3" alt="location" />
  <div className="text-black font-normal font-['NanumSquare Neo']">
    {formatLocation(booth.location, booth.index)}
  </div>

  <div className="absolute grid left-28 grid-cols-[auto_1fr] gap-1 items-center">
    <img src={time} className="w-4" alt="time" />
    <div className="text-black font-normal font-['NanumSquare Neo']">
      {formatDateTime(booth.start_date, booth.end_date, booth.start_time, booth.end_time)}
    </div>
  </div>
</div>
            </CardContent>
            <div
              className="top-3 right-4 absolute"
              onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
            >
              <LikingBooth boothId={booth.id} />
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
