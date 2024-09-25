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
import { useState } from 'react';

export default function Feedback() {
  const [title, setTitle] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [detail, setDetail] = useState('');
  // const [imageValue, setImageValue] = useState();

  return (
    <div className="h-screen px-12">
      <div className="flex flex-col justify-center items-center mb-9">
        <h1 className="text-main text-3xl font-bold mb-1">피드백</h1>
        <h3 className="text-white text-xl">피드백 작성</h3>
      </div>
      <div className="flex flex-col justify-center gap-3 mb-10">
        <div>
          <div className="mb-2">
            <Label htmlFor="feedback" className="text-white text-sm">
              피드백 제목
            </Label>
          </div>

          <Input
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
            <img src={feedbackInfo} alt="feedbackInfo" />
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
              className="bg-white"
              // value={imageValue}
            />
            <img src={photo} alt="photo" className="absolute top-2 right-2" />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <button className="text-main bg-black px-8 py-2 rounded-full border border-main">
          접수하기
        </button>
      </div>
    </div>
  );
}
