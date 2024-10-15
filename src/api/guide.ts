import { api } from '@/utils/customAxios';

export async function getZones() {
  const result = await api.get('zones');

  return result.data;
}

export async function getPartners() {
  const result = await api.get('partners');

  return result.data;
}

export async function getPartnerDetail(partnerId: any) {
  const result = await api.get(`partners/${partnerId}`);
  return result;
}

export async function partnersBookmark(partnerId: number) {
  const result = await api.post(`bookmarks/partners/${partnerId}`);
  return result.data;
}

export async function partnersBookmarkCancel(partnerId: number) {
  const result = await api.delete(`bookmarks/partners/${partnerId}`);
  return result;
}
