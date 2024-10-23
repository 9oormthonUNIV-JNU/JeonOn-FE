import React, { useEffect, useState } from "react";
import { boothDetail, likeBooth, cancelLikeBooth } from "@/api/booth";
import like_empty from "@/../public/assets/svgs/like_empty.svg";
import like_filled from "@/../public/assets/svgs/like_filled.svg";

interface LikingBoothProps {
  boothId: number;
}

export default function LikingBooth({ boothId }: LikingBoothProps) {
  const [likeCount, setLikeCount] = useState<number>(0); // 좋아요 개수
  const [hasLiked, setHasLiked] = useState<boolean>(false); // 사용자가 좋아요를 눌렀는지 여부
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  // 부스 디테일을 가져오는 함수
  const fetchBoothDetail = async () => {
    try {
      const data = await boothDetail(boothId);
      setLikeCount(data.data.like_count); // 좋아요 개수를 설정
      setHasLiked(data.data.like); // "like": true | false 값으로 사용자의 좋아요 여부 설정
    } catch (error) {
      console.error("부스 정보를 불러오는 중 에러가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 좋아요 버튼을 누를 때의 핸들러 함수
  const handleLikeToggle = async () => { // 상위로의 이벤트 전파 막기
    if (hasLiked) {
      // 좋아요 취소 로직
      try {
        const result = await cancelLikeBooth(boothId);
        if (result) {
          setLikeCount(result.data.like_count); // 좋아요 개수 감소
          setHasLiked(false); // 좋아요 상태 업데이트
        }
      } catch (error) {
        console.error("좋아요 취소 중 오류가 발생했습니다:", error);
      }
    } else {
      // 좋아요 추가 로직
      try {
        const result = await likeBooth(boothId);
        if (result) {
          setLikeCount(result.data.like_count); // 좋아요 개수 증가
          setHasLiked(true); // 좋아요 상태 업데이트
        }
      } catch (error) {
        console.error("좋아요 추가 중 오류가 발생했습니다:", error);
      }
    }
  };

  // 컴포넌트가 마운트될 때 부스 정보를 가져옴
  useEffect(() => {
    fetchBoothDetail();
  }, [boothId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div 
    className="relative flex items-center"
    onClick={handleLikeToggle}
    >
      {/* 좋아요 버튼 */}
      <img
        src={hasLiked ? like_filled : like_empty}
        alt="like button"
        className="cursor-pointer h-7 w-7 z-10" // z-index 추가
      />
      {/* 좋아요 개수 */}
      <span className="absolute left-[10.3px] flex items-center justify-center text-black text-sm z-20">
        {likeCount}
      </span>
    </div>
  );
}