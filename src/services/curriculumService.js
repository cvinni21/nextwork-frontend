import axios from "axios";
import API_URL from "@/lib/apiKey";
import BACKEND_BASE_URL from "@/lib/backBaseUrl";
import api from "@/lib/axiosInstance";

export async function fetchCurriculum(token) {
    const response = await api.get(`users/me/curriculum/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const url = response.data.curriculum;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }
    return BACKEND_BASE_URL + url;
}

export async function uploadCurriculum(userId, token, file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.put(`${API_URL}users/${userId}/curriculum/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}

export async function deleteCurriculum(userId, token) {
    const response = await axios.delete(`${API_URL}users/${userId}/curriculum/`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    return response.data;
}
