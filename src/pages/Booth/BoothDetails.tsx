import { useSearchParams, useParams } from "react-router-dom";
import { useBoothDetail } from "@/hook/useBoothDetail";
import useBookmark from "@/hook/useBookmark";
import SignInModal from "@/components/common/Modal/SignInModal";
import time from "@/../public/assets/svgs/time_white.svg";
import location from "@/../public/assets/svgs/location_white.svg";
import comment from "@/../public/assets/svgs/comment.svg";
import bookmark_empty from "@/../public/assets/svgs/bookmark_empty.svg";
import bookmark_filled from "@/../public/assets/svgs/bookmark_filled.svg";
import BoothComments from "@/components/Booth/BoothComments";
import NewBoothComment from "@/components/Booth/NewBoothComment";
import LikingBooth from "@/components/Booth/LikingBooth";
import { isLoggedIn } from "@/api/login";
import { boothBookmark, cancelBoothBookmark } from "@/api/booth";
import divideLine from "@/../public/images/divideLine.png";
import GuideCarousel from "@/components/guide/GuideCarousel";

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
  const [searchParams] = useSearchParams();
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
    <div className="flex flex-col items-center bg-black p-3 overflow-hidden">
      <h1 className="mb-10 text-main text-4xl font-cafe24">부스</h1>
      <div className="flex flex-col items-start w-full max-w-[90%]">
        <GuideCarousel images={boothData?.images} />

        {mappedCategory && (
          <div className="flex items-center justify-center w-[80px] h-[30px] mb-1 bg-[#00ff00] rounded-full">
            <span className="text-black text-sm">{mappedCategory}</span>
          </div>
        )}

        <div className="text-white w-full space-y-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div className="font-cafe24 text-3xl text-main">
                {boothData.name}
              </div>

              <div onClick={toggleBookmark} className="cursor-pointer">
                {like ? (
                  <img
                    src={bookmark_filled}
                    alt="favorites"
                    className="w-9 h-9"
                  />
                ) : (
                  <img
                    src={bookmark_empty}
                    alt="bookmark"
                    className="w-9 h-9"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 mr-1">
              <LikingBooth boothId={Number(id)} />

              {/* 댓글 개수 
              <div className="relative w-6.5 h-6">
                <img src={comment} className="w-full h-full" alt="comment" />
                <span className="absolute top-[1px] right-2 transform text-black text-xs rounded-full z-20">
                  {commentCount}
                </span>
              </div> */}
            </div>
          </div>

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
        </div>

        {/* 댓글 분리선 */}
        <div className="mt-2 mb-4">
          <img src={divideLine} alt="divide-line" />
        </div>

        <BoothComments nickname={nickname} commentsUpdated={commentsUpdated} />

        {isLoggedIn() ? (
          <NewBoothComment
            nickname={nickname}
            onCommentSubmit={() => setCommentsUpdated(!commentsUpdated)}
          />
        ) : (
          <NewBoothComment nickname={null} onClick={handleOpenLoginModal} />
        )}

        {showLoginModal && (
          <SignInModal
            isOpen={showLoginModal}
            setIsOpen={setShowLoginModal}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </div>
  );
}
