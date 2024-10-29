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
import divideLine from '@/../public/images/divideLine.png';
import GuideCarousel from '@/components/guide/GuideCarousel';

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

  return (
    <div className="flex flex-col items-center bg-black p-3 overflow-hidden">
      <h1 className="mb-10 text-main text-4xl font-cafe24">부스</h1>
      <div className="flex flex-col items-start w-full max-w-[90%]">
        {/* 부스 이미지 슬라이드 */}
        <GuideCarousel images={boothData?.images} />

        {/* 카테고리 정보 있을 때만 렌더링 */}
        {mappedCategory && (
          <div className="flex items-center justify-center w-[80px] h-[30px] mb-1 bg-[#00ff00] rounded-full">
            <span className="text-black text-sm">{mappedCategory}</span>
          </div>
        )}

        <div className="text-white w-full space-y-1">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {/* 부스 이름 */}
              <div className="font-cafe24 text-3xl text-main">
                {boothData.name}
              </div>

              {/* 북마크 */}
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
              {/* 좋아요 */}
              <LikingBooth boothId={Number(id)} />

              {/* 댓글 개수 */}
              <div className="relative w-6 h-6">
                <img src={comment} className="w-full h-full" alt="comment" />
                <span className="absolute top-[1px] right-2 transform text-black text-xs rounded-full z-20">
                  {commentCount}
                </span>
              </div>
            </div>
          </div>

          {/* 부스 위치 */}
          <div className="flex items-center space-x-2">
            <img src={location} alt="Location" className="w-4 h-4" />
            <span>{boothData.location}</span>
          </div>

          {/* 운영 일시 */}
          <div className="flex items-center space-x-2">
            <img src={time} alt="Time" className="w-4 h-4" />
            <span>
              {boothData.start_date} ~ {boothData.end_date}{" "}
              {boothData.start_time} ~ {boothData.end_time}
            </span>
          </div>

          {/* 부스 설명 */}
          <div>{boothData.description}</div>
        </div>

        {/* 댓글 분리선 */}
        <div className="mt-2 mb-4">
          <img src={divideLine} alt="divide-line" />
        </div>

      {/* 작성된 댓글들 */}
      <BoothComments nickname={nickname} commentsUpdated={commentsUpdated} />

      {/* 로그인 여부에 따라 댓글 작성란 처리 */}
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
