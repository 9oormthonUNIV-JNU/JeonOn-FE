import { useState } from "react";
import { checkAdminToken } from "@/utils/tokenHandler";
import { deleteMyCapsule } from "@/api/timecapsule";
import { deleteTimeCapsules } from "@/api/admin";
import DeleteModal from "../common/Modal/DeleteModal";
import trashCan from "@/../public/svgs/delete.svg";
import { formatDateToMMDDhhmm } from "@/utils/dateStr";
import ZoomableImage from "../common/ZoomableImage";

interface Capsule {
  id: number;
  nickname: string;
  content: string;
  images: string[];
  created_at: string;
}

interface CapsuleCommentProps {
  publicCapsules: Capsule[];
  myCapsules: Capsule[];
  fetchCapsules: () => void;
}

const CapsuleComment: React.FC<CapsuleCommentProps> = ({
  publicCapsules,
  myCapsules,
  fetchCapsules,
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<number | null>(
    null
  );
  const [deleteFn, setDeleteFn] = useState<() => void>(() => {});

  const handleDeleteClick = (capsuleId: number, deleteFunction: () => void) => {
    setSelectedCapsuleId(capsuleId);
    setDeleteFn(() => async () => {
      await deleteFunction();
      fetchCapsules(); // 삭제 후 리패치
    });
    setDeleteModalOpen(true);
  };

  return (
    <div className="w-[95%]">
      {/* My Capsules */}
      {myCapsules.length > 0 && (
        <div className="mt-4">
          {myCapsules.map((capsule) => (
            <div
              key={capsule.id}
              className="mb-4 relative rounded-[20px] border border-[#00ff00] p-4 flex flex-col space-y-2"
            >
              {/* 닉네임 */}
              <div className="text-[#00ff00] text-xs font-normal font-['neurimbo Gothic']">
                {capsule.nickname}
              </div>

              {/* 내용 */}
              <div className="text-[#00ff00] text-xs font-normal font-['NanumSquare Neo'] break-words">
                {capsule.content}
              </div>

              {/* 이미지 있을 경우에만 표시 */}
              {capsule.images.length > 0 && (
                <div className="flex space-x-4">
                  {capsule.images.map((image, index) => (
                    <div
                    key={index}
                    className="w-14 h-14 rounded-[15px] bg-[#d9d9d9] overflow-hidden"
                  >
                    <ZoomableImage
                      src={image}
                      alt={`img${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  ))}
                </div>
              )}

              {/* 날짜 */}
              <div className="text-[#dbdbdb] text-[10px] font-normal font-['neurimbo Gothic'] self-end">
                {formatDateToMMDDhhmm(capsule.created_at)}
              </div>

              {/* TrashCan (삭제 버튼) */}
              <img
                src={trashCan}
                alt="Delete"
                className="w-3 h-3 absolute top-2 right-3 cursor-pointer"
                onClick={() =>
                  handleDeleteClick(capsule.id, () =>
                    deleteMyCapsule(capsule.id)
                  )
                }
              />
            </div>
          ))}
        </div>
      )}

      {/* Public Capsules */}
      <div className="mt-4">
        {publicCapsules.map((capsule) => (
          <div
            key={capsule.id}
            className="relative rounded-[20px] border border-[#00ff00] p-4 flex flex-col space-y-2"
          >
            {/* 닉네임 */}
            <div className="text-[#00ff00] text-xs font-normal font-['neurimbo Gothic']">
              {capsule.nickname}
            </div>

            {/* 내용 */}
            <div className="text-[#00ff00] text-xs font-normal font-['NanumSquare Neo'] break-words">
              {capsule.content}
            </div>

            {/* 이미지 있을 경우에만 표시 */}
            {capsule.images.length > 0 && (
              <div className="flex space-x-4">
                {capsule.images.map((image, index) => (
                  <div
                  key={index}
                  className="w-14 h-[58px] rounded-[15px] overflow-hidden bg-[#d9d9d9]"
                >
                  <ZoomableImage
                    src={image}
                    alt={`img${index + 1}`}
                    className="w-full h-full object-cover" // 기존 스타일을 유지
                  />
                </div>
                ))}
              </div>
            )}

            {/* 날짜 */}
            <div className="text-[#dbdbdb] text-[10px] font-normal font-['neurimbo Gothic'] self-end">
              {formatDateToMMDDhhmm(capsule.created_at)}
            </div>

            {/* 관리자일 경우에만 TrashCan (삭제 버튼) 표시 */}
            {checkAdminToken() && (
              <img
                src={trashCan}
                alt="Delete"
                className="w-6 h-6 absolute top-2 right-2 cursor-pointer"
                onClick={() =>
                  handleDeleteClick(capsule.id, () =>
                    deleteTimeCapsules(capsule.id)
                  )
                }
              />
            )}
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        id={selectedCapsuleId}
        setIsOpen={setDeleteModalOpen}
        queryKey={"timecapsules"}
        deleteFn={deleteFn} // 동적으로 설정된 삭제 함수
      />
    </div>
  );
};

export default CapsuleComment;
