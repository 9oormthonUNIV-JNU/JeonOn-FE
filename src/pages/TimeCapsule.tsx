import jar_empty from "@/../public/assets/images/jar_empty.png";
import { FilledBtn } from "../components/ui/filled-btn";
import SignInModal from "../components/Modal/SignInModal";
import TimeCapsuleModal from "../components/Modal/TimeCapsuleModal";
import { useState, useEffect } from "react";

export default function TimeCapsule() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTimeCapsuleOpen, setIsTimeCapsuleOpen] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<number>(0);

  // loginStatus로 토큰 대신 함 -> 토큰 및 api 설정 전 화면 구성 위함
  useEffect(() => {
    // 새로고침하면 로그인 정보 리셋
    window.onbeforeunload = () => {
      localStorage.removeItem("loginStatus");
      setLoginStatus(0);
    };
  }, []);

  const handleRegisterClick = () => {
    if (loginStatus === 1) {
      setIsTimeCapsuleOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setLoginStatus(1);
    localStorage.setItem("loginStatus", "1");
    setIsModalOpen(false);
    setIsTimeCapsuleOpen(true);
  };

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
          onClick={handleRegisterClick}
        >
          등록하기
        </FilledBtn>
      </div>

      {/* 로그인 모달 */}
      {isModalOpen && (
        <SignInModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 타임캡슐 모달 */}
      {isTimeCapsuleOpen && (
        <TimeCapsuleModal
          isOpen={isTimeCapsuleOpen}
          setIsOpen={setIsTimeCapsuleOpen}
        />
      )}
    </div>
  );
}
