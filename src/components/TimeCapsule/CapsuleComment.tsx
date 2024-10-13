import * as React from "react";

interface CapsuleCommentProps {
  detail: string;
  nickname: string;
  date: string;
  images?: string[];
  onDelete?: () => void;
  isPublic: boolean;
}

const CapsuleComment: React.FC<CapsuleCommentProps> = ({
  detail,
  nickname,
  date,
  images = [],
  onDelete,
}) => {
  console.log("nickname : ", nickname);
  return (
    <div className="relative rounded-[20px] border border-[#00ff00] p-4 flex flex-col space-y-2">
      {/* 닉네임 */}
      <div className="text-[#00ff00] text-xs font-normal font-['neurimbo Gothic']">
        {nickname}
      </div>

      {/* 내용 */}
      <div className="text-[#00ff00] text-xs font-normal font-['NanumSquare Neo'] break-words">
        {detail}
      </div>

      {/* 이미지 있을 경우에만 표시 */}
      {images.length > 0 && (
        <div className="flex space-x-4">
          {images.slice(0, 3).map(
            (image, index) =>
              image && (
                <div
                  key={index}
                  className="w-14 h-[58px] rounded-[15px] overflow-hidden bg-[#d9d9d9]"
                >
                  <img
                    src={image}
                    alt={`img${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
          )}
        </div>
      )}

      {/* 날짜 */}
      <div className="text-[#dbdbdb] text-[10px] font-normal font-['neurimbo Gothic'] self-end">
        {date}
      </div>

      {/* 삭제 버튼: 관리자 모드일 때 활성화
      {onDelete && (
        <button
          className="text-red-500 bg-white p-1 rounded-md border border-red-500 hover:bg-red-100"
          onClick={onDelete}
        >
          삭제
        </button>
      )} */}
    </div>
  );
};

export default CapsuleComment;
