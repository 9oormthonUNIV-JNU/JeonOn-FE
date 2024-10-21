import * as React from "react";
import cancel from "@/../public/assets/svgs/cancel-white.svg";
import send from "@/../public/assets/svgs/send.svg";
import { Input } from "@/components/ui/input"; // shadcn/ui의 Input 컴포넌트 사용

const NewBoothComment: React.FC = () => {
  return (
    <div className="mt-20 w-full flex flex-col items-center space-y-2">
      {/* 댓글 경고 문구 */}
      <div className="flex items-center text-white text-[1vh] font-black font-['NanumSquare Neo'] whitespace-nowrap mb-2">
        <img src={cancel} alt="cancel" className="mr-1 mb-0.5" />
        <p>비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.</p>
      </div>

      {/* 댓글 작성란 */}
      <div className="relative w-full max-w-[500px] h-auto bg-white rounded-[15px] pl-4 pr-16 py-2 flex flex-col justify-center items-start gap-1">
        {/* 닉네임 --> 사용자 api 받아오는 방법으로...*/}
        <div className="w-full text-black text-[10px] font-normal font-['Pretendard']">
          닉네임
        </div>

        {/* 댓글 입력란 (Input 컴포넌트 사용) */}
        <Input
          className="h-6 w-full text-black text-[10px] font-normal font-['NanumSquare Neo'] focus-visible:ring-0 focus-visible:border-transparent border-transparent"
          placeholder="댓글을 입력하세요."
        />

        {/* 전송 아이콘 */}
        <img
          src={send}
          alt="send"
          className="absolute right-1 top-1/3 transform -translate-y-1/2 w-10 h-10"
        />
      </div>
    </div>
  );
};

export default NewBoothComment;
