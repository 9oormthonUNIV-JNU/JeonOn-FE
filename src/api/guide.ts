import { api } from '@/utils/customAxios';

export async function getNofifications() {
  const result = await api.get('notifications/?category={notice}');
  return result;
}

export async function getPartners() {
  const result = await api.get('partners');
  return result;
}
