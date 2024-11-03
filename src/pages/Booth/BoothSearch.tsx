import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { searchBooth } from "@/api/booth";
import PopularBooth from "@/components/Booth/PopularBooth";

export default function BoothSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [currentSearch, setCurrentSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      setCurrentSearch(query);
      const result = await searchBooth(query);
      if (result && result.data) {
        setSearchResults(result.data);
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults(null);
    }
  };

  const handleCardSelect = (boothId: number) => {
    navigate(`/booth/${boothId}`);
  };

  const highlightText = (text: string, keyword: string) => {
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

  return (
    <div
      className="h-screen flex flex-col items-center"
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
          } font-normal font-['NanumSquare Neo'] rounded-[30px] border border-white border-2 pl-4 pr-4 text-[16px]`}
          placeholder="부스명을 입력해주세요."
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />

        {isFocused && searchResults !== null && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-[10px] border border-[#c8c8c8] p-3 shadow-md z-10">
            <div className="flex flex-col space-y-3">
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
                  검색하신 '{currentSearch}'에 대한 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-20 text-white text-xl font-medium font-['Pretendard']">
        실시간 인기 부스
      </div>
      <PopularBooth onCardSelect={handleCardSelect} />
    </div>
  );
}
