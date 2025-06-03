import axios from "axios";
import API_URL from "@/lib/apiKey";
import BACKEND_BASE_URL from "@/lib/backBaseUrl";
import api from "@/lib/axiosInstance";

export async function fetchCurriculum(token) {
    try {
        const response = await api.get(`users/me/curriculum/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const url = response.data.curriculum;

        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        return BACKEND_BASE_URL + url;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export async function uploadCurriculum(token, file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(`${API_URL}users/me/curriculum/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}

export async function deleteCurriculum(userId, token) {
    const response = await axios.delete(`${API_URL}users/me/curriculum/`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}

export async function createFullCurriculum(curriculoData, accessToken) {
    const response = await axios.post(`${API_URL}users/me/curriculum/create/`, curriculoData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export async function setUserCurriculum(data, token) {
    const response = await fetch('/api/curriculo/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao definir o currículo do usuário');
    }

    return response.json();
}
