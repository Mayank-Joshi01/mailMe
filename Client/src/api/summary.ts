import API from './axiosInstance';

// Define types for your Summary Model
export interface UserSummary {
  totalProjects: number;
  totalEntries: number;
  activeProjects: number;
}

export const getUserSummary = async (): Promise<UserSummary> => {
  try {
    const response = await API.get('/summary/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

