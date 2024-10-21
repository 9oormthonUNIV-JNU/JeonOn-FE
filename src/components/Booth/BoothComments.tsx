import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import deleteIcon from "@/../public/assets/svgs/delete_white.svg";
import { boothComments, deleteComment } from "@/api/booth"; // boothComments 및 deleteComment 함수 가져오기

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

interface BoothCommentsProps {
  commentsUpdated: boolean; // 댓글이 갱신되었는지 여부
  nickname?: string | null;
}

const BoothComments: React.FC<BoothCommentsProps> = ({ commentsUpdated, nickname }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const boothId = searchParams.get("boothId");

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

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    if (boothId) {
      try {
        const response = await deleteComment(Number(boothId), commentId); // 삭제 요청
        if (response.data.success) {
          // 삭제 성공 시 상태 갱신
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          alert("댓글이 삭제되었습니다.");
        } else {
          alert("댓글 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다:", error);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchComments();
  }, [boothId, commentsUpdated]); // boothId나 commentsUpdated가 변경될 때마다 다시 호출

  if (loading) {
    return <div className="text-white">댓글을 불러오는 중...</div>;
  }

  if (!comments.length) {
    return <div className="text-white">댓글이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-[800px] px-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="relative w-full p-4 rounded-xl border border-white flex flex-col md:flex-row md:items-center"
        >
          {/* 닉네임 */}
          <div className="text-[#e9e9e9]/90 text-[12px] font-normal font-['Pretendard'] md:w-1/4 md:text-left">
            {comment.nickname}
          </div>

          {/* 댓글 내용 */}
          <div className="text-white text-xs font-normal font-['Noto Sans KR'] w-full md:w-2/4 md:text-left mt-2 md:mt-0">
            {comment.content}
          </div>

          {/* 댓글 시간 */}
          <div className="absolute right-2 bottom-1 text-[#e8e8e8]/90 text-[1vh] font-normal font-['Pretendard'] md:w-1/4 md:text-right mt-2 md:mt-0">
            {formatDate(comment.created_at)}
          </div>

          {/* 삭제 버튼: 현재 로그인된 사용자와 댓글 작성자의 닉네임이 같을 때만 렌더링 */}
          {comment.nickname === nickname && (
            <div className="absolute right-2 top-1 text-[#e8e8e8]/90 text-[1vh] font-normal font-['Pretendard'] md:w-1/4 md:text-right mt-2 md:mt-0">
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => handleDeleteComment(comment.id)} // 삭제 버튼 클릭 시 삭제 함수 호출
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BoothComments;
