export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface UserStats {
    userId: number;
    activityScore: number;
    completionRate: number;
    taskCount: number;
    lastActive: string;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
}

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
    theme: ThemeMode;
    toggleTheme: () => void;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface UserSearchParams {
    search?: string;
    sortBy?: keyof User;
    sortOrder?: 'asc' | 'desc';
    company?: string;
    city?: string;
}

export interface ChartData {
    name: string;
    value: number;
}

export interface UserActivityData {
    name: string;
    tasks: number;
    completion: number;
}