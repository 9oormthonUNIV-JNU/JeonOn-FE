import { useState, useEffect } from "react";
import { boothDetail, boothComments } from "@/api/booth";
import { getProfile } from "@/api/user";
import { isLoggedIn } from "@/api/login";

// Booth 데이터 타입
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

// 커스텀 훅
export function useBoothDetail(boothId: string | null) {
  const [boothData, setBoothData] = useState<BoothDetailData | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(0); // 댓글 개수 상태

  useEffect(() => {
    if (boothId) {
      const fetchBoothDetail = async () => {
        try {
          const result = await boothDetail(Number(boothId));
          if (result && result.data) {
            setBoothData(result.data);
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

    if (isLoggedIn()) {
      fetchProfile();
    }
  }, [boothId, commentsUpdated]);

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

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    fetchProfile();
  };

  return {
    boothData,
    nickname,
    showLoginModal,
    setShowLoginModal,
    commentsUpdated,
    setCommentsUpdated,
    handleOpenLoginModal,
    handleLoginSuccess,
    commentCount,
  };
}
