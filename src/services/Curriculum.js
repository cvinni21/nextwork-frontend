import axios from "axios";
import API_URL from "@/lib/apiKey";
import { isTokenExpired } from "@/utils/tokenUtils";
import { refreshAccessToken } from "./Auth";

export async function uploadCurriculumWithAuth(userId, accessToken, refreshToken, file, setAccessToken) {

    console.log('➡️ Enviando refreshToken:', refreshToken);

    if (isTokenExpired(accessToken)) {
        try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            setAccessToken(newAccessToken);
            accessToken = newAccessToken;
        } catch (e) {
            throw new Error('Sua sessão expirou. Faça login novamente.')
        }
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(`${API_URL}users/${userId}/curriculum/`, formData, {
        headers: {
            'Content-Type' : 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    
    return response.data
}