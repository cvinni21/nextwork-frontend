import axios from "axios";
import API_URL from "./apiKey";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: API_URL,
});

function isTokenExpired(token) {
    if (!token) return true;
    try {
        const { exp } = jwtDecode(token);
        const now = Date.now() / 1000;
        return exp < now;
    } catch {
        return true;
    }
}

api.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if(isTokenExpired(token) && refreshToken) {
        try{
            const refreshResponse = await axios.post(`${API_URL}token/refresh/`, {
                refresh: refreshToken,
            });

            token = refreshResponse.data.access;
            localStorage.setItem('accessToken', token);
        } catch (err) {
            console.error('❌ Falha ao renovar token:', err);
            localStorage.clear();
            window.location.href = '/login';
            return Promise.reject(err);
        }
    }

    if (token && !isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;