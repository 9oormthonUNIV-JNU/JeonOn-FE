import { api } from "@/utils/customAxios";

type FeedbackIdType = number;

export async function getFeedbackList(categoryQuery: string = "") {
  const result = await api.get(`/api/v1/admins/feedbacks?category=${categoryQuery}`);
  
  return result.data.data.feedbacks;
}

export async function getFeedbackDetail(feedbackId: FeedbackIdType) {
  const result = await api.get(`/api/v1/admins/feedbacks/${feedbackId}`);
  
  return result.data.data; 
}
