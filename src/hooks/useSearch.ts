import { useState, useEffect } from 'react';
import { UserSearchParams, User } from '../types';
import { useDebounce } from './useDebounce';

export const useSearch = (initialParams: UserSearchParams = {}) => {
    const [searchParams, setSearchParams] = useState<UserSearchParams>(initialParams);
    const debouncedSearch = useDebounce(searchParams.search ?? '', 300);

    useEffect(() => {
        const url = new URL(window.location.href);

        url.searchParams.delete('search');
        url.searchParams.delete('sortBy');
        url.searchParams.delete('sortOrder');
        url.searchParams.delete('company');
        url.searchParams.delete('city');

        if (searchParams.search) url.searchParams.set('search', searchParams.search);
        if (searchParams.sortBy) url.searchParams.set('sortBy', searchParams.sortBy);
        if (searchParams.sortOrder) url.searchParams.set('sortOrder', searchParams.sortOrder);
        if (searchParams.company) url.searchParams.set('company', searchParams.company);
        if (searchParams.city) url.searchParams.set('city', searchParams.city);

        window.history.replaceState({}, '', url.toString());
    }, [debouncedSearch, searchParams.sortBy, searchParams.sortOrder, searchParams.company, searchParams.city]);

    const setSearch = (search: string) => {
        setSearchParams((prev) => ({ ...prev, search }));
    };

    const setSort = (sortBy: keyof User, sortOrder: 'asc' | 'desc' = 'asc') => {
        setSearchParams((prev) => ({ ...prev, sortBy, sortOrder }));
    };

    const setCompanyFilter = (company: string) => {
        setSearchParams((prev) => ({ ...prev, company }));
    };

    const setCityFilter = (city: string) => {
        setSearchParams((prev) => ({ ...prev, city }));
    };

    const resetFilters = () => {
        setSearchParams({});
    };

    return {
        searchParams,
        debouncedSearch,
        setSearch,
        setSort,
        setCompanyFilter,
        setCityFilter,
        resetFilters,
    };
};