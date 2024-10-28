import { useState, useEffect } from "react";
import { getMyTimeCapsules } from "@/api/timecapsule";
import jar_empty from "@/../public/images/timecapsule-jar/jar_empty.png";
import jar1_normal from "@/../public/images/timecapsule-jar/jar1_normal.png";
import jar1_effect from "@/../public/images/timecapsule-jar/jar1_effect.png";
import jar2_normal from "@/../public/images/timecapsule-jar/jar2_normal.png";
import jar2_effect from "@/../public/images/timecapsule-jar/jar2_effect.png";
import jar3_normal from "@/../public/images/timecapsule-jar/jar3_normal.png";
import jar3_effect from "@/../public/images/timecapsule-jar/jar3_effect.png";
import jar_full from "@/../public/images/timecapsule-jar/jar_full.png";
import jar_full_effect from "@/../public/images/timecapsule-jar/jar_full_effect.png";

interface CapsuleJarImgProps {
  isFilled: boolean;
}

const CapsuleJarImg: React.FC<CapsuleJarImgProps> = ({ isFilled }) => {
  const [effectOpacity, setEffectOpacity] = useState(0);
  const [jarState, setJarState] = useState("jar_empty");
  const [currentEffect, setCurrentEffect] = useState("");
  const [isEffectRunning, setIsEffectRunning] = useState(false);

  // 시간대에 맞게 병 상태 설정
  const determineJarState = async () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const myCapsules = await getMyTimeCapsules();

    if (day === 5 && hours < 12 && myCapsules.length > 0) {
      return "jar1_normal";
    }
    if (day === 5 && hours < 12) {
      return "jar_empty";
    } else if (day === 5 && hours >= 12) {
      return "jar1_normal";
    } else if (day === 6) {
      return "jar2_normal";
    } else if (day === 7 && hours < 12) {
      return "jar3_normal";
    } else if (day === 7 && hours >= 12) {
      return "jar_full";
    } else {
      return "jar_empty";
    }
  };

  useEffect(() => {
    const updateJarState = async () => {
      const state = await determineJarState();
      setJarState(state);
    };
    updateJarState();
  }, []);

  const getEffectImage = () => {
    switch (jarState) {
      case "jar1_normal":
        return jar1_effect;
      case "jar2_normal":
        return jar2_effect;
      case "jar3_normal":
        return jar3_effect;
      case "jar_full":
        return jar_full_effect;
      case "jar_empty":
        return jar1_effect;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (jarState === "jar_empty" && isFilled) {
      setJarState("jar1_normal");
    }

    if (isFilled && !isEffectRunning) {
      const effectImage = getEffectImage();

      if (effectImage) {
        setIsEffectRunning(true);
        setCurrentEffect(effectImage);
        setEffectOpacity(0);

        setTimeout(() => {
          setEffectOpacity(1);

          setTimeout(() => {
            setEffectOpacity(0);

            setTimeout(() => {
              setCurrentEffect("");
              setIsEffectRunning(false);
            }, 500);
          }, 500);
        }, 200);
      }
    }
  }, [isFilled]);

  const getJarImage = () => {
    switch (jarState) {
      case "jar1_normal":
        return jar1_normal;
      case "jar2_normal":
        return jar2_normal;
      case "jar3_normal":
        return jar3_normal;
      case "jar_full":
        return jar_full;
      default:
        return jar_empty;
    }
  };

  return (
    <div className="relative w-[70%] max-w-[600px] mt-10">
      {/* 병 상태에 따른 기본 이미지 */}
      <img src={getJarImage()} alt="Capsule Jar" className="w-full h-full" />

      {/* 이펙트 이미지: 반짝임 구현 */}
      {currentEffect && (
        <img
          src={currentEffect}
          alt="Effect Image"
          className="absolute top-0 left-0 w-full h-full"
          style={{
            opacity: effectOpacity,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      )}
    </div>
  );
};

export default CapsuleJarImg;
