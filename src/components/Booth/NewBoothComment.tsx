import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { addBoothComment } from "@/api/booth";
import cancel from "@/../public/assets/svgs/cancel-white.svg";
import send from "@/../public/assets/svgs/send.svg";
import { Input } from "@/components/ui/input";

interface NewBoothCommentProps {
  nickname: string | null;
  onClick?: () => void;
  onCommentSubmit?: () => void;
}

export default function NewBoothComment({
  nickname,
  onClick,
  onCommentSubmit,
}: NewBoothCommentProps){
  const [content, setContent] = useState<string>(""); // 댓글 내용 상태
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!content) {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (!id) {
      console.error("부스 ID를 찾을 수 없습니다.");
      return;
    }
    try {
      const response = await addBoothComment(Number(id), content); // 댓글 추가 요청
      if (response.data.success) {
        setContent(""); // 댓글 작성 후 입력란 초기화
        if (onCommentSubmit) onCommentSubmit();
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mt-20 w-full flex flex-col items-center space-y-2">
      {/* 댓글 경고 문구 */}
      <div className="flex items-center text-white text-[1vh] font-black font-['NanumSquare Neo'] whitespace-nowrap mb-2">
        <img src={cancel} alt="cancel" className="mr-1 mb-0.5" />
        <p>비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.</p>
      </div>

      {/* 댓글 작성란 */}
      <div
        onClick={onClick}
        className="relative w-full max-w-[500px] h-auto bg-white rounded-[15px] pl-4 pr-16 py-2 flex flex-col justify-center items-start gap-1"
      >
        <div className="w-full text-black text-[10px] font-normal font-['Pretendard']">
          {nickname ? nickname : "Guest"}
        </div>

        {/* 댓글 입력란 (Input 컴포넌트 사용) */}
        <Input
          className="h-6 w-full text-black text-[10px] font-normal font-['NanumSquare Neo'] focus-visible:ring-0 focus-visible:border-transparent border-transparent"
          placeholder="댓글을 입력하세요."
          value={content} // 상태에 입력된 댓글 내용
          onChange={(e) => setContent(e.target.value)} // 댓글 내용 상태 업데이트
        />

        {/* 전송 아이콘 */}
        <img
          src={send}
          alt="send"
          onClick={handleSubmit}
          className="absolute right-1 top-1/3 transform -translate-y-1/2 w-10 h-10"
        />
      </div>
    </div>
  );
};
