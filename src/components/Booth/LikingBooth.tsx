import { useEffect, useState } from "react";
import { boothDetail, likeBooth, cancelLikeBooth } from "@/api/booth";
import like_empty from "@/../public/assets/svgs/like_empty.svg";
import like_filled from "@/../public/assets/svgs/like_filled.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface LikingBoothProps {
  boothId: number;
}

export default function LikingBooth({ boothId }: LikingBoothProps) {
  const queryClient = useQueryClient();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  // 부스 디테일 가져오기
  const { data: boothData, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["boothDetail", boothId],
    queryFn: async () => {
      const data = await boothDetail(boothId);
      return data.data;
    },
    enabled: !!boothId,
  });

  // 쿼리 성공 시 likeCount와 hasLiked 상태를 설정
  useEffect(() => {
    if (isSuccess && boothData) {
      setLikeCount(boothData.like_count);
      setHasLiked(boothData.like);
    }
  }, [isSuccess, boothData]);

  // 에러 처리
  useEffect(() => {
    if (isError && error) {
      console.error("부스 정보를 불러오는 중 에러가 발생했습니다:", error);
    }
  }, [isError, error]);

  // 좋아요 추가/취소 처리
  const likeMutation = useMutation({
    mutationFn: (liked: boolean) => {
      return liked ? cancelLikeBooth(boothId) : likeBooth(boothId);
    },
    onMutate: async (liked: boolean) => {
      await queryClient.cancelQueries({ queryKey: ["boothDetail", boothId]});
      const previousData = queryClient.getQueryData<any>(["boothDetail", boothId]);
      queryClient.setQueryData(["boothDetail", boothId], (oldData: any) => {
        return {
          ...oldData,
          like_count: liked ? oldData.like_count - 1 : oldData.like_count + 1,
          like: !liked,
        };
      });
      return { previousData };
    },
    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["boothDetail", boothId], context.previousData);
      }
      console.error("좋아요 처리 중 오류가 발생했습니다:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boothDetail", boothId]});
    },
  });

  const handleLikeToggle = () => {
    likeMutation.mutate(hasLiked);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="relative flex items-center" onClick={handleLikeToggle}>
      {/* 좋아요 버튼 */}
      <img
        src={hasLiked ? like_filled : like_empty}
        alt="like button"
        className="cursor-pointer h-7 w-7 z-10"
      />
      {/* 좋아요 개수 */}
      <span className="absolute left-[10.3px] flex items-center justify-center text-black text-sm z-20">
        {likeCount}
      </span>
    </div>
  );
}
