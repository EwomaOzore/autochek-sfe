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

const filterUsers = (users: User[], params?: UserSearchParams): User[] => {
    if (!params) return users;
    
    let filteredUsers = [...users];
    
    if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm) || 
            user.username.toLowerCase().includes(searchTerm)
        );
    }
    
    if (params.company) {
        filteredUsers = filteredUsers.filter(user => 
            user.company.name === params.company
        );
    }
    
    if (params.city) {
        filteredUsers = filteredUsers.filter(user => 
            user.address.city === params.city
        );
    }
    
    if (params.sortBy) {
        filteredUsers.sort((a, b) => {
            const aValue = a[params.sortBy as keyof User];
            const bValue = b[params.sortBy as keyof User];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return params.sortOrder === 'asc' 
                    ? aValue.localeCompare(bValue) 
                    : bValue.localeCompare(aValue);
            }
            
            return 0;
        });
    }
    
    return filteredUsers;
};

export const UserService = {
    getUsers: async (params?: PaginationParams & UserSearchParams): Promise<User[]> => {
        const response: AxiosResponse<User[]> = await apiClient.get('/users');
        let users = response.data;
        
        users = filterUsers(users, params);
        
        if (params?.page && params?.limit) {
            const startIndex = (params.page - 1) * params.limit;
            const endIndex = startIndex + params.limit;
            users = users.slice(startIndex, endIndex);
        }
        
        return users;
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