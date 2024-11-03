import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import deleteIcon from "@/../public/assets/svgs/delete_white.svg";
import { boothComments, deleteComment } from "@/api/booth";
import { deleteBoothComment } from "@/api/admin";
import { formatDateToMMDDhhmm } from "@/utils/dateStr";
import { checkAdminToken } from "@/utils/tokenHandler";
import DeleteModal from "../common/Modal/DeleteModal";

interface Comment {
  id: number;
  nickname: string;
  content: string;
  created_at: string;
}

interface BoothCommentsProps {
  commentsUpdated: boolean;
  nickname?: string | null;
}

export default function BoothComments({
  commentsUpdated,
  nickname,
}: BoothCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const isAdmin = checkAdminToken() !== null;

  const fetchComments = async () => {
    if (id) {
      try {
        const result = await boothComments(Number(id));
        if (result.data && result.data.comments) {
          setComments(result.data.comments);
        }
      } catch (error) {
        console.error("댓글을 불러오는 중 에러가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteComment = async () => {
    if (id && selectedCommentId) {
      try {
        const response = isAdmin
          ? await deleteBoothComment(Number(id), selectedCommentId)
          : await deleteComment(Number(id), selectedCommentId);

        if (response.data.success) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== selectedCommentId)
          );
          setIsDeleteModalOpen(false);
        }
      } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다:", error);
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleDeleteClick = (commentId: number) => {
    setSelectedCommentId(commentId);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchComments();
  }, [id, commentsUpdated]);

  if (loading) {
    return <div className="text-white">댓글을 불러오는 중...</div>;
  }

  if (!comments.length) {
    return <div className="text-white">댓글이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-[800px] h-auto font-pretendard">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="relative w-full p-4 rounded-[15px] border border-2 border-white flex flex-col md:flex-row md:items-center"
        >
          {/* 닉네임 */}
          <div className="text-[#e9e9e9]/90 text-sm font-normal md:w-1/4 md:text-left">
            {comment.nickname}
          </div>
          {/* 댓글 내용 */}
          <div className="text-white text-sm font-normal font-['Noto Sans KR'] w-full md:w-2/4 md:text-left mt-2 md:mt-0">
            {comment.content}
          </div>
          {/* 댓글 시간 */}
          <div className="absolute right-2 bottom-1 text-[#e8e8e8]/90 text-xs font-['neurimbo Gothic'] md:w-1/4 md:text-right mt-2 md:mt-0">
            {formatDateToMMDDhhmm(comment.created_at)}
          </div>
          {/* 삭제 버튼 */}
          {(comment.nickname === nickname || isAdmin) && (
            <div className="absolute right-2 top-1 md:w-1/4 md:text-right mt-2 md:mt-0">
              <img
                src={deleteIcon}
                alt="delete"
                onClick={() => handleDeleteClick(comment.id)}
                className="cursor-pointer w-4 h-4"
              />
            </div>
          )}
        </div>
      ))}

      {/* 삭제 확인 모달 */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        id={selectedCommentId}
        queryKey="boothDetail"
        deleteFn={handleDeleteComment}
      />
    </div>
  );
}
