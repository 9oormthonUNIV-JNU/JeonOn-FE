import { api } from "@/utils/customAxios";

type MapData = {
    location: string;
    name: string;
    description: string;
}

export default async function postMap(data: MapData) {
    try {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('description', data.description);

        const response = await api.post("/api/v1/admin/map", formData);       
        console.log("Affiliate registered: ", response.data);
        return response.data;
        } catch (error) {
        console.error("Map registeration failed: ", error);
        throw error;
        }
}