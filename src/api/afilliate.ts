import { api } from "@/utils/customAxios";

type AffiliateData = {
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    images?: File[];
}

export async function postAffiliate(data: AffiliateData) {
    try {
        const formData = new FormData();

        const requestBlob = new Blob(
            [JSON.stringify({
              name: data.name,
              location: data.location,
              start_date: data.start_date,
              end_date: data.end_date,
              description: data.description,
            })],
            { type: "application/json" }
          );
          formData.append("request", requestBlob);

          data.images.forEach((image) => {
            formData.append("images", image); 
          });

        const result = await api.post("admins/partners", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        return result;
    } catch (error) {
        // 에러
    }
}

export async function deleteAffiliate(affiliateId: number) {
    const result = await api.delete(`admins/partners/${affiliateId}`)
    return result;
}