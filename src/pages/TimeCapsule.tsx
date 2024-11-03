import cancel from "@/../public/assets/svgs/cancel-white.svg";
import { useState, useEffect } from "react";
import { getPublicTimeCapsules, getMyTimeCapsules } from "@/api/timecapsule";
import { isLoggedIn } from "@/api/login";
import JarImgControll from "@/components/TimeCapsule/JarImgControll";
import CapsuleComment from "@/components/TimeCapsule/CapsuleComment";
import feedbackInfo from "@/../public/assets/svgs/feedbackInfo.svg";
import { FilledBtn } from "../components/common/Button/filled-btn";
import SignInModal from "../components/common/Modal/SignInModal";
import TimeCapsuleModal from "../components/TimeCapsule/Modal/TimeCapsuleModal";
import SendCompleteModal from "../components/TimeCapsule/Modal/SendCompleteModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TimeCapsule() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [publicCapsules, setPublicCapsules] = useState([]); // 공개된 타임캡슐
  const [myCapsules, setMyCapsules] = useState([]);
  const [isFilled, setIsFilled] = useState(false);

  const fetchCapsules = async () => {
    try {
      const publicCapsules = await getPublicTimeCapsules();
      const myCapsules = await getMyTimeCapsules();

      if (publicCapsules) {
        setPublicCapsules(publicCapsules);
        console.log("Public Capsules:", publicCapsules); // 데이터를 가져온 후 로그 찍기
      } else {
        setPublicCapsules([]);
      }

      if (myCapsules) {
        setMyCapsules(myCapsules);
        console.log("My Capsules:", myCapsules); // 데이터를 가져온 후 로그 찍기
      } else {
        setMyCapsules([]);
      }
    } catch (error) {
      console.error("Error fetching time capsules:", error);
      setPublicCapsules([]);
    }
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  // 로그인 여부 확인 후 타임캡슐 모달 또는 로그인 모달 띄우기
  const handleRegisterClick = () => {
    console.log("Register 버튼 클릭됨");
    const isUserLoggedIn = isLoggedIn();
    if (isUserLoggedIn) {
      setActiveModal("timeCapsule"); // 로그인 O -> 타임캡슐 모달 열기
    } else {
      setActiveModal("signIn"); // 로그인 X -> 로그인 모달 열기
    }
  };

  const handleSendComplete = async () => {
    try {
      setActiveModal("sendComplete");
      fetchCapsules();
    } catch (error) {
      console.error("Error creating time capsule:", error);
    }
  };

  const handleImgChange = () => {
    setIsFilled(true);

    setTimeout(() => {
      setIsFilled(false);
    }, 2000); // 2초 후에 다시 false로 전환
  };

  return (
    <div className="bg-black flex flex-col items-center min-h-screen p-4 md:p-10 lg:p-20">
      <div className="flex flex-col items-center mb-5 w-full max-w-xl">
        <h1 className="text-main text-4xl font-cafe24">타임캡슐</h1>
        <div className="flex justify-center items-center mt-3 mb-5 w-full relative">
          <div className="text-white text-center font-pretendard text-xs md:text-[2.5vw] lg:text-[15px] font-thin leading-[20px]">
            지금 이 순간을 기록해보세요!
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <img
                src={feedbackInfo}
                alt="feedbackInfo"
                className="ml-2 w-5 h-5"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-screen items-center justify-center h-auto bg-black border-none">
              <div className="flex bg-white rounded-full px-3 py-1 text-[2.5vw] font-pretendard">
                기록하신 타임캡슐은 축제가 끝나는 날(8일) 메일로 전송됩니다.
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <JarImgControll isFilled={isFilled} />

        <div className="flex justify-end w-full">
          <FilledBtn
            onClick={handleRegisterClick}
            className="relative text-main font-pretendard text-base px-8 py-2 bg-black rounded-full border border-main hover:bg-main hover:border-main hover:text-black"
          >
            등록하기
          </FilledBtn>
        </div>
      </div>

      <div className="bg-black text-white flex items-center justify-center px-4 text-[11px] font-pretendard break-words">
        <img src={cancel} alt="cancel" className="mr-1.5" />
        <p>비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.</p>
      </div>

      {publicCapsules.length === 0 && myCapsules.length === 0 ? (
        <p className="text-[#00ff00] mt-10 text-xs text-center">
          아직 등록된 타임캡슐이 없습니다.
        </p>
      ) : (
        <CapsuleComment
          publicCapsules={publicCapsules}
          myCapsules={myCapsules}
          fetchCapsules={fetchCapsules}
        />
      )}

      <SignInModal
        isOpen={activeModal === "signIn"}
        setIsOpen={() => setActiveModal(null)}
      />

      <TimeCapsuleModal
        isOpen={activeModal === "timeCapsule"}
        setIsOpen={() => setActiveModal(null)}
        onSendComplete={handleSendComplete}
      />

      <SendCompleteModal
        isOpen={activeModal === "sendComplete"}
        setIsOpen={() => setActiveModal(null)}
        onConfirm={handleImgChange}
      />
    </div>
  );
}
