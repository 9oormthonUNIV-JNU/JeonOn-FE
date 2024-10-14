import * as React from "react";
import { useState } from "react";
import cancel from "@/../public/assets/svgs/cancel.svg";
import empty_box from "@/../public/assets/svgs/empty-box.svg";
import check_box from "@/../public/assets/svgs/check-box.svg";
import send from "@/../public/assets/svgs/send.svg";
import imgIcon from "@/../public/assets/svgs/img.svg";
import { createTimeCapsule } from "@/api/timecapsule";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

interface TimeCapsuleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSendComplete: (
    mailAddress: string,
    content: string,
    isPublic: boolean,
    images: File[]
  ) => void;
}

export default function TimeCapsuleModal({
  isOpen,
  setIsOpen,
  onSendComplete,
}: TimeCapsuleModalProps) {
  const getNickname = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const parsedToken = JSON.parse(token);
        return parsedToken.nickname || "Guest";
      }
    } catch (error) {
      console.error("Token parsing error:", error);
    }
    return "Guest";
  };

  const [nickname] = useState(getNickname());

  const [formData, setFormData] = useState({
    mailAddress: "",
    content: "",
    isPublic: true,
    images: [] as File[],
  });

  // 타임캡슐을 전송하는 뮤테이션
  const sendMutation = useMutation({
    mutationFn: async (data: {
      mailAddress: string;
      nickname: string;
      content: string;
      isPublic: boolean;
      images: File[];
    }) => {
      await createTimeCapsule(
        data.mailAddress,
        data.content,
        data.isPublic,
        data.images
      );
    },
    onSuccess: () => {
      alert("타임캡슐 작성이 완료되었습니다.");
      setIsOpen(false);
      onSendComplete(
        formData.mailAddress,
        formData.content,
        formData.isPublic,
        formData.images
      );
      resetForm();
    },
    onError: (error) => {
      alert("타임캡슐 작성에 실패했습니다.");
      console.error(error);
    },
  });

  const resetForm = () => {
    setFormData({
      mailAddress: "",
      content: "",
      isPublic: true,
      images: [],
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMutation.mutate({ ...formData, nickname });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, images: files }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[90%] md:w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="pt-4">타임캡슐 작성</DialogTitle>
        </DialogHeader>

        {/* 타임캡슐 작성 폼 */}
        <form onSubmit={handleSubmit}>
          {/* 닉네임 표시 */}
          <div className="flex flex-col justify-center gap-3 mb-5">
            <Label htmlFor="nickname" className="text-black text-sm">
              닉네임
            </Label>
            <Input
              value={nickname}
              type="text"
              id="nickname"
              className="bg-white"
              readOnly
            />
          </div>

          {/* 이메일 입력 */}
          <div className="flex flex-col justify-center gap-3 mb-5">
            <Label htmlFor="mailAddress" className="text-black text-sm">
              받는 사람 메일
            </Label>
            <Input
              required
              value={formData.mailAddress}
              type="email"
              name="mailAddress"
              id="mailAddress"
              className="bg-white"
              onChange={handleInputChange}
            />
          </div>

          {/* 내용 입력 */}
          <div className="relative mb-5">
            <Label htmlFor="content" className="text-black text-sm">
              작성란
            </Label>
            <Textarea
              required
              value={formData.content}
              id="content"
              name="content"
              placeholder="지금을 기록해보세요."
              className="bg-white min-h-[120px] max-h-[240px]"
              onChange={handleInputChange}
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-20%] flex items-center text-black text-[8px] font-black font-['NanumSquare Neo'] whitespace-nowrap">
              <img src={cancel} alt="cancel" className="mr-1 mb-0.5" />
              <p>
                비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.
              </p>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="flex flex-col">
            <Label htmlFor="photo" className="text-black text-sm">
              이미지 업로드
            </Label>
            <div className="relative">
              <input
                id="photo"
                title="이미지 파일 선택"
                type="file"
                multiple
                accept="image/*"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                src={imgIcon}
                onChange={handleImageChange}
              />
              <div className="flex items-center bg-white border border-gray-300 rounded p-2">
                <div>
                  <span>
                    {formData.images.length > 0
                      ? `${formData.images.length}개의 이미지 선택됨`
                      : ""}
                  </span>
                </div>
                <img src={imgIcon} alt="img" className="ml-auto w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 공개 비공개 선택 */}
          <div className="relative flex items-center">
            <img
              src={formData.isPublic ? check_box : empty_box}
              alt={"공개 또는 비공개"}
              className="h-[5%] w-[5%] mt-3 mr-2 cursor-pointer"
              onClick={() =>
                setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))
              }
            />
            <p className="mt-3 text-xs">공개</p>
          </div>

          <div className="flex justify-center items-center mb-12">
            <div className="relative flex items-center text-s mt-3">
              <p>오늘을 기억하고 추억을 선물하세요</p>
            </div>
          </div>

          <DialogClose asChild>
            <button
              type="submit"
              className="absolute bottom-4 right-4 px-4 py-2"
            >
              <img src={send} alt="send" />
            </button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
