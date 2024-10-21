import { api } from "@/utils/customAxios";

export async function boothsList(queryString: string = "") {
  const result = await api.get(`booths${queryString}`);
  return result;
}

export async function boothDetail(boothId: number) {
  const result = await api.get(`booths/${boothId}`);
  return result;
}

export async function boothComments(boothId: number){
  const result = await api.get(`booths/${boothId}/comments`);
  return result;
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
