import { api } from '@/utils/customAxios';

// type Feedback = {
//   title: string;
//   category: string;
//   detail: string;
//   //   image?: Blob;
//   //   user_id?: number;
// };

export default async function postFeedback(formData: FormData) {
  const result = await api.post('feedbacks', formData);
  return result.data;
}
