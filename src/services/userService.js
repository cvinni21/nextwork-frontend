import api from "@/lib/axiosInstance";

export const getUserProfile = async (token) => {
    const response = await api.get(`users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const uploadProfilePhoto = async (formData, token) => {
    const response = await api.put('users/me/', formData, {
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data',
        },
    });
    console.log('Resposta do servidor ao atualizar foto de perfil:', response.data);
    return response.data;
}

export const changePassword = async (data) => {
    const response = await api.post('users/change-password/', data);
    return response.data;
};