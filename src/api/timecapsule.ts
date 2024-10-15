import { api } from "@/utils/customAxios";

// 타임캡슐 생성 함수 (localStorage에 저장)
export const createTimeCapsule = async (
  mailAddress: string,
  content: string,
  isPublic: boolean,
  images: File[]
) => {
  // token에서 userId와 nickname을 가져옴
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const userId = token.userId;
  const nickname = token.nickname;

  if (!userId || !nickname) {
    console.error(
      "Error: token에 userId 또는 nickname이 없습니다. 로그인 여부를 확인하세요."
    );
    return;
  }

  // 백엔드 연결 후 주석 해제
  /*
  const formData = new FormData();
  try {
    const response = await api.post("/api/v1/timecapsules", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("타임캡슐 생성 중 오류 발생:", error);
    throw error;
  }
  */

  // localStorage에 저장하는 방식 (백엔드 연결 전)
  const currentTimeCapsules = JSON.parse(
    localStorage.getItem("timecapsules") || "[]"
  );

  const newCapsule = {
    id: currentTimeCapsules.length + 1, // 고유 ID
    mailAddress,
    nickname,
    content,
    isPublic,
    userId,
    images: images.map((image) => URL.createObjectURL(image)),
    created_at: new Date().toISOString(),
  };

  currentTimeCapsules.push(newCapsule);
  localStorage.setItem("timecapsules", JSON.stringify(currentTimeCapsules));

  console.log("타임캡슐 생성", newCapsule);
  return {
    success: true,
    data: newCapsule,
  };
};

// 타임캡슐 공개글 조회 함수 (localStorage에서 가져오기)
export const getPublicTimeCapsules = async () => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  const userId = token.userId;

  if (!userId) {
    console.error(
      "Error: token에 userId가 없습니다. 로그인 여부를 확인하세요."
    );
    return;
  }

  // 백엔드 연결 시 사용
  /*
  try {
    const response = await api.get("/api/v1/timecapsules");
    return response.data;
  } catch (error) {
    console.error("타임캡슐 조회 중 오류 발생:", error);
    throw error;
  }
  */

  // localStorage에서 타임캡슐을 가져옴
  const currentTimeCapsules = JSON.parse(
    localStorage.getItem("timecapsules") || "[]"
  );

   // 공개된 타임캡슐만 필터링
   const publicTimecapsules = currentTimeCapsules.filter(
    (capsule: any) => capsule.isPublic
  );


  console.log("타임캡슐 조회 중", currentTimeCapsules);
  return {
    success: true,
    publicTimecapsules,
  };
};

// 타임캡슐 삭제 함수 (localStorage에서 삭제)
export const deleteTimeCapsule = async (timeCapsuleId: number) => {
  // 백엔드 연결 시 사용
  /*
  try {
    const response = await api.delete(`/api/v1/timecapsules/${timeCapsuleId}`);
    return response.data;
  } catch (error) {
    console.error("타임캡슐 삭제 중 오류 발생:", error);
    throw error;
  }
  */

  // localStorage에서 타임캡슐 삭제
  const currentTimeCapsules = JSON.parse(
    localStorage.getItem("timecapsules") || "[]"
  );
  const updatedCapsules = currentTimeCapsules.filter(
    (capsule: any) => capsule.id !== timeCapsuleId
  );

  localStorage.setItem("timecapsules", JSON.stringify(updatedCapsules));

  console.log(`타임캡슐 삭제 ID: ${timeCapsuleId}`);
  return {
    success: true,
  };
};
