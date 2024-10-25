import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { boothDetail, boothComments } from "@/api/booth";
import { getProfile } from "@/api/user";
import { isLoggedIn } from "@/api/login";
import { useParams } from "react-router-dom";

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

export function useBoothDetail(boothId: string | null) {
  const queryClient = useQueryClient();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  // Booth Detail 데이터 fetching
  const { data: boothData, isError: boothError } =
    useQuery<BoothDetailData | null>({
      queryKey: ["boothDetail", boothId],
      queryFn: async () => {
        if (!boothId) return null;
        const result = await boothDetail(Number(boothId));
        return result.data as BoothDetailData;
      },
      enabled: !!boothId,
      refetchOnWindowFocus: false,
    });

  // Booth 댓글 데이터 fetching
  const { data: commentData, isError: commentError } = useQuery({
    queryKey: ["boothComments", boothId, commentsUpdated],
    queryFn: async () => {
      if (!boothId) return null;
      const result = await boothComments(Number(boothId));
      return result.data;
    },
    enabled: !!boothId,
    refetchOnWindowFocus: false,
  });

  // 댓글 개수 추출
  const commentCount = commentData?.comment_count ?? 0;

  // 사용자 프로필 데이터 fetching
  const {
    data: profileData,
    isSuccess,
    isError: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!isLoggedIn()) throw new Error("User not logged in");
      const result = await getProfile();
      return result;
    },
    enabled: isLoggedIn() !== false, // 로그인 상태에서만 쿼리 실행
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  });

  // 로그인 모달 제어 함수
  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    try {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    } catch (error) {
      console.error("Error fetching profile after login:", error);
    }
  };

  // 쿼리 성공 시 nickname 설정
  useEffect(() => {
    if (isSuccess && profileData?.nickname) {
      setNickname(profileData.nickname);
    }
  }, [isSuccess, profileData]);

  // 에러 처리. 필요하다면 구체화
  useEffect(() => {
    if (boothError || commentError || profileError) {
      console.log(
        "useBoothDetail 커스텀 훅 내부에서 관리하는 로직에 오류가 발생했습니다."
      );
    }
  }, [boothError, commentError, profileError]);

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
