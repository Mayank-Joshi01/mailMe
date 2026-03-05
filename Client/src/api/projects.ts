import API from './axiosInstance';


export const CreateProject = async (name: string, description: string, allowedDomain: string) => {
    try {
        const response = await API.post('/projects', { name, description, allowedDomain });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const FetchProjects = async () => {
    try {
        const response = await API.get('/projects');
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const DeleteProject = async (projectId: string) => {
    try {
        const response = await API.delete(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const UpdateProject = async (projectId: string, name: string, description: string, allowedDomain: string, status: string) => {
    try {
        const response = await API.put(`/projects/${projectId}`, { name, description, allowedDomain, status });
        return response.data;
    } catch (error) {
        throw error;
    }
};


