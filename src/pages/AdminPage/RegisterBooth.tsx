import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilledBtn } from "@/components/common/Button/filled-btn";
import { useState, useRef } from "react";
import photo from "@/../public/assets/svgs/photo.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { CustomDatePicker } from "@/components/common/DatePicker/CustomDatePicker";
import { postBooth } from "@/api/booth";

type BoothCategoryType = {
  type: string;
  category: string;
};

const boothCategory: BoothCategoryType[] = [
  { type: "음식", category: "" },
  { type: "체험", category: "" },
  { type: "플리마켓", category: "" },
  { type: "홍보", category: "" },
  { type: "기타", category: "" },
];

type BoothPeriodType = {
  type: string;
  period: string;
};

const boothPeriod: BoothPeriodType[] = [
  { type: "주/야간", period: "" },
  { type: "주간", period: "" },
  { type: "야간", period: "" },
];

const RegisterBooth = () => {
  const [name, setName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [index, setIndex] = useState<number>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const images = imgRef.current?.files
      ? Array.from(imgRef.current.files)
      : [];

    // 날짜와 시간 분리
    const formatDate = (date: Date | null) =>
      date ? date.toISOString().split("T")[0] : "";

    const formatTime = (date: Date | null) =>
      date ? date.toTimeString().split(" ")[0] : "";

    const data = {
      name,
      location,
      index,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      start_time: formatTime(startDate),
      end_time: formatTime(endDate),
      description,
      category: selectedCategory,
      period: selectedPeriod,
      images,
    };

    try {
      await postBooth(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Registeration failed:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">부스</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          부스 등록
        </div>
        <form
          onSubmit={handleSubmit}
          className="text-white text-sm font-pretendard flex flex-col gap-4"
        >
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_name" className="flex justify-start">
              부스명
            </Label>
            <Input
              required
              id="booth_name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-white text-black"
            />
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_location" className="flex justify-start">
              부스 위치
            </Label>
            <div className="flex flex-row gap-2">
              <Select required value={location} onValueChange={setLocation}>
                <SelectTrigger className="font-pretendard bg-white text-black w-36 text-sm">
                  {" "}
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-pretendard text-black text-sm">
                  <SelectItem value="후문거리">후문거리</SelectItem>
                  <SelectItem value="518 광장">518 광장</SelectItem>
                </SelectContent>
              </Select>
              <Input
                required
                placeholder="부스 번호 (n번 부스)"
                id="booth_location"
                type="text"
                onChange={(e) => setIndex(Number(e.target.value))}
                value={index}
                className="bg-white text-black"
              />
            </div>
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_duration" className="flex justify-start">
              부스 운영 일시
            </Label>
            <div className="flex flex-row gap-3 items-center">
              <CustomDatePicker
                time={true}
                selectedDate={startDate}
                onChange={(date) => setStartDate(date)}
              />{" "}
              ~{" "}
              <CustomDatePicker
                time={true}
                selectedDate={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_description" className="flex justify-start">
              부스 설명
            </Label>
            <Textarea
              required
              placeholder="부스 주최자와 함께 부스를 자유롭게 설명해주세요. "
              id="booth_description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white min-h-56 max-h-64 text-black"
            />
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_image" className="flex justify-start">
              부스 이미지
            </Label>
            <div className="relative">
              <Input
                id="booth_image"
                type="file"
                accept="image/*"
                className="bg-white"
              />
              <img src={photo} alt="photo" className="absolute top-2 right-2" />
            </div>
          </div>
          <div className="flex flex-col mx-10 gap-2">
            <Label htmlFor="booth_image" className="flex justify-start">
              부스 필터링 선택
            </Label>
            <div className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap max-w-full">
              {boothCategory.map((category) => {
                const isSelected = selectedCategory === category.type;
                const categoryClasses = `${
                  isSelected
                    ? "bg-main text-black border-main"
                    : "bg-black text-white border-white"
                } border text-xs w-16 h-7 flex shrink-0`;
                return (
                  <FilledBtn
                    className={categoryClasses}
                    onClick={() => setSelectedCategory(category.type)}
                  >
                    {category.type}
                  </FilledBtn>
                );
              })}
              {boothPeriod.map((period) => {
                const isSelected = selectedPeriod === period.type;
                const periodClasses = `${
                  isSelected
                    ? "bg-main text-black border-main"
                    : "bg-white text-black border-white"
                } border text-xs w-16 h-7 flex shrink-0`;
                return (
                  <FilledBtn
                    className={periodClasses}
                    onClick={() => setSelectedPeriod(period.type)}
                  >
                    {period.type}
                  </FilledBtn>
                );
              })}
            </div>
          </div>
          <div className="flex justify-end mt-5 mx-10">
            <button
              className="relative text-main font-pretendard text-base px-8 py-2  bg-black rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
              type="submit"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
      <Dialog open={openModal}>
        <DialogContent className="w-5/6 h-40 rounded-xl font-pretendard">
          <DialogHeader>
            <DialogTitle className="pt-4">등록되었습니다.</DialogTitle>
            <DialogClose asChild>
              <div className="pt-5">
                <button
                  className="text-main bg-black px-8 py-2 rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
                  onClick={() => setOpenModal(false)}
                >
                  돌아가기
                </button>
              </div>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterBooth;
