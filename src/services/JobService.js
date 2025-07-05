import api from "@/lib/axiosInstance";

export const fetchJobs = async (filters = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
            params.set(key, val)
        }
    })

    const query = params.toString();
    const url = query ? `jobs/?${query}` : 'jobs/';

    const response = await api.get(url);

    return { data: response.data, total: response.data.length };
}

export const createJob = async (jobData) => {
    const response = await api.post('jobs/', jobData);
    return response.data;
}