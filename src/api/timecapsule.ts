import { api } from "@/utils/customAxios";
import { isLoggedIn } from "./login";

// 타임캡슐 생성 함수 (localStorage에 저장)
export async function createTimeCapsule(
  mailAddress: string,
  content: string,
  isPublic: boolean,
  images: File[]
) {
  try {
    const formData = new FormData();
    const requestBlob = new Blob(
      [
        JSON.stringify({
          mailAddress,
          content,
          isPublic,
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

    console.log("create new TimeCapsule: ", result);
    return result;
  } catch (error) {
    console.error("create timecapsule failed: ", error);
    throw error;
  }
}

// 타임캡슐 공개글 조회 함수
export const getPublicTimeCapsules = async () => {
  try {
    const response = await api.get("timecapsules");
    return response.data;
  } catch (error) {
    console.error("타임캡슐 조회 중 오류 발생:", error);
    throw error;
  }
};

// 타임캡슐 삭제 함수
export const deleteTimeCapsule = async (timeCapsuleId: number) => {
  try {
    const response = await api.delete(`timecapsules/${timeCapsuleId}`);
    return response.data;
  } catch (error) {
    console.error("타임캡슐 삭제 중 오류 발생:", error);
    throw error;
  }
};
