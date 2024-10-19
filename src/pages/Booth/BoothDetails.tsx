import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { boothDetail } from "@/api/booth"; // boothDetail API 함수 가져오기

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
  const [boothData, setBoothData] = useState<BoothDetailData | null>(null); // 부스 데이터 상태

  // 부스 상세 데이터를 API로부터 요청
  useEffect(() => {
    if (boothId) {
      const fetchBoothDetail = async () => {
        try {
          const result = await boothDetail(Number(boothId)); // boothId로 데이터 요청
          if (result.data) {
            setBoothData(result.data); // 데이터 상태에 저장
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

  // 부스 데이터를 렌더링
  return (
    <div className="w-[390px] h-[1146px] relative bg-black">
      {/* 부스 이미지 영역 */}
      <div className="w-[305px] h-[303px] left-[42px] top-[122px] absolute bg-white rounded-[20px] border-2 border-white">
        {boothData.images && boothData.images.length > 0 ? (
          <img
            src={boothData.images[0]}
            alt="Booth"
            className="w-full h-full rounded-[20px]"
          />
        ) : (
          <img
            src="https://via.placeholder.com/305x303"
            alt="booth"
            className="w-full h-full rounded-[20px]"
          />
        )}
      </div>

      {/* 부스 이름 */}
      <div className="left-[162px] top-[40px] absolute text-[#56fb56] text-[35px] font-normal font-['Cafe24 ClassicType']">
        부스
      </div>

      {/* 부스 번호 */}
      <div className="w-5 h-[17.68px] left-[292px] top-[476px] absolute">
        <div className="left-[7px] top-[-2px] absolute text-black text-[10px] font-normal font-['Pretendard']">
          {boothData.index}
        </div>
      </div>

      {/* 부스 위치 */}
      <div className="left-[68px] top-[508px] absolute text-white text-[10px] font-normal font-['NanumSquare Neo']">
        {boothData.location}
      </div>

      {/* 부스 일정 */}
      <div className="left-[68px] top-[531px] absolute text-white text-[10px] font-normal font-['NanumSquare Neo']">
        {boothData.start_date} ~ {boothData.end_date}, {boothData.start_time} ~{" "}
        {boothData.end_time}
      </div>

      {/* 부스 설명 */}
      <div className="w-[317px] h-[56.28px] left-[47px] top-[546px] absolute text-white text-xs font-normal font-['Pretendard']">
        {boothData.description}
      </div>

      {/* 부스 북마크 상태 */}
      <div className="w-[73.94px] h-[127.87px] left-[302px] top-[1021px] absolute rounded-[5px] border border-[#9747ff]">
        <div className="w-6 h-6 left-[36.63px] top-[73.93px] absolute origin-top-left rotate-[43.85deg]">
          <img
            className="w-[15.18px] h-[15.18px] left-[-5.79px] top-[2.79px] absolute"
            src="https://via.placeholder.com/15x15"
            alt="Icon"
          />
        </div>
      </div>

      {/* 부스 좋아요 상태 */}
      <div className="left-[300px] top-[27px] absolute">
        {boothData.like ? (
          <div className="text-white">Liked</div>
        ) : (
          <div className="text-white">Not Liked</div>
        )}
      </div>

      {/* 북마크 상태 */}
      <div className="left-[42px] top-[441px] absolute">
        {boothData.bookmark ? (
          <div className="text-[#00ff00] text-3xl">북마크됨</div>
        ) : (
          <div className="text-[#00ff00] text-3xl">북마크되지 않음</div>
        )}
      </div>

      {/* 음식 아이콘 */}
      <div className="w-[61px] h-[21px] p-2.5 left-[42px] top-[441px] absolute bg-[#00ff00] rounded-[999px] justify-center items-center gap-2.5 inline-flex">
        <div className="w-[109px] h-[41px] text-center text-black text-[10px] font-normal font-['goorm Sans'] leading-[10px]">
          음식
        </div>
      </div>

      {/* 댓글 입력 박스 */}
      <div className="pl-4 pr-[89.46px] pt-[5px] pb-[6.43px] left-[32px] top-[1082px] absolute bg-white rounded-[15px] flex-col justify-center items-start gap-[5.78px] inline-flex">
        <div className="w-[57px] h-[11.22px] text-black text-[10px] font-normal font-['Pretendard']">
          닉네임
        </div>
        <div className="w-[219.54px] h-[15.57px] text-black text-[10px] font-normal font-['NanumSquare Neo']">
          댓글을 입력하세요.
        </div>
      </div>

      {/* 공지 문구 */}
      <div className="w-[220px] h-[13px] pr-4 left-[45px] top-[1065px] absolute justify-start items-center gap-1 inline-flex">
        <div className="w-[13px] h-[13px] relative flex-col justify-start items-start flex">
          <div className="w-[9.75px] h-[9.75px] rounded-full border-2 border-white" />
        </div>
        <div className="text-white text-[7px] font-normal font-['Pretendard']">
          비방, 욕설 등 부적절한 댓글은 작성이 제한되며, 삭제 될 수 있습니다.
        </div>
      </div>
    </div>
  );
}
