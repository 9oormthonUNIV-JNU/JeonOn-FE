import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import time from "@/../public/assets/svgs/time_black.svg";
import location from "@/../public/assets/svgs/location_black.svg";
import { boothsList } from "@/api/booth"; // API 호출 함수

interface BoothCardsProps {
  selectedCategories: string[];
  selectedDate: number | null;
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

const BoothCards: React.FC<BoothCardsProps> = ({ selectedCategories, selectedDate, onCardSelect }) => {
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

    // 쿼리스트링 생성
    let queryString = `?`;

    if (categories.length > 0) {
      queryString += `category=${categories.join(",")}&`;
    }
    if (periods.length > 0) {
      queryString += `period=${periods.join(",")}`;
    }

    return queryString;
  };

  // 날짜 비교 함수
  const isDateInRange = (selectedDay: number, startDate: string, endDate: string): boolean => {
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
        let boothData: Booth[] = result.data;

        // selectedDate 필터링 적용
        if (selectedDate) {
          const selectedDateObj = new Date(selectedDate);

          // selectedDate 필터링 적용
        if (selectedDate !== null) {
          boothData = boothData.filter((booth) => {
            return isDateInRange(selectedDate, booth.start_date, booth.end_date);
          });
        }
        }

        setBooths(boothData);
      } catch (error) {
        console.error("Error fetching booths:", error);
      }
    };

    getBooths();
  }, [selectedCategories, selectedDate]);

  // 조건에 따라 렌더링
  return (
    <div className="bg-black w-full flex flex-col items-center space-y-4">
      {booths.length === 0 ? (
        <div className="mt-20 text-center text-white text-lg font-medium">
          조건에 해당하는 부스가 없습니다.
        </div>
      ) : (
        booths.map((booth) => (
          <Card
            key={booth.id}
            onClick={() => onCardSelect(booth.id)} // 카드 클릭 시 부스 ID 전달
            className="w-[90vw] max-w-[90vw] bg-white rounded-[15px] shadow-md mt-5 mx-auto cursor-pointer"
          >
            <CardHeader className="grid grid-cols-[auto_1fr] gap-2 items-center p-0.5">
              <div className="ml-2 w-[7vw] h-[7vw] bg-black rounded-full flex items-center justify-center text-[#00ff00] text-xs">
                {booth.id}
              </div>
              <CardTitle className="text-black text-[2.5vh] font-semibold font-['Pretendard']">
                {booth.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="ml-6 text-[1.5vh] px-4 pb-4">
              <div className="flex items-center space-x-1">
                <img src={location} className="w-[5%]" alt="location" />
                <div className="text-black font-normal font-['NanumSquare Neo']">
                  {booth.location}
                </div>
                <img src={time} className="w-[7%]" alt="time" />
                <div className="text-black font-normal font-['NanumSquare Neo']">
                  {booth.start_date} ~ {booth.end_date}, {booth.start_time} ~{" "}
                  {booth.end_time}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default BoothCards;
