import { useState } from "react";
import { useParams } from "react-router-dom";
import { useBoothDetail } from "@/hook/useBoothDetail";
import useBookmark from "@/hook/useBookmark";
import SignInModal from "@/components/common/Modal/SignInModal";
import time from "@/../public/assets/svgs/time_white.svg";
import location from "@/../public/assets/svgs/location_white.svg";
import deleteIcon from "@/../public/assets/svgs/delete_white.svg";
import bookmark_empty from "@/../public/assets/svgs/bookmark_empty.svg";
import bookmark_filled from "@/../public/assets/svgs/bookmark_filled.svg";
import BoothComments from "@/components/Booth/BoothComments";
import NewBoothComment from "@/components/Booth/NewBoothComment";
import LikingBooth from "@/components/Booth/LikingBooth";
import { isLoggedIn } from "@/api/login";
import { deleteBooth } from "@/api/booth";
import { checkAdminToken } from "@/utils/tokenHandler";
import { boothBookmark, cancelBoothBookmark } from "@/api/booth";
import divideLine from "@/../public/images/divideLine.png";
import GuideCarousel from "@/components/guide/GuideCarousel";
import DeleteModal from "@/components/common/Modal/DeleteModal";

type BoothCategoryType = {
  type: string;
  category: string;
};

const boothCategory: BoothCategoryType[] = [
  { type: "음식", category: "food" },
  { type: "체험", category: "experience" },
  { type: "플리마켓", category: "flea-market" },
  { type: "홍보", category: "promotion" },
  { type: "기타", category: "etc" },
];

export default function BoothDetail() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();

  // 부스 정보, 상태 관리 (useBoothDetail 훅)
  const {
    boothData,
    nickname,
    showLoginModal,
    setShowLoginModal,
    commentsUpdated,
    setCommentsUpdated,
    handleOpenLoginModal,
    handleLoginSuccess,
    commentCount,
  } = useBoothDetail(id);

  // 북마크 상태 관리 (useBookmark 훅)
  const { like, toggleBookmark } = useBookmark({
    id: id,
    queryKey: "boothDetail",
    bookmarkFn: boothBookmark,
    bookmarkCancelFn: cancelBoothBookmark,
    initialBookmarkState: boothData?.bookmark ?? false,
  });

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleBoothDelete = async () => {
    try {
      if (id) {
        await deleteBooth(Number(id));
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("부스 삭제 중 오류가 발생했습니다:", error);
      alert("부스 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleBookmarkClick = () => {
    if (!isLoggedIn()) {
      setShowLoginModal(true);
    } else {
      toggleBookmark();
    }
  };

  const mappedCategory = boothData
    ? boothCategory.find((item) => item.category === boothData.category)?.type
    : null;

  if (!boothData) {
    return <div className="text-white">Loading...</div>;
  }

  const formatLocation = (locationStr: string, boothIndex: number) => {
    let locationText = "";
    if (locationStr === "square-518") {
      locationText = "5.18 광장";
    } else if (locationStr === "backgate-street") {
      locationText = "후문 거리";
    } else {
      locationText = "대운동장";
    }
    return `${locationText} ${boothIndex}번 부스`;
  };
  const formatTime = (timeStr: string) => {
    return timeStr.slice(0, 5);
  };

  const formatDateTime = (
    start_date: string,
    end_date: string,
    start_time: string,
    end_time: string
  ) => {
    const startDay = new Date(start_date).getDate();
    const endDay = new Date(end_date).getDate();
    const formattedStartTime = formatTime(start_time);
    const formattedEndTime = formatTime(end_time);
    if (startDay !== endDay) {
      return `${startDay}일, ${endDay}일, ${formattedStartTime} ~ ${formattedEndTime}`;
    }
    return `${startDay}일, ${formattedStartTime} ~ ${formattedEndTime}`;
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-black p-3 overflow-hidden">
      <h1 className="mb-10 text-main text-4xl font-cafe24">부스</h1>
      <div className="flex flex-col items-start w-full max-w-[90%]">
        {/* 부스 정보 및 내용 */}
        <div className="flex flex-col items-start max-w-[100%] h-auto">
          <GuideCarousel images={boothData?.images} />
        </div>

        {mappedCategory && (
          <div className="flex items-center justify-center w-[80px] h-[30px] mb-1 bg-[#00ff00] rounded-full">
            <span className="text-black text-sm">{mappedCategory}</span>
          </div>
        )}

        <div className="text-white w-full space-y-1">
          {/* 부스 이름, 북마크, 좋아요 */}
          <div className="flex items-center justify-between w-full">
            {/* 부스 이름과 북마크 */}
            <div className="flex items-center space-x-2">
              <div className="font-cafe24 text-3xl text-main mt-1">
                {boothData.name}
              </div>
              <div onClick={handleBookmarkClick} className="cursor-pointer">
                {like ? (
                  <img
                    src={bookmark_filled}
                    alt="favorites"
                    className="w-10 h-10"
                  />
                ) : (
                  <img
                    src={bookmark_empty}
                    alt="bookmark"
                    className="ml-1 w-8 h-8"
                  />
                )}
              </div>
            </div>

            <div
              className="flex items-center space-x-2 mr-1"
              onClick={() => {
                if (!isLoggedIn()) {
                  setShowLoginModal(true); // 로그인 모달 열기
                }
              }}
            >
              <LikingBooth boothId={Number(id)} />
            </div>
          </div>

          {/* 위치와 시간 */}
          <div className="flex items-center space-x-2">
            <img src={location} alt="Location" className="w-4 h-4" />
            <span>{formatLocation(boothData.location, boothData.index)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src={time} alt="Time" className="w-4 h-4" />
            <span>
              {formatDateTime(
                boothData.start_date,
                boothData.end_date,
                boothData.start_time,
                boothData.end_time
              )}
            </span>
          </div>

          <div>{boothData.description}</div>

          {checkAdminToken() ? (
            <div className="relative">
              <div className="absolute right-2 top-1 md:w-1/4 md:text-right">
                <img
                  src={deleteIcon}
                  alt="delete"
                  onClick={handleDeleteClick} // 삭제 버튼 클릭 시 삭제 함수 호출
                  className="cursor-pointer w-4 h-4"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* 댓글 분리선 */}
        <div className="mt-8 mb-4">
          <img src={divideLine} alt="divide-line" />
        </div>

        {/* 댓글 리스트 */}
        <BoothComments nickname={nickname} commentsUpdated={commentsUpdated} />

        {/* NewBoothComment 컴포넌트 */}
        <div className="mt-auto mb-10 w-full">
          {isLoggedIn() ? (
            <NewBoothComment
              nickname={nickname}
              onCommentSubmit={() => setCommentsUpdated(!commentsUpdated)}
            />
          ) : (
            <NewBoothComment nickname={null} onClick={handleOpenLoginModal} />
          )}
        </div>

        {/* 로그인 모달 */}
        {showLoginModal && (
          <SignInModal
            isOpen={showLoginModal}
            setIsOpen={setShowLoginModal}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* 삭제 확인 모달 */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          setIsOpen={setIsDeleteModalOpen}
          id={id}
          queryKey="booth"
          deleteFn={handleBoothDelete}
        />
      </div>
    </div>
  );
}
