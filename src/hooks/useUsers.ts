import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../services/api';
import { PaginationParams, User, UserSearchParams, UserStats } from '../types';

export const useUsers = (params: PaginationParams & UserSearchParams = { page: 1, limit: 10 }) => {
  return useQuery<User[], Error>({
    queryKey: ['users', params],
    queryFn: () => UserService.getUsers(params)
  });
};

export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => UserService.getUserById(id),
    enabled: !!id 
  });
};

export const useUserPosts = (userId: number) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => UserService.getUserPosts(userId),
    enabled: !!userId
  });
};

export const useUserTodos = (userId: number) => {
  return useQuery({
    queryKey: ['userTodos', userId],
    queryFn: () => UserService.getUserTodos(userId),
    enabled: !!userId
  });
};

export const useUserStats = (userId: number) => {
  return useQuery<UserStats, Error>({
    queryKey: ['userStats', userId],
    queryFn: () => UserService.getUserStats(userId),
    enabled: !!userId
  });
};

export const useAllUserStats = () => {
  return useQuery<UserStats[], Error>({
    queryKey: ['allUserStats'],
    queryFn: () => UserService.getAllUserStats(),
    staleTime: 5 * 60 * 1000, 
  });
};

export const usePrefetchUser = () => {
  const queryClient = useQueryClient();
  
  return (userId: number) => {
    queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => UserService.getUserById(userId)
    });
    
    queryClient.prefetchQuery({
      queryKey: ['userStats', userId],
      queryFn: () => UserService.getUserStats(userId)
    });
  };
};