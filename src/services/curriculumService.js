import axios from "axios";
import API_URL from "@/lib/apiKey";
import BACKEND_BASE_URL from "@/lib/backBaseUrl";
import api from "@/lib/axiosInstance";

export async function fetchCurriculum() {
    try {
        const response = await api.get(`users/me/curriculum/`);
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

export async function uploadCurriculum(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.put('users/me/curriculum/', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export async function deleteCurriculum() {
    const response = await api.delete('users/me/curriculum/');
    return response.data;
}

export async function createFullCurriculum(curriculoData) {
    const response = await api.post('users/me/curriculum/create/', curriculoData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.data;
}

export async function setUserCurriculum(data) {
    const response = await fetch("/api/curriculo/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Erro ao definir o currículo do usuário");
    }

    return response.json();
}

export async function generateCurriculumPDF() {
    try {
        const response = await api.get(`users/me/curriculum/pdf/`, {
            responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    } catch (error) {
        console.error('Erro ao gerar currículo PDF:', error);
        throw error;
    }
}
