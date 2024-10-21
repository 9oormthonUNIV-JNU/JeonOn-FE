import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { boothComments } from "@/api/booth"; // boothComments 함수 가져오기

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

const BoothComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams(); // searchParams 사용
  const boothId = searchParams.get("boothId"); // boothId 추출

  // 댓글 목록을 불러오는 함수
  const fetchComments = async () => {
    if (boothId) {
      try {
        const result = await boothComments(Number(boothId)); // boothId로 API 호출
        if (result.data && result.data.comments) {
          setComments(result.data.comments); // 불러온 댓글 데이터를 상태에 저장
        }
      } catch (error) {
        console.error("댓글을 불러오는 중 에러가 발생했습니다:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchComments();
  }, [boothId]); // boothId가 변경될 때마다 다시 호출, 새로운 댓글이 작성되면 다시 호출

  if (loading) {
    return <div className="text-white">댓글을 불러오는 중...</div>;
  }

  if (!comments.length) {
    return <div className="text-white">댓글이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="w-[339px] h-[50px] relative rounded-[15px] border border-white"
        >
          {/* 닉네임 */}
          <div className="w-[37px] h-3.5 absolute left-[21px] top-[7px] text-[#e9e9e9]/90 text-[10px] font-normal font-['Pretendard']">
            {comment.nickname}
          </div>

          {/* 댓글 시간 */}
          <div className="w-[42px] h-2.5 absolute left-[278px] top-[34px] text-[#e8e8e8]/90 text-[8px] font-normal font-['Pretendard']">
            {formatDate(comment.created_at)}
          </div>

          {/* 댓글 내용 */}
          <div className="w-[229px] h-[17.69px] absolute left-[21px] top-[21.15px] text-white text-xs font-normal font-['Noto Sans KR']">
            {comment.content}
          </div>

          {/* 추가적인 아이콘 등을 위한 빈 공간 (필요 시 추가) */}
          <div className="w-[8.39px] h-[8.83px] absolute left-[320px] top-[7px]"></div>
        </div>
      ))}
    </div>
  );
};

export default BoothComments;
