import { api } from '@/utils/customAxios';

//콘텐츠 등록 api
export async function postContents(formdata: any) {
  const result = await api.post('/admins/contents', formdata, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result;
}

//콘텐츠 삭제 api
export async function deleteContents(contentId: any) {
  const result = await api.delete(`/admins/contents/${contentId}`);
  return result;
}
