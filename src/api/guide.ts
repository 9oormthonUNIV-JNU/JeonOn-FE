import { api } from '@/utils/customAxios';

export async function getNofifications() {
  const result = await api.get('notifications/?category={notice}');
  return result;
}

export async function getPartners() {
  const result = await api.get('partners');
  return result;
}

export async function partnersBookmark(partnerId: number) {
  const result = await api.post(`bookmarks/partners/${partnerId}`);
  return result;
}

export async function partnersBookmarkCancel(partnerId: number) {
  const result = await api.delete(`bookmarks/partners/${partnerId}`);
  return result;
}
