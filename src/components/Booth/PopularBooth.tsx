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
  onCardSelect: (boothId: number) => void;
}

export default function PopularBooth({ onCardSelect }: PopularBoothProps) {
  const [boothData, setBoothData] = useState<Booth[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
    const fetchBoothData = async () => {
      try {
        const result = await popularBooth();
        if (result && result.success) {
          const sortedData = result.data.sort(
            (a: Booth, b: Booth) => b.like_count - a.like_count
          );
          setBoothData(sortedData);
        } else {
          setBoothData([]);
        }
      } catch (error) {
        console.error("Error fetching booth data:", error);
        setError("Failed to fetch booth data");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchBoothData();
    const intervalId = setInterval(() => {
      fetchBoothData();
    }, 10000); // 10초

    return () => clearInterval(intervalId);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (boothData.length === 0) {
    return (
      <div className="text-white mt-10">
        현재 인기 부스가 존재하지 않습니다.
      </div>
    );
  }

  const rankedBooths = getRankings(boothData);

  return (
    <div className="flex flex-col items-center space-y-3 mt-10 w-full">
      {rankedBooths.map((booth) => (
        <Card
          key={booth.id}
          onClick={() => onCardSelect(booth.id)}
          className="h-auto w-full max-w-[90%] relative bg-white rounded-[20px] shadow-md flex justify-between items-center p-3"
        >
          <CardContent className="flex items-center p-0 relative">
            <div className="relative">
              <img src={bookmark} className="w-9 h-9" alt="bookmark" />
              <span className="absolute top-1/2 left-1/2 text-[#00ff00] text-[11px] font-bold transform -translate-x-1/2 -translate-y-1/2 pb-2">
                {booth.ranking}
              </span>
            </div>

            <div className="ml-3">
              <div className="text-black text-xl font-medium font-['Pretendard']">
                {booth.name}
              </div>
            </div>
          </CardContent>

          <div className="relative flex items-center space-x-2 mr-2">
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
