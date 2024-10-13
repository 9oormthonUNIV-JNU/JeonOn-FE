import { api } from '@/utils/customAxios';

export async function favoritesBooths() {
  const result = await api.get('users/bookmarks/booths');
  return result;
}

export async function favoritesNoti() {
  const result = await api.get('users/bookmarks/notifications');
  return result;
}

export async function favoritesPartners() {
  const result = await api.get('users/bookmarks/partners');
  return result;
}
