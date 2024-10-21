import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { boothDetail } from "@/api/booth"; // boothDetail API 함수 가져오기

import time from "@/../public/assets/svgs/time_white.svg";
import location from "@/../public/assets/svgs/location_white.svg";
import BoothComments from "@/components/Booth/BoothComments";
import NewBoothComment from "@/components/Booth/NewBoothComment";

interface BoothDetailData {
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
  bookmark: boolean;
  description: string;
  images: string[];
}

export default function BoothDetail() {
  const [searchParams] = useSearchParams();
  const boothId = searchParams.get("boothId"); // 쿼리 파라미터에서 boothId 추출
  const categories = searchParams.get("categories"); // 전달받은 카테고리 추출
  const [boothData, setBoothData] = useState<BoothDetailData | null>(null); // 부스 데이터 상태

  // 부스 상세 데이터를 API로부터 요청
  useEffect(() => {
    if (boothId) {
      const fetchBoothDetail = async () => {
        try {
          const result = await boothDetail(Number(boothId)); // boothId로 데이터 요청
          if (result.data && result.data.data) {
            setBoothData(result.data.data); // 데이터 상태에 저장
          }
        } catch (error) {
          console.error("Error fetching booth details:", error);
        }
      };
      fetchBoothDetail();
    }
  }, [boothId]);

  // 부스 데이터가 없는 경우 로딩 처리
  if (!boothData) {
    return <div className="text-white">Loading...</div>;
  }

  // 부스 데이터를 렌더링 (이미지 아래에 정보 일렬로 나열)
  return (
    <div className="h-screen flex flex-col items-center bg-black p-5">
      <h1 className="mb-4 text-main text-4xl font-cafe24">부스</h1>
      <div className="flex flex-col items-start w-full max-w-[305px]">
        {/* 부스 이미지 */}
        <div className="w-full max-w-[305px] h-[303px] mb-3 bg-white rounded-[20px] border-2 border-white">
          {boothData.images && boothData.images.length > 0 ? (
            <img
              src={boothData.images[0]}
              alt="Booth"
              className="w-full h-auto object-contain"
            />
          ) : (
            <img
              src="https://via.placeholder.com/305x303"
              alt="booth"
              className="w-full h-auto object-contain"
            />
          )}
        </div>

        {/* 카테고리 정보 있을 때만 렌더링 */}
        {categories && (
          <div className="flex items-center justify-center w-[80px] h-[25px] mb-3 bg-[#00ff00] rounded-full">
            <span className="text-black text-xs font-normal">{categories}</span>
          </div>
        )}

        {/* 부스 정보 */}
        <div className="text-white w-full space-y-1">
          {/* 부스 이름 */}
          <h1 className="text-3xl text-main font-cafe24">{boothData.name}</h1>

          {/* 부스 위치 */}
          <div className="flex items-center space-x-2">
            <img src={location} alt="Location" className="w-4 h-4" />
            <span>{boothData.location}</span>
          </div>

          {/* 운영 일시 */}
          <div className="flex items-center space-x-2">
            <img src={time} alt="Time" className="w-4 h-4" />
            <span>
              {boothData.start_date} ~ {boothData.end_date}{" "}
              {boothData.start_time} ~ {boothData.end_time}
            </span>
          </div>

          {/* 부스 설명 */}
          <div>{boothData.description}</div>
        </div>

        {/* 좋아요 및 북마크 상태
        <p>좋아요 수: {boothData.like_count}</p>
        <p>좋아요 상태: {boothData.like ? "Liked" : "Not Liked"}</p>
        <p>
          북마크 상태: {boothData.bookmark ? "북마크됨" : "북마크되지 않음"}
        </p> */}

        {/* 댓글 분리선 */}
        <div className="w-full my-4">
          {/* 구분선 */}
          <div className="relative w-full flex items-center">
            {/* 왼쪽 원형 */}
            <div className="w-4 h-4 bg-white rounded-full"></div>

            {/* 가로선 */}
            <div className="flex-grow h-[2px] bg-white"></div>

            {/* 오른쪽 원형 */}
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>

          {/* 댓글 텍스트 */}
          <div className="mt-2 text-left">
            <span className="text-white text-[15px] font-normal font-['Pretendard']">
              댓글
            </span>
          </div>
        </div>
      </div>

      {/* 작성된 댓글들 */}
      <BoothComments />

      {/* 새로운 댓글 작성 */}
      <NewBoothComment />
    </div>
  );
}
