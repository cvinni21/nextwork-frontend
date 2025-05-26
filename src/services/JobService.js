import api from "@/lib/api";

export const fetchJobs = async () => {
    const response = await api.get('jobs/')
    return response.data
}

export const createJob = async (jobData, config = {}) => {
    const response = await api.post('jobs/', jobData, config)
    return response.data
}