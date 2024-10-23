import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { popularBooth } from "@/api/booth"; // API 함수 임포트

interface Booth {
  id: number;
  name: string;
  like_count: number;
}

export default function PopularBooth() {
  const [boothData, setBoothData] = useState<Booth[]>([]); // 부스 데이터를 배열로 관리
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태 관리

  useEffect(() => {
    const fetchBoothData = async () => {
      try {
        const result = await popularBooth(); // API 호출
        if (result && result.length > 0) {
          setBoothData(result); // 받아온 부스 데이터를 상태에 저장
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

  return (
    <div className="flex flex-col space-y-3 mt-10">
      {boothData.map((booth) => (
        <Card
          key={booth.id}
          className="w-[339px] h-10 relative bg-white rounded-[15px] shadow-md"
        >
          <CardContent className="p-0">
            {/* 부스 제목 */}
            <div className="w-[55px] h-6 absolute left-[55px] top-[9px] text-black text-xl font-medium font-['Pretendard']">
              {booth.name}
            </div>

            {/* 아이콘 자리 */}
            <div className="w-4 h-[13px] absolute left-[304px] top-[9px]">
              {/* 추가할 아이콘 자리 */}
            </div>

            {/* 조회수 또는 인기도 */}
            <div className="w-3 h-[11.53px] absolute left-[306px] top-[18.31px] text-black text-[10px] font-normal font-['Pretendard']">
              {booth.like_count}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
