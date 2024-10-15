import { api } from '@/utils/customAxios';

// type Feedback = {
//   title: string;
//   category: string;
//   detail: string;
//   //   image?: Blob;
//   //   user_id?: number;
// };

export default async function postFeedback(formdata: any) {
  console.log(1);
  const result = await api.post('feedbacks', formdata, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result;
}
