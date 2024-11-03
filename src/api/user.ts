import { api } from '@/utils/customAxios';
import { getAuthToken } from '@/utils/tokenHandler';

export async function getProfile() {
  const token = getAuthToken();
  const res = await api.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}

export async function getPartnersBookmark() {
  const res = await api.get('/users/bookmarks/partners');
  return res.data.data;
}
export async function getContentsBookmark() {
  const res = await api.get('/users/bookmarks/contents');

  return res.data.data;
}

export async function getBoothsBookmark() {
  const token = getAuthToken();
  const res = await api.get('/users/bookmarks/booths', {
    headers: {
      Authorization: `Bearer ${token}`, // Bearer 토큰을 헤더에 추가
    },
  });

  console.log(res);
  return res.data.data;
}
