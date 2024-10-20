import { api } from "@/utils/customAxios";

type MapData = {
    location: string;
    name: string;
    description: string;
}

export default async function postMap(data: MapData) {
    try {
        const formData = new FormData();

        const requestBlob = new Blob([JSON.stringify(data)], { type: "application/json" });
        formData.append("request", requestBlob);

        const result = await api.post("/admins/zones", formData,
           { headers: { 'Content-Type': 'multipart/form-data' }},
        );   

        console.log("Affiliate registered: ", result);
        return result;
        } catch (error) {
        console.error("Map registeration failed: ", error);
        throw error;
        }
}