import * as React from "react";
import { useRef, useState } from "react";
import cancel from "@/../public/assets/svgs/cancel.svg";
import empty_box from "@/../public/assets/svgs/empty-box.svg";
import check_box from "@/../public/assets/svgs/check-box.svg";
import send from "@/../public/assets/svgs/send.svg";
import imgIcon from "@/../public/assets/svgs/img.svg"; // 아이콘 이름이 중복되지 않도록 변경
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimeCapsuleModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeCapsuleModal({
  isOpen,
  setIsOpen,
}: TimeCapsuleModalProps) {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [img, setImg] = useState<{
    file: string | ArrayBuffer | null;
    name: string | null;
  }>({
    file: null,
    name: null,
  });
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [detail, setDetail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedImg = imgRef.current?.files?.[0];
    console.log(selectedImg);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("email", email);
    formData.append("detail", detail);

    if (selectedImg) {
      formData.append("image", selectedImg);
    }

    try {
      alert("타임캡슐 작성이 완료되었습니다.");
      setIsOpen(false); // 작성 완료 후 모달 닫기
    } catch (error) {
      console.error("타임캡슐 전송 실패:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="pt-4">타임캡슐</DialogTitle>
        </DialogHeader>

        {/* 타임캡슐 작성 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center gap-3 mb-5">
            <div>
              <Label htmlFor="title" className="text-black text-sm">
                닉네임
              </Label>
              <Input
                required
                value={title}
                type="text"
                id="title"
                className="bg-white"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5">
            <Label htmlFor="email" className="text-black text-sm">
              받는 사람 메일
            </Label>
            <Input
              required
              value={email}
              type="email"
              id="email"
              className="bg-white"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mb-5">
            <Label htmlFor="detail" className="text-black text-sm">
              작성란
            </Label>
            <Textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              id="detail"
              placeholder="지금을 기록해보세요."
              className="bg-white min-h-[120px] max-h-[240px]"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-20%] flex items-center text-black text-[8px] font-black font-['NanumSquare Neo'] whitespace-nowrap">
              <img src={cancel} alt="cancel" className="mr-1 mb-0.5" />
              <p>
                비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제 될 수
                있습니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="photo" className="text-black text-sm">
              이미지 업로드
            </Label>

            <div className="relative">
              <input
                id="photo"
                title="이미지 파일 선택"
                type="file"
                accept="image/*"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                ref={imgRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImg({
                        file: reader.result,
                        name: file.name,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="flex items-center bg-white border border-gray-300 rounded p-2">
                <div>
                  <span>{img.name ? img.name : ""}</span>
                </div>
                <img src={imgIcon} alt="img" className="ml-auto w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 공개 비공개 선택 */}
          <div className="relative flex items-center">
            <img
              src={isChecked ? check_box : empty_box} // 체크 상태에 따라 이미지 변경
              alt={isChecked ? "check-box" : "empty-box"}
              className="h-[5%] w-[5%] mt-3 mr-2 cursor-pointer"
              onClick={() => {
                setIsChecked((prev) => !prev);
              }}
            />
            <p className="mt-3 text-xs"> 공개 </p>
          </div>
        </form>

        <div className="flex justify-center items-center mb-12">
          <div className="relative flex items-center text-s">
            <p>오늘을 기억하고 추억을 선물하세요</p>
          </div>
        </div>

        <DialogClose asChild>
          <div className="absolute bottom-3 right-2">
            <button type="button" onClick={() => setIsOpen(false)}>
              <img src={send} alt="send" />
            </button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
