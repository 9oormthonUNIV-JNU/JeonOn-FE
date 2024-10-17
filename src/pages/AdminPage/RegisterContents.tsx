import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import photo from '@/../public/assets/svgs/photo.svg';
import { useRef, useState } from 'react';

export default function RegisterContents() {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');

  const imgRef2 = useRef<HTMLInputElement>(null);

  const formData = new FormData();
  const imgs = imgRef2.current?.files;

  if (imgs)
    if (imgs.length == 0) {
      // 파일이 없는 경우, FormData에 빈 문자열을 추가합니다.
      formData.append('image', '');
    } else {
      formData.append('image', imgs[0]);
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(2);
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">콘텐츠</h1>
      </div>
      <div className="w-full flex flex-col">
        <div className="text-white flex font-pretendard text-xl mt-10 mb-6 justify-center">
          콘텐츠 등록
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-white text-sm font-pretendard flex flex-col gap-4"
      >
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="contents_title" className="flex justify-start">
            제목
          </Label>
          <Input
            required
            id="contents_title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="bg-white text-black"
          />
        </div>
        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="contents_detail" className="flex justify-start">
            콘텐츠 설명
          </Label>
          <Textarea
            required
            id="contents_detail"
            onChange={(e) => setDetail(e.target.value)}
            value={detail}
            className="bg-white text-black min-h-36"
          />
        </div>

        <div className="flex flex-col mx-10 gap-2">
          <Label htmlFor="picture" className="flex justify-start">
            이미지
          </Label>
          <div className="relative">
            <Input
              multiple
              id="picture"
              type="file"
              accept="image/*"
              className="bg-white"
              ref={imgRef2}
            />
            <img src={photo} alt="photo" className="absolute top-2 right-2" />
          </div>
        </div>
        <div className="flex flex-col mx-10 gap-2"></div>
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
  );
}
