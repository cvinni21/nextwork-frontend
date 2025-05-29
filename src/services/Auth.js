import axios from "axios";
import API_URL from "@/lib/apiKey";

export async function refreshAccessToken(refreshToken) {
    console.log('🔁 Tentando renovar token com:', refreshToken)

    try {
        const response = await axios.post(
            `${API_URL}token/refresh/`,
            { refresh: refreshToken, },
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('Token renewal response:', response.data)

        return {
            access: response.data.access,
            refresh: response.data.refresh || refreshToken
        };
    } catch (error) {
        console.error('❌ Falha ao renovar token', error);
        throw error;
    }
}