import { api } from "@/utils/customAxios";

type MapData = {
    location: string;
    name: string;
    description: string;
}

export async function postMap(data: MapData) {
    try {
        const jsonData = JSON.stringify(data);
        const result = await api.post("admins/zones", jsonData);   
        return result;
        } catch (error) {
        // 에러
        }
}

export async function deleteMap(mapId: number) {
    const result = await api.delete(`admins/zones/${mapId}`);
    return result;
}
