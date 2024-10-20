import { api } from '@/utils/customAxios';

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6ImFkbWluIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyOTI3MjE1MSwiZXhwIjoxNzI5ODc2OTUxfQ.TTVtY67gKeB0CnUuqKO74BD5jzxpgCTuvi1TMGelXsM';

//콘텐츠 등록 api
export async function postContents(formdata: any) {
  const result = await api.post('/admins/contents', formdata, {
    headers: { 'Content-Type': 'multipart/form-data', Authorization: token },
  });
  return result;
}
