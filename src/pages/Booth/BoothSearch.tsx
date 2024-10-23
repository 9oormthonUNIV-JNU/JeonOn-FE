import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import searchWhite from '@/../public/assets/svgs/search_white.svg';
import searchBlack from '@/../public/assets/svgs/search_black.svg'; // 검은색 아이콘
import { searchBooth } from "@/api/booth"; // searchBooth 함수 임포트
import PopularBooth from "@/components/Booth/PopularBooth";

export default function BoothSearch() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색 키워드
  const [searchResults, setSearchResults] = useState<any[] | null>(null); // 검색 결과 상태
  const [currentSearch, setCurrentSearch] = useState(""); // 실제 검색이 실행된 키워드

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(null); // 검색어가 빈 문자열이면 검색 결과 초기화
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setCurrentSearch(searchQuery); // 검색어 저장 (검색 실행된 키워드)
      const result = await searchBooth(searchQuery);
      if (result && result.data) {
        setSearchResults(result.data); // 검색 결과 저장
      } else {
        setSearchResults([]); // 검색 결과가 없으면 빈 배열
      }
    }
  };

  const handleCardSelect = (boothId: number) => {
    navigate(`/booth/detail?boothId=${boothId}`); // 카테고리가 없으면 쿼리에서 제외
  }; 

  // 일치하는 단어를 강조
  const highlightText = (text: string, keyword: string) => {
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} style={{ color: '#166ff4' }}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-main text-4xl font-cafe24">부스</h1>

      {/* 검색 입력창과 검색 아이콘 */}
      <div className="relative w-[85%] mt-10">
        <Input
          className="h-10 w-full text-medium text-white font-normal font-['NanumSquare Neo'] rounded-[30px] border border-white border-2 pl-4 pr-12"
          placeholder="부스명을 입력해주세요."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
          }} // 입력 값 변경 시 상태 업데이트
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              handleSearch(); // 엔터 키로 검색 수행
            }
          }} // Enter 키 감지
        />
        <img
          src={searchWhite}
          alt="search"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handleSearch} // 검색 버튼 클릭 시 검색 수행
        />
      </div>

      {/* 이전 검색 결과를 유지 */}
      {searchQuery !== "" && searchResults !== null&& (
        <div className="w-[85%] md:w-[85%] mx-auto mt-5">
          <div className="w-full bg-white rounded-[10px] border border-white p-3 relative">
            {/* 상단 검색 아이콘 및 실제 검색된 검색어 */}
            <div className="flex items-center mb-3">
              <img src={searchBlack} alt="search" className="w-6 h-6 mr-2" />
              <span className="text-black text-lg font-medium">{currentSearch}</span>
            </div>

            {/* 얇은 실선 */}
            <div className="w-full h-0.5 border-b border-[#c8c8c8] mb-3"></div>

            {/* 검색 결과 렌더링 */}
            <div className="flex flex-col space-y-3">
              {searchResults.length > 0 ? (
                searchResults.map((booth) => (
                  <div 
                    key={booth.id} 
                    className="flex items-center"
                    onClick={() => {
                      navigate(`/booth/detail?boothId=${booth.id}`)}} // 부스 상세 페이지로 이동}
                    >
                    <div className="text-black text-md font-medium">
                      {highlightText(booth.name, currentSearch)}
                    </div>
                  </div>
                ))
              ) : (
                searchResults.length === 0 && (
                  <div className="text-black text-sm">검색하신 '{currentSearch}' 부스가 없습니다.</div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* 인기 부스 검색 */}
      <div className="mt-20 text-white text-xl font-medium font-['Pretendard']">실시간 인기 부스</div>
      <PopularBooth onCardSelect={handleCardSelect}/>
    </div>
  );
}
