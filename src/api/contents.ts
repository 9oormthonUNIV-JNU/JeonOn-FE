import { api } from '@/utils/customAxios';

export async function getContents() {
  const result = await api.get('contents');

  return result.data.data;
}

export async function getContentsDetail(contentId: any) {
  const result = await api.get(`contents/${contentId}`);

  return result.data.data;
}

export async function contentsBookmark(contentId: any) {
  const result = await api.post(`bookmarks/contents/${contentId}`);
  return result;
}

export async function contentsBookmarkCancel(contentId: any) {
  const result = await api.delete(`bookmarks/contents/${contentId}`);
  return result;
}
