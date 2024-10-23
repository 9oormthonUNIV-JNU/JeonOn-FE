import React, { useEffect, useState } from "react";
import { getProfile } from "@/api/user";
import { isLoggedIn } from "@/api/login";
import { useSearchParams } from "react-router-dom";
import { boothDetail, boothComments } from "@/api/booth"; // boothDetail API 함수 가져오기
import SignInModal from "@/components/common/Modal/SignInModal";
import time from "@/../public/assets/svgs/time_white.svg";
import location from "@/../public/assets/svgs/location_white.svg";
import comment from "@/../public/assets/svgs/comment.svg";
import BoothComments from "@/components/Booth/BoothComments";
import NewBoothComment from "@/components/Booth/NewBoothComment";
import BoothCarousel from "@/components/Booth/BoothCarousel";
import LikingBooth from "@/components/Booth/LikingBooth";

interface UserProfile {
  nickname: string;
}

interface BoothDetailData {
  id: number;
  name: string;
  location: string;
  index: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  like: boolean;
  like_count: number;
  bookmark: boolean;
  description: string;
  images: string[];
}

export default function BoothDetail() {
  const [searchParams] = useSearchParams();
  const boothId = searchParams.get("boothId");
  const categories = searchParams.get("categories");
  const [boothData, setBoothData] = useState<BoothDetailData | null>(null); // 부스 데이터 상태
  const [nickname, setNickname] = useState<string | null>(null); // 사용자 닉네임 상태
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 상태
  const [commentsUpdated, setCommentsUpdated] = useState(false); // 코멘트 추가 상태
  const [commentCount, setCommentCount] = useState<number>(0); // 댓글 개수 상태

  // 부스 상세 데이터를 API로부터 요청
  useEffect(() => {
    if (boothId) {
      const fetchBoothDetail = async () => {
        try {
          const result = await boothDetail(Number(boothId)); // boothId로 데이터 요청
          if (result && result.data) {
            setBoothData(result.data); // 데이터 상태에 저장
          }

          const boothCommentResponse = await boothComments(Number(boothId)); // 부스 댓글 데이터 요청
          if (boothCommentResponse && boothCommentResponse.data) {
            setCommentCount(boothCommentResponse.data.comment_count); // 댓글 개수를 상태로 저장
          }
        } catch (error) {
          console.error("Error fetching booth details:", error);
        }
      };
      fetchBoothDetail();
    }

    // 로그인 여부 체크 및 프로필 정보 가져오기
    const token = isLoggedIn(); // 로그인 여부 확인
    if (token) {
      fetchProfile();
    }
  }, [boothId, commentsUpdated]);

  // 사용자 프로필을 가져오는 함수
  const fetchProfile = async () => {
    try {
      const userData = await getProfile();
      if (userData && userData.nickname) {
        setNickname(userData.nickname);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // 모달 열기 함수
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    fetchProfile();
  };

  // 부스 데이터가 없는 경우 로딩 처리
  if (!boothData) {
    return <div className="text-white">Loading...</div>;
  }

  // 부스 데이터를 렌더링 (이미지 아래에 정보 일렬로 나열)
  return (
    <div className="min-h-screen flex flex-col items-center bg-black p-5">
      <h1 className="mb-4 text-main text-4xl font-cafe24">부스</h1>
      <div className="flex flex-col items-start w-full max-w-[305px]">
        {/* 부스 이미지 슬라이드 */}
        <div className="w-full max-w-[305px] h-[303px] mb-3 bg-white rounded-[20px] border-2 border-white">
          {boothData.images && boothData.images.length > 0 ? (
            <BoothCarousel
              images={boothData.images} // 부스 이미지 배열만 전달
              handleIndex={(index) =>
                console.log("Current image index:", index)
              }
            />
          ) : (
            <img
              src="https://via.placeholder.com/305x303"
              alt="booth"
              className="w-full h-auto object-contain"
            />
          )}
        </div>

        {/* 카테고리 정보 있을 때만 렌더링 */}
        {categories && (
          <div className="flex items-center justify-center w-[80px] h-[25px] mb-3 bg-[#00ff00] rounded-full">
            <span className="text-black text-xs font-normal">{categories}</span>
          </div>
        )}

        {/* 부스 정보 */}
        <div className="text-white w-full space-y-1">
          <div className="flex items-center justify-between w-full">
            {/* 부스 이름 */}
            <h1 className="text-3xl text-main font-cafe24">{boothData.name}</h1>

            <div className="flex items-center space-x-2 mr-1">
              {/* 좋아요 버튼 */}
              <LikingBooth boothId={Number(boothId)} />
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
        <div className="w-full my-4">
          <div className="relative w-full flex items-center">
            {/* 왼쪽 원형 */}
            <div className="w-4 h-4 bg-white rounded-full"></div>
            {/* 가로선 */}
            <div className="flex-grow h-[2px] bg-white"></div>
            {/* 오른쪽 원형 */}
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          {/* 댓글 텍스트 */}
          <div className="mt-2 text-left">
            <span className="text-white text-[15px] font-normal font-['Pretendard']">
              댓글
            </span>
          </div>
        </div>
      </div>
      {/* 작성된 댓글들 */}
      <BoothComments nickname={nickname} commentsUpdated={commentsUpdated} />

      {/* 로그인 여부에 따라 댓글 작성란 처리 */}
      {isLoggedIn() ? (
        <NewBoothComment
          nickname={nickname}
          onCommentSubmit={() => {
            setCommentsUpdated(!commentsUpdated);
          }}
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
  );
}
