import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { User, UserSearchParams, PaginationParams, UserStats } from '../types';

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network Error:', error.request);
        } else {
            console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const UserService = {
    getUsers: async (params?: PaginationParams & UserSearchParams): Promise<User[]> => {
        const config: AxiosRequestConfig = {};
        if (params) {
            config.params = params;
        }
        const response: AxiosResponse<User[]> = await apiClient.get('/users', config);
        return response.data;
    },

    getUserById: async (id: number): Promise<User> => {
        const response: AxiosResponse<User> = await apiClient.get(`/users/${id}`);
        return response.data;
    },

    getUserPosts: async (userId: number): Promise<any[]> => {
        const response: AxiosResponse<any[]> = await apiClient.get(`/posts`, {
            params: { userId }
        });
        return response.data;
    },

    getUserTodos: async (userId: number): Promise<any[]> => {
        const response: AxiosResponse<any[]> = await apiClient.get(`/todos`, {
            params: { userId }
        });
        return response.data;
    },

    getUserStats: async (userId: number): Promise<UserStats> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const getRandomValue = (min: number, max: number, seed: number): number => {
            const x = Math.sin(seed) * 10000;
            const rand = x - Math.floor(x);
            return Math.floor(rand * (max - min + 1) + min);
        };

        return {
            userId,
            activityScore: getRandomValue(50, 100, userId),
            completionRate: getRandomValue(30, 100, userId + 1) / 100,
            taskCount: getRandomValue(5, 30, userId + 2),
            lastActive: new Date(Date.now() - getRandomValue(0, 604800000, userId + 3)).toISOString(),
        };
    },

    getAllUserStats: async (): Promise<UserStats[]> => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const stats: UserStats[] = [];
        for (let i = 1; i <= 10; i++) {
            stats.push(await UserService.getUserStats(i));
        }

        return stats;
    }
};

export default apiClient;