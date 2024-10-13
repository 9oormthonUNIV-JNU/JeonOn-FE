import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import feedbackInfo from '@/../public/assets/svgs/feedbackInfo.svg';
import photo from '@/../public/assets/svgs/photo.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import postFeedback from '@/api/feedback';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Feedback() {
  const [title, setTitle] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [detail, setDetail] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const imgRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const img = imgRef.current?.files?.[0];
    console.log(img);
    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', feedbackType);
    formData.append('detail', detail);
    // 이미지가 있는 경우에만 추가
    if (img) {
      formData.append('image', img);
    }

    // const config = {
    //   headers: {
    //     // Authorization: ...,  // 토큰 넣어주기
    //     'Content-Type': 'multipart/form-data',  // 데이터 형식 지정
    //   },
    // };
    try {
      const result = await postFeedback(formData);
      console.log(result);
      // formData.append('image', );
      // if(result.status===200){

      // }
      setOpenModal((v) => !v);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen px-12">
      <div className="flex flex-col justify-center items-center mb-9">
        <h1 className="text-main text-3xl font-bold mb-1">피드백</h1>
        <h3 className="text-white text-xl">피드백 작성</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center gap-3 mb-10">
          <div>
            <div className="mb-2">
              <Label htmlFor="feedback" className="text-white text-sm">
                피드백 제목
              </Label>
            </div>

            <Input
              required
              value={title}
              type="text"
              id="feedback"
              placeholder="피드백"
              className="bg-white"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-start items-center gap-1 mb-2">
              <Label htmlFor="type" className="text-white text-sm">
                피드백 유형
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img src={feedbackInfo} alt="feedbackInfo" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 h-48 ml-36 -mt-6">
                  <div className="py-2 px-5">
                    <div className="flex flex-col justify-center items-start gap-1">
                      <div>
                        <h2 className="text-sm">축제 준비위원회</h2>
                        <p className="text-[10px]">
                          앞으로 더 나은 축제를 위한 피드백
                        </p>
                        <p className="text-[7px]">
                          (ex, 축제에서 여러 부스 활동에 참여하는 하나의
                          프로그램이 있으면 좋겠습니다./ 희망 연예인 등)
                        </p>
                      </div>
                      <div>
                        <h2 className="text-sm">2024 대동제</h2>
                        <p className="text-[10px]">
                          2024 대동제 ‘전대미문’에 대한 피드백 or
                          ‘전대미문’에서의 실시간 건의사항
                        </p>
                        <p className="text-[7px]">
                          (ex, 5일에 봉지 왼쪽 부분의 통행이 불편합니다./ 축제
                          진행자분 목소리 조금만 더 키워주면 좋겠습니다 등)
                        </p>
                      </div>
                      <div>
                        <h2 className="text-sm">축제 사이트</h2>
                        <p className="text-[10px]">축제 사이트에 대한 피드백</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">축준위</SelectItem>
                <SelectItem value="dark">전대미문-축제</SelectItem>
                <SelectItem value="system">앱</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="mb-2">
              <Label htmlFor="detail" className="text-white text-sm">
                상세내용
              </Label>
            </div>

            <Textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              id="detail"
              placeholder="피드백"
              className="bg-white min-h-56 max-h-64"
            />
          </div>

          <div>
            <div className="mb-2">
              <Label htmlFor="photo" className="text-white text-sm">
                이미지 업로드
              </Label>
            </div>
            <div className="relative">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="bg-white"
                ref={imgRef}
                // onChange={(e)=>}
              />
              <img src={photo} alt="photo" className="absolute top-2 right-2" />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center">
          <button
            className="text-main bg-black px-8 py-2 rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
            type="submit"
          >
            접수하기
          </button>
        </div>
      </form>
      <Dialog open={openModal}>
        <DialogContent className="w-5/6 h-40 rounded-xl">
          <DialogHeader>
            <DialogTitle className="pt-4">접수 되었습니다.</DialogTitle>
            <DialogClose asChild>
              <div className="pt-5">
                <button
                  className="text-main bg-black px-8 py-2 rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
                  type="submit"
                  onClick={() => setOpenModal((v) => !v)}
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
}
