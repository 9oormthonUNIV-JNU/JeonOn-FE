import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import searchWhite from '@/../public/assets/svgs/search_white.svg';
import searchBlack from '@/../public/assets/svgs/search_black.svg';
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
            isFocused ? 'text-black bg-white' : 'text-white bg-black'
          } font-normal font-['NanumSquare Neo'] rounded-[30px] border border-white border-2 pl-4 pr-12 text-[16px]`}
          placeholder="부스명을 입력해주세요."
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <img
          src={searchWhite}
          alt="search"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => handleSearch(searchQuery)}
        />
      </div>

      {isFocused && searchResults !== null && (
        <div className="w-[85%] md:w-[85%] mx-auto mt-5">
          <div className="w-full bg-white rounded-[10px] border border-white p-3 relative">
            <div className="flex items-center mb-3">
              <img src={searchBlack} alt="search" className="w-6 h-6 mr-2" />
              <span className="text-black text-lg font-medium">{currentSearch}</span>
            </div>

            <div className="w-full h-0.5 border-b border-[#c8c8c8] mb-3"></div>

            <div className="flex flex-col space-y-3">
              {searchResults.length > 0 ? (
                searchResults.map((booth) => (
                  <div
                    key={booth.id}
                    className="flex items-center"
                    onClick={() => handleCardSelect(booth.id)}>
                    <div className="text-black text-md font-medium">
                      {highlightText(booth.name, currentSearch)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-black text-sm">검색하신 '{currentSearch}' 부스가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      )}

        <div className="mt-20 text-white text-xl font-medium font-['Pretendard']">실시간 인기 부스</div>

      <PopularBooth onCardSelect={handleCardSelect} />
    </div>
  );
}
