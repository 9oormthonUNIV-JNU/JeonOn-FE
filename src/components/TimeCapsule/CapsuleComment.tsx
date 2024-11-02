import { useState } from "react";
import { checkAdminToken } from "@/utils/tokenHandler";
import { deleteMyCapsule } from "@/api/timecapsule";
import { deleteTimeCapsules } from "@/api/admin";
import DeleteModal from "../common/Modal/DeleteModal";
import trashCan from "@/../public/svgs/delete.svg";
import { formatDateToMMDDhhmm } from "@/utils/dateStr";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                      className="w-14 h-14 rounded-[15px] bg-[#d9d9d9] overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
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
                    className="w-14 h-[58px] rounded-[15px] overflow-hidden bg-[#d9d9d9] cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
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

            {/* 관리자일 경우에만 TrashCan (삭제 버튼) 표시 */}
            {checkAdminToken() && (
              <img
                src={trashCan}
                alt="Delete"
                className="w-3 h-3 absolute top-2 right-3 cursor-pointer"
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
        queryKey={"time-capsule"}
        deleteFn={deleteFn} // 동적으로 설정된 삭제 함수
      />

      {/* 이미지 확대 Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="w-full max-w-72">
          <DialogClose asChild>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 cursor-pointe"
            />
          </DialogClose>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CapsuleComment;
