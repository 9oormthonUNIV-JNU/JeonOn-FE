import cancel from "@/../public/assets/svgs/cancel-white.svg";
import { useState, useEffect } from "react";
import { getPublicTimeCapsules, getMyTimeCapsules } from "@/api/timecapsule";
import { isLoggedIn } from "@/api/login";
import CapsuleJarImg from "@/components/TimeCapsule/CapsuleJarImg";
import CapsuleComment from "@/components/TimeCapsule/CapsuleComment";
import { FilledBtn } from "../components/common/Button/filled-btn";
import SignInModal from "../components/common/Modal/SignInModal";
import TimeCapsuleModal from "../components/TimeCapsule/Modal/TimeCapsuleModal";
import SendCompleteModal from "../components/TimeCapsule/Modal/SendCompleteModal";

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
      fetchCapsules();
      setActiveModal("sendComplete");
    } catch (error) {
      console.error("Error creating time capsule:", error);
    }
  };

  // 여기 수정하기!!!!!!!!!!
  const handleImgChange =() => {
    setIsFilled(true);
  }


  return (
    <div className="bg-black flex flex-col items-center min-h-screen p-4 md:p-10 lg:p-20">
      <div className="flex flex-col items-center mb-5 w-full max-w-xl">
        <h1 className="text-main text-4xl font-cafe24">타임캡슐</h1>
        <div className="mb-4 text-white text-center font-gmarket-sans text-[3.5vw] md:text-[2.5vw] lg:text-[15px] font-thin leading-[20px] mb-20">
          우리가 전하는 전대의 찬란함
        </div>

        <CapsuleJarImg isFilled={isFilled} />

        <FilledBtn onClick={handleRegisterClick} className="text-s px-10 mt-5">
          등록하기
        </FilledBtn>
      </div>

      <div className="px-8 bg-black text-white flex items-center text-[10px] font-['NanumSquare Neo'] whitespace-nowrap">
        <img src={cancel} alt="cancel" className="mr-1" />
        <p>비방, 욕설 등 부적절한 글은 작성이 제한되며, 삭제될 수 있습니다.</p>
      </div>

      {/* 등록된 타임캡슐이 없을 경우 문구 표시 */}
      {(publicCapsules.length === 0 && myCapsules.length === 0) ? (
        <p className="text-[#00ff00] mt-10 text-xs text-center">
          아직 공개적으로 등록된 타임캡슐이 없습니다.
        </p>
      ) : (
        <CapsuleComment
          publicCapsules={publicCapsules}
          myCapsules={myCapsules}
          fetchCapsules={fetchCapsules}
        />
      )}
      

      {/* 로그인 모달 */}
      <SignInModal
        isOpen={activeModal === "signIn"}
        setIsOpen={() => setActiveModal(null)}
      />

      {/* 타임캡슐 모달 */}
      <TimeCapsuleModal
        isOpen={activeModal === "timeCapsule"}
        setIsOpen={() => setActiveModal(null)}
        onSendComplete={handleSendComplete}
      />

      {/* 타임캡슐 전송 완료 모달 */}
      <SendCompleteModal
        isOpen={activeModal === "sendComplete"}
        setIsOpen={() => setActiveModal(null)}
        onConfirm = {handleImgChange}
      />
    </div>
  );
}
