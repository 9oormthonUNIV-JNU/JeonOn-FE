import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "react-datepicker/dist/react-datepicker.css";
import photo from "@/../public/assets/svgs/photo.svg";
import { Textarea } from "@/components/ui/textarea";
import postAffiliate from "@/api/afilliate";
import { useState, useRef } from "react";
import { CustomDatePicker } from "@/components/common/DatePicker/CustomDatePicker";

const RegisterAffiliate = () => {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const images = imgRef.current?.files
      ? Array.from(imgRef.current.files)
      : [];

    const data = {
      name,
      location,
      start_date: startDate?.toISOString().split("T")[0] || "",
      end_date: endDate?.toISOString().split("T")[0] || "",
      description,
      images,
    };

    try {
      await postAffiliate(data);
      setOpenModal(true);
    } catch (error) {
      console.error("Registeration failed:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">안내</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          제휴업체 등록
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-white text-sm font-pretendard flex flex-col gap-4"
      >
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_name" className="flex justify-start">
            매장명
          </Label>
          <Input
            required
            id="affiliate_name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_location" className="flex justify-start">
            매장 위치
          </Label>
          <Input
            required
            id="affiliate_location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_duration" className="flex justify-start">
            제휴 기간
          </Label>
          <div className="flex flex-row gap-3 items-center">
            <CustomDatePicker
              selectedDate={startDate}
              onChange={(date) => setStartDate(date)}
            />{" "}
            ~{" "}
            <CustomDatePicker
              selectedDate={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_description" className="flex justify-start">
            내용
          </Label>
          <Textarea
            required
            id="affiliate_description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white min-h-56 max-h-64 text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="affiliate_image" className="flex justify-start">
            업체 이미지
          </Label>
          <div className="relative">
            <Input
              id="affiliate_image"
              type="file"
              accept="image/*"
              className="bg-white"
            />
            <img src={photo} alt="photo" className="absolute top-2 right-2" />
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

export default RegisterAffiliate;
