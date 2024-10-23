import { api } from "@/utils/customAxios";

export async function boothsList(queryString: string = "") {
  const result = await api.get(`booths${queryString}`);
  return result.data;
}

export async function boothDetail(boothId: number) {
  const result = await api.get(`booths/${boothId}`);
  return result.data;
}

export async function boothComments(boothId: number) {
  const result = await api.get(`booths/${boothId}/comments`);
  return result.data;
}

export async function addBoothComment(boothId: number, content: string) {
  try {
    const requestBody = {
      content: content,
    };
    const result = await api.post(`/booths/${boothId}/comments`, requestBody);
    return result;
  } catch (error) {
    console.error("Error adding comment:", error);

    // 요청 실패 시의 response body 구조
    return {
      success: false,
      data: null,
      error: error.message || "Unknown error occurred",
    };
  }
}

export async function deleteComment(boothId: number, commentId: number) {
  try {
    const result = await api.delete(`booths/${boothId}/comments/${commentId}`);
    return result;
  } catch (error: any) {
    console.error("댓글을 삭제할 수 없습니다 : ", error);
  }
}

export async function searchBooth(keyword: string) {
  try {
    const result = await api.get(
      `/booths/search?keyword=${encodeURIComponent(keyword)}`
    );
    return result.data;
  } catch (error) {
    console.error("Error searching booths:", error);
    return null;
  }
}

export async function popularBooth() {
  const result = await api.get("booths/ranks");
  return result.data;
}

export async function likeBooth(boothId: number) {
  try {
    const result = await api.post(`/booths/${boothId}/likes`);
    return result.data;
  } catch (error) {
    console.error("Error adding comment:", error);
  }
}

export async function cancelLikeBooth(boothId: number) {
  try {
    const result = await api.delete(`booths/${boothId}/likes`);
    return result.data;
  } catch (error: any) {
    console.error("댓글을 삭제할 수 없습니다 : ", error);
  }
}

export async function favoritesBooths() {
  const result = await api.get("users/bookmarks/booths");
  return result;
}

export async function favoritesNoti() {
  const result = await api.get("users/bookmarks/notifications");
  return result;
}

export async function favoritesPartners() {
  const result = await api.get("users/bookmarks/partners");
  return result;
}
