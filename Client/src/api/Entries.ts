import API from './axiosInstance';


export const GetEntries = async (projectId: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await API.post(`/entries/get/${projectId}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error;
    }   
};