import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import PopularBooth from "@/components/Booth/PopularBooth";
import { searchBooth } from "@/api/booth";
import useDebounce from "@/hook/useDebounce";

export default function BoothSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // 디바운스된 검색어 생성
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // useQuery로 검색 API 호출
  const { data: searchResults, refetch } = useQuery({
    queryKey: ["searchBooth", debouncedSearchQuery],
    queryFn: () => searchBooth(debouncedSearchQuery),
    enabled: !!debouncedSearchQuery,
    staleTime: 1000 * 60 * 1,
  });

  console.log(searchResults);

  const handleCardSelect = (boothId) => {
    navigate(`/booth/${boothId}`);
  };

  const highlightText = (text, keyword) => {
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} style={{ color: "#166ff4" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);

  return (
    <div
      className="h-screen flex flex-col items-center font-pretendard"
      onClick={() => setIsFocused(false)}
    >
      <h1 className="text-main text-4xl font-cafe24">부스</h1>

      <div
        className="relative w-[85%] mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Input
          className={`h-10 w-full text-medium ${
            isFocused ? "text-black bg-white" : "text-white bg-black"
          } font-normal font-['NanumSquare Neo'] rounded-[30px] border-white border-2 pl-4 pr-4 text-[16px]`}
          placeholder="부스명을 입력해주세요."
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
        />

        {isFocused && searchResults && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-[10px] border border-[#c8c8c8] p-3 shadow-lg z-10">
            <div className="flex flex-col space-y-3 max-h-[200px] overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((booth) => (
                  <div
                    key={booth.id}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleCardSelect(booth.id)}
                  >
                    <div className="text-black text-md font-medium">
                      {highlightText(booth.name, searchQuery)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-black text-sm">
                  검색하신 '{debouncedSearchQuery}'에 대한 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-20 text-white text-xl font-medium">
        실시간 인기 부스
      </div>
      <PopularBooth onCardSelect={handleCardSelect} />
    </div>
  );
}
