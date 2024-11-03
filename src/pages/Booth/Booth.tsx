import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoothCategory from "@/components/ui/booth-category";
import BoothDate from "@/components/Booth/BoothDate";
import BoothCards from "@/components/Booth/BoothCards";
import BoothCarousel from "@/components/Booth/BoothCarousel";
import square from "@/../public/images/518-square_booth.png";
import backgate from "@/../public/images/backgate-street_booth.png";
import RegisterButton from "@/components/admin/registerButton";
import { checkAdminToken } from "@/utils/tokenHandler";

export default function Booth() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const images = [square, backgate];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleDateChange = (number: number) => {
    setSelectedDate(number);
  };

  const handleIndex = (index: number) => {
    const location = index === 0 ? "backgate-street" : "square-518";
    setSelectedLocation(location);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleCardSelect = (boothId: number) => {
    navigate(`/booth/${boothId}`);
  };

  //console.log(checkAdminToken());

  return (
    <div className="h-auto flex flex-col items-center">
      <h1 className="text-main text-4xl font-cafe24 mb-5">부스</h1>

      <BoothDate selectedDate={selectedDate} onDateChange={handleDateChange} />

      <div className="mb-7 max-w-[90%]">
        <BoothCarousel images={images} handleIndex={handleIndex} />
      </div>

      <BoothCategory onCategoryChange={handleCategoryChange} />

      <BoothCards
        selectedDate={selectedDate}
        selectedCategories={selectedCategories}
        selectedLocation={selectedLocation}
        onCardSelect={handleCardSelect}
      />

      <div className="absolute bottom-5 right-5">
        <RegisterButton path={"booth"} />
      </div>
    </div>
  );
}
