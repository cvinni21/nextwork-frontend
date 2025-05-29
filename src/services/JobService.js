import api from "@/lib/axiosInstance";

export const fetchJobs = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.search?.trim()) params.set('search', filters.search.trim());
    if (filters.local?.trim()) params.set('local', filters.local.trim());

    const query = params.toString();
    const url = query ? `jobs/?${query}` : 'jobs/';

    const response = await api.get(url);
    return response.data;
}

export const createJob = async (jobData) => {
    const response = await api.post('jobs/', jobData);
    return response.data;
}