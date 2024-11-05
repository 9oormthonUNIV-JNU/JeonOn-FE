import { api } from "@/utils/customAxios";
import { isLoggedIn } from "./login";

// 타임캡슐 생성 함수
export async function createTimeCapsule(
  mail_address: string,
  content: string,
  is_public: boolean,
  images: File[]
) {
  try {
    const formData = new FormData();
    const requestBlob = new Blob(
      [
        JSON.stringify({
          mail_address,
          content,
          is_public,
          images,
        }),
      ],
      { type: "application/json" }
    );
    formData.append("request", requestBlob);

    images.forEach((image) => {
      formData.append("images", image);
    });

    const result = await api.post("timecapsules", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  } catch (error) {
    console.error("create timecapsule failed: ", error);
    throw error;
  }
}

// 타임캡슐 공개글 조회 함수
export async function getPublicTimeCapsules() {
  try {
    const response = await api.get("timecapsules");
    return response.data.data.timecapsules;
  } catch (error) {
    console.error("타임캡슐 조회 중 오류 발생:", error);
    throw error;
  }
}

export async function getMyTimeCapsules() {
  try {
    const response = await api.get("timecapsules");
    return response.data.data.my_timecapsules;
  } catch (error) {
    console.error("타임캡슐 조회 중 오류 발생:", error);
    throw error;
  }
}

// 타임캡슐 삭제 함수
export async function deleteMyCapsule(timeCapsuleId: number) {
  try {
    const response = await api.delete(`timecapsules/${timeCapsuleId}`);
    return response.data;
  } catch (error) {
    console.error("타임캡슐 삭제 중 오류 발생:", error);
    throw error;
  }
}
