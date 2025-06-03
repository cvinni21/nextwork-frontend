import api from "@/lib/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "./userService";

export const login = async (credentials, setUser, setAccessToken, setRefreshToken) => {
    const response = await api.post('token/', credentials);

    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const user = await getUserProfile(accessToken);
    setUser(user);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    return { access: accessToken, refresh: refreshToken };
};

export const register = async (formData) => {
    const data = new FormData();

    for (const key in formData) {
        const value = formData[key];
        if (
            (key === 'profile_photo' || key === 'curriculum') &&
            (!value || typeof value === 'string')
        ) {
            continue;
        }
        data.append(key, formData[key]);
    }

    const response = await api.post('register/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};
