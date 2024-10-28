import { useState, useEffect } from "react";
import jar_empty from "@/../public/images/timecapsule-jar/jar_empty.png";
import twinkle from "@/../public/images/timecapsule-jar/twinkle.png";
import after_twinkle from "@/../public/images/timecapsule-jar/after_twinkle.png";

interface CapsuleJarImgProps {
  isFilled: boolean; // 이미지 변경을 위한 상태
}

const CapsuleJarImg: React.FC<CapsuleJarImgProps> = ({ isFilled }) => {
  const [twinkleOpacity, setTwinkleOpacity] = useState(0); // twinkle 투명도
  const [afterTwinkleOpacity, setAfterTwinkleOpacity] = useState(0); // after_twinkle 투명도

  useEffect(() => {
    let twinkleTimeout: ReturnType<typeof setTimeout>;
    let afterTwinkleTimeout: ReturnType<typeof setTimeout>;

    if (isFilled) {
      // twinkle 이미지가 0.5초 동안 투명도가 0 -> 1로 변경
      setTwinkleOpacity(0);
      setAfterTwinkleOpacity(0);
      setTwinkleOpacity(1);

      twinkleTimeout = setTimeout(() => {
        // twinkle 이미지가 0.5초 동안 점점 사라지고, after_twinkle 이미지는 나타남
        setTwinkleOpacity(0);
        setAfterTwinkleOpacity(1);
      }, 500); // 0.5초 후에 after_twinkle 이미지 나타남
    } else {
      // 초기 상태로 돌아감
      setTwinkleOpacity(0);
      setAfterTwinkleOpacity(0);
    }

    return () => {
      clearTimeout(twinkleTimeout);
      clearTimeout(afterTwinkleTimeout);
    };
  }, [isFilled]);

  return (
    <div className="relative w-[70%] max-w-[600px] mt-10">
      {/* jar_empty는 항상 보여야 함 */}
      <img src={jar_empty} alt="Empty Capsule Jar" className="w-full h-full" />

      {/* twinkle 이미지 */}
      <img
        src={twinkle}
        alt="Twinkle Effect"
        className="absolute top-0 left-0 w-full h-full"
        style={{
          opacity: twinkleOpacity,
          transition: "opacity 0.5s ease", // 0.5초 동안 투명도 애니메이션
        }}
      />

      {/* after_twinkle 이미지 */}
      <img
        src={after_twinkle}
        alt="After Twinkle"
        className="absolute top-0 left-0 w-full h-full"
        style={{
          opacity: afterTwinkleOpacity,
          transition: "opacity 0.5s ease", // 0.5초 동안 투명도 애니메이션
        }}
      />
    </div>
  );
};

export default CapsuleJarImg;
