import { api } from '@/utils/customAxios';

export async function getZones(index: string) {
  let location = '';
  if (index === '1') location = 'backgate-street';
  if (index === '2') location = '518-square';
  if (index === '3') location = 'stadium';
  const result = await api.get(`zones?location=${location}`);

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
