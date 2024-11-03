import * as React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import cancel from "@/../public/assets/svgs/cancel-black.svg";
import empty_box from "@/../public/images/empty_box.png";
import check_box from "@/../public/images/check_box.png";
import send from "@/../public/assets/svgs/send.svg";
import send_click from "@/../public/assets/svgs/send_click.svg";
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
import { getProfile } from "@/api/user";
import { isLoggedIn } from "@/api/login";

interface TimeCapsuleModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSendComplete: (
    mail_address: string,
    content: string,
    is_public: boolean,
    images: File[]
  ) => void;
}

export default function TimeCapsuleModal({
  isOpen,
  setIsOpen,
  onSendComplete,
}: TimeCapsuleModalProps) {
  const [nickname, setNickname] = useState<string>("Guest");
  const [buttonImage, setButtonImage] = useState(send);

  const [formData, setFormData] = useState({
    mailAddress: "",
    content: "",
    isPublic: true,
    images: [] as File[],
  });

  // 사용자 프로필 데이터 fetching
  const {
    data: profileData,
    isSuccess,
    isError: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!isLoggedIn()) throw new Error("User not logged in");
      const result = await getProfile();
      return result;
    },
    enabled: isLoggedIn() !== false, // 로그인 상태에서만 쿼리 실행
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
  });

  useEffect(() => {
    if (isSuccess && profileData?.nickname) {
      setNickname(profileData.nickname);
    }
    if (!isOpen) {
      resetForm();
    }
  }, [isSuccess, profileData, isOpen]);

  // 타임캡슐을 전송하는 함수
  const sendTimeCapsule = async (data: {
    mailAddress: string;
    content: string;
    isPublic: boolean;
    images: File[];
  }) => {
    try {
      // createTimeCapsule 함수 대신 직접 axios 요청을 보냅니다.
      await createTimeCapsule(
        data.mailAddress,
        data.content,
        data.isPublic,
        data.images
      );

      onSendComplete(
        formData.mailAddress,
        formData.content,
        formData.isPublic,
        formData.images
      );

      resetForm();
      setIsOpen(false);
    } catch (error) {
      alert("타임캡슐 작성에 실패했습니다.");
      console.error(error);
    }
  };

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

    // 내용이 비어 있으면 폼 제출을 막음
    if (!formData.mailAddress.trim() || !formData.content.trim()) {
      alert("이메일과 내용을 모두 입력해야 합니다.");
      return;
    }

    setButtonImage(send_click);

    try {
      await sendTimeCapsule({ ...formData });
    } catch (error) {
      console.error("타임캡슐 전송 오류:", error);
      alert("타임캡슐 작성에 실패했습니다.");
    } finally {
      setButtonImage(send);
    }
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

      if (formData.images.length + files.length > 3) {
        alert("이미지는 최대 3장까지 업로드할 수 있습니다.");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="w-[90%] md:w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="pt-4">타임캡슐</DialogTitle>
        </DialogHeader>

        {/* 타임캡슐 작성 폼 */}
        <form onSubmit={handleSubmit} className="font-pretendard">
          {/* 닉네임 표시 */}
          <div className="flex flex-col justify-center gap-2 mb-5">
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
          <div className="flex flex-col justify-center gap-2 mb-5">
            <Label htmlFor="mailAddress" className="text-black text-sm">
              받는 사람 메일
            </Label>
            <Input
              required
              value={formData.mailAddress}
              placeholder="타임캡슐을 받을 메일을 정확하게 입력해주세요."
              type="email"
              name="mailAddress"
              id="mailAddress"
              className="bg-white text-xs"
              onChange={handleInputChange}
            />
          </div>

          {/* 내용 입력 */}
          <div className="relative mb-5">
            <Label htmlFor="content" className="text-black text-">
              작성란
            </Label>
            <Textarea
              required
              value={formData.content}
              id="content"
              name="content"
              placeholder="지금을 기록해보세요."
              className="bg-white min-h-[120px] max-h-[240px] mt-2 text-xs resize-none pb-10"
              onChange={handleInputChange}
            />
            <div className="absolute w-full left-1/2 transform -translate-x-1/2 bottom-1.5 flex justify-center items-center text-black text-[9px] font-black break-words">
              <img src={cancel} alt="cancel" className="mr-1 w-3" />
              <p>
                비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.
              </p>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div className="flex flex-col">
            <Label htmlFor="photo" className="text-black text-sm mb-2">
              이미지 첨부(3장 제한)
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
                  {formData.images.length > 0 ? (
                    <ul>
                      {formData.images.map((image, index) => (
                        <li key={index}>
                          {image.name}
                          <button
                            type="button"
                            onClick={(
                              e: React.MouseEvent<HTMLButtonElement>
                            ) => {
                              e.stopPropagation();
                              handleImageRemove(index);
                            }}
                            className="ml-2 relative text-red-500 text-xs z-100 w-4"
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
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
              className="h-4 w-4 mt-3 mr-1.5 cursor-pointer object-cover max-h-full max-w-full"
              onClick={() =>
                setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))
              }
            />
            <p className="mt-3 text-sm">공개</p>
          </div>

          <div className="flex justify-center items-center mb-12">
            <div className="relative flex items-center text-s mt-3">
              <p>오늘을 기억하고, 추억을 선물하세요</p>
            </div>
          </div>

          <button type="submit" className="absolute bottom-4 right-2 py-2">
            <img src={buttonImage} alt="send" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
