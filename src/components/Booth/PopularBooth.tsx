import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { popularBooth } from "@/api/booth"; // API 함수 임포트
import like_filled from "@/../public/assets/svgs/like_filled.svg";
import bookmark from "@/../public/assets/svgs/bookmark_black.svg";

interface Booth {
  id: number;
  name: string;
  like_count: number;
}

interface PopularBoothProps {
  onCardSelect: (boothId: number) => void; // boothId를 넘겨받는 함수 타입
}

export default function PopularBooth({ onCardSelect }: PopularBoothProps) {
  const [boothData, setBoothData] = useState<Booth[]>([]); // 부스 데이터를 배열로 관리
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        const result = await popularBooth(); // API 호출
        if (result && result.success) {
          const sortedData = result.data.sort(
            (a: Booth, b: Booth) => b.like_count - a.like_count
          );
          setBoothData(sortedData); // 좋아요 수에 따라 정렬 후 상태에 저장
        } else {
          setBoothData([]); // 데이터가 없을 때 빈 배열
        }
      } catch (error) {
        console.error("Error fetching booth data:", error);
        setError("Failed to fetch booth data"); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchBoothData(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  const getRankings = (booths: Booth[]) => {
    let ranking = 1;
    return booths.map((booth, index) => {
      if (index > 0 && booth.like_count !== booths[index - 1].like_count) {
        ranking = index + 1;
      }
      return { ...booth, ranking };
    });
  };

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때
  }

  if (error) {
    return <div>Error: {error}</div>; // 에러가 발생했을 때
  }

  if (boothData.length === 0) {
    return (
      <div className="text-white mt-10">
        현재 인기 부스가 존재하지 않습니다.
      </div>
    ); // 데이터가 없을 때
  }

  const rankedBooths = getRankings(boothData);

  return (
    <div className="flex flex-col items-center space-y-3 mt-10 w-full">
      {rankedBooths.map((booth) => (
        <Card
          key={booth.id}
          onClick={() => onCardSelect(booth.id)}
          className="w-full max-w-[90%] relative bg-white rounded-[15px] shadow-md flex justify-between items-center p-4"
        >
          <CardContent className="flex items-center p-0 relative">
            {/* 순위 및 북마크 아이콘 */}
            <div className="relative">
              <img src={bookmark} className="w-8 h-8" alt="bookmark" />
              <span className="absolute top-1/2 left-1/2 text-[#00ff00] text-[1vh] font-bold transform -translate-x-1/2 -translate-y-1/2 pb-1">
                {booth.ranking}위
              </span>
            </div>

            {/* 부스 제목 */}
            <div className="ml-3">
              <div className="text-black text-xl font-medium font-['Pretendard']">
                {booth.name}
              </div>
            </div>
          </CardContent>

          {/* 좋아요 아이콘 및 좋아요 수 */}
          <div className="relative flex items-center space-x-2">
            <img src={like_filled} className="w-6 h-6 mb-2" alt="like" />
            <span className="absolute top-1/2 left-1/2 text-black text-sm transform -translate-x-1/2 pt-1.5 pr-3.5">
              {booth.like_count}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
