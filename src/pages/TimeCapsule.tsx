import jar_empty from "@/../public/assets/images/jar_empty.png";
import { FilledBtn } from "../components/ui/filled-btn"; // FilledBtn 컴포넌트
import { SignInModal } from "../components/Modal/SignInModal";
import { useState } from "react"; // 상태 관리를 위해 useState 사용

export default function TimeCapsule() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-black flex flex-col items-center relative h-screen">
      <div className="mb-17 relative">
        <div className="w-[121px] h-[42px] mx-auto mb-5 text-[#0F0] font-pretendard text-[30px] font-bold leading-normal">
          타임캡슐
        </div>
        <div className="mb-4 text-white text-center font-gmarket-sans text-[15px] font-thin leading-[20px]">
          우리가 전하는 전대의 찬란함
        </div>

        <img src={jar_empty} alt="empty jar" className="relative" />

        <FilledBtn
          className="absolute top-15 right-3"
          onClick={() => setIsModalOpen(true)}
        >
          등록하기
        </FilledBtn>
      </div>

      {/* SignInModal 열기 */}
      <SignInModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
