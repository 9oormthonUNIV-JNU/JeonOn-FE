import { api } from "@/utils/customAxios";

type AffiliateData = {
    name: string;
    location: string;
    start_date: string;
    end_date: string;
    description: string;
    images?: File[];
}

export default async function postAffiliate(data: AffiliateData) {
    try {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('description', data.description);

        data.images?.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        const response = await api.post("/admin/partners", formData, {
            headers: {"Content-Type": "multipart/form-data"},
        });

        console.log("Affiliate registered: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Affilliate registeration failed: ", error);
        throw error;
    }
}