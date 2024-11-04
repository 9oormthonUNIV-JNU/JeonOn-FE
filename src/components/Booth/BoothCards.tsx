import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import time from "@/../public/assets/svgs/time_black.svg";
import location from "@/../public/assets/svgs/location_black.svg";
import { boothsList } from "@/api/booth";
import LikingBooth from "../Booth/LikingBooth.tsx";
import { isLoggedIn } from "@/api/login.ts";
import SignInModal from "../common/Modal/SignInModal.tsx";

interface BoothCardsProps {
  selectedCategories: string[];
  selectedDate: number | null;
  selectedLocation: string;
  onCardSelect: (boothId: number) => void;
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
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    };

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
      return "";
    }

    let queryString = `?`;

    if (selectedLocation) {
      queryString += `location=${selectedLocation}&`;
    }
    if (categories.length > 0) {
      queryString += `category=${categories.join(",")}&`;
    }
    if (periods.length > 0) {
      queryString += `period=${periods.join(",")}`;
    }
    return queryString;
  };

  const isDateInRange = (
    selectedDay: number,
    startDate: string,
    endDate: string
  ): boolean => {
    const startDay = new Date(startDate).getDate();
    const endDay = new Date(endDate).getDate();
    return selectedDay >= startDay && selectedDay <= endDay;
  };

  useEffect(() => {
    const getBooths = async () => {
      try {
        const queryString = createQueryString();
        const result = await boothsList(queryString);
        console.log("API Response Data: ", result);
        let boothData: Booth[] = result?.data || [];

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
            return (
              booth.location.toLowerCase().trim() ===
              selectedLocation.toLowerCase().trim()
            );
          });
        }

        setBooths(boothData);
        console.log(queryString);
      } catch (error) {
        console.error("Error fetching booths:", error);
      }
    };

    getBooths();
  }, [selectedCategories, selectedDate, selectedLocation]);

  const formatLocation = (locationStr: string, boothIndex: number) => {
    let locationText = "";

    if (locationStr === "square-518") {
      locationText = "5.18 광장";
    } else if (locationStr === "backgate-street") {
      locationText = "후문 거리";
    } else {
      locationText = "대운동장";
    }
    return `${locationText} ${boothIndex}번 부스`;
  };

  const formatTime = (timeStr: string) => {
    return timeStr.slice(0, 5);
  };

  const formatDateTime = (
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string
  ) => {
    const startDay = new Date(start_date).getDate();
    const endDay = new Date(end_date).getDate();
    const formattedStartTime = formatTime(start_time);
    const formattedEndTime = formatTime(end_time);
    if (startDay !== endDay) {
      return `${startDay}일 ~ ${endDay}일, ${formattedStartTime} ~ ${formattedEndTime}`;
    }
    return `${startDay}일, ${formattedStartTime} ~ ${formattedEndTime}`;
  };

  return (
    <div className="bg-black w-full flex flex-col items-center space-y-4 mb-10 mt-5 font-pretendard">
      {booths.length === 0 ? (
        <div className="mt-20 text-center text-white text-lg font-medium">
          조건에 해당하는 부스가 없습니다.
        </div>
      ) : (
        booths.map((booth) => (
          <Card
            key={booth.id}
            onClick={() => onCardSelect(booth.id)}
            className="relative w-[90vw] max-w-[90vw] bg-white rounded-[15px] shadow-md mt-5 mx-auto"
          >
            <CardHeader className="grid grid-cols-[auto_1fr] gap-2 items-center p-0.5">
              <div className="ml-2 rounded-full shrink-0 bg-black w-6 h-6 flex justify-center items-center">
                <div className="text-main text-xs font-extrabold justify-center items-center flex">
                  {booth.index}
                </div>
              </div>
              <CardTitle className="text-black text-[2.5vh] font-medium font-pretendard break-words max-w-[80%] truncate overflow-hidden whitespace-nowrap">
                {booth.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="ml-6 text-[1.2vh] px-4 mt-5 pb-3">
              <div className="relative flex items-center space-x-1">
                <img src={location} className="w-3" alt="location" />
                <div className="text-black font-normal font-['NanumSquare Neo']">
                  {formatLocation(booth.location, booth.index)}
                </div>

                <div className="absolute grid left-32 grid-cols-[auto_1fr] gap-1 items-center">
                  <img src={time} className="w-4" alt="time" />
                  <div className="text-black font-normal font-['NanumSquare Neo']">
                    {formatDateTime(
                      booth.start_date,
                      booth.end_date,
                      booth.start_time,
                      booth.end_time
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <div
              className="top-2 right-3 absolute"
              onClick={(e) => {
                if (!isLoggedIn()) {
                  setShowLoginModal(true);
                }
                e.stopPropagation();
              }}
            >
              <LikingBooth boothId={booth.id} />
            </div>
          </Card>
        ))
      )}

      <SignInModal isOpen={showLoginModal} setIsOpen={setShowLoginModal} />
    </div>
  );
}
