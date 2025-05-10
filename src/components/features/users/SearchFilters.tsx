import React, { useEffect, useState } from "react";
import { User, UserSearchParams } from "../../../types";

interface SearchFiltersProps {
  onSearch: (search: string) => void;
  onSortChange: (sortBy: keyof User, sortOrder: 'asc' | 'desc') => void;
  onCompanyFilter: (company: string) => void;
  onCityFilter: (city: string) => void;
  onReset: () => void;
  searchParams: UserSearchParams;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onSortChange,
  onCompanyFilter,
  onCityFilter,
  onReset,
  searchParams,
}) => {
  const [searchValue, setSearchValue] = useState(searchParams.search || "");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    setSearchValue(searchParams.search || "");
  }, [searchParams.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    
    const [sortBy, sortOrder] = value.split('-') as [keyof User, 'asc' | 'desc'];
    onSortChange(sortBy, sortOrder);
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCompanyFilter(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCityFilter(e.target.value);
  };

  const handleReset = () => {
    setSearchValue("");
    onReset();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, email, or username..."
            value={searchValue}
            onChange={handleSearchChange}
            aria-label="Search users"
          />
          <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          aria-expanded={isFiltersOpen}
          aria-controls="filter-options"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
          Filters {Object.keys(searchParams).length > 1 && <span className="ml-1 text-blue-500">•</span>}
        </button>
        
        {(Object.keys(searchParams).length > 0) && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleReset}
            aria-label="Reset filters"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Reset
          </button>
        )}
      </div>
      
      {isFiltersOpen && (
        <div id="filter-options" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              id="sort-select"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchParams.sortBy ? `${searchParams.sortBy}-${searchParams.sortOrder || 'asc'}` : ''}
              onChange={handleSortChange}
              aria-label="Sort users by"
            >
              <option value="">Default</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="email-asc">Email (A-Z)</option>
              <option value="email-desc">Email (Z-A)</option>
              <option value="username-asc">Username (A-Z)</option>
              <option value="username-desc">Username (Z-A)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="company-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company
            </label>
            <select
              id="company-select"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchParams.company || ''}
              onChange={handleCompanyChange}
              aria-label="Filter by company"
            >
              <option value="">All Companies</option>
              <option value="Romaguera-Crona">Romaguera-Crona</option>
              <option value="Deckow-Crist">Deckow-Crist</option>
              <option value="Romaguera-Jacobson">Romaguera-Jacobson</option>
              <option value="Robel-Corkery">Robel-Corkery</option>
              <option value="Keebler LLC">Keebler LLC</option>
              <option value="Considine-Lockman">Considine-Lockman</option>
              <option value="Johns Group">Johns Group</option>
              <option value="Abernathy Group">Abernathy Group</option>
              <option value="Yost and Sons">Yost and Sons</option>
              <option value="Hoeger LLC">Hoeger LLC</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City
            </label>
            <select
              id="city-select"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchParams.city || ''}
              onChange={handleCityChange}
              aria-label="Filter by city"
            >
              <option value="">All Cities</option>
              <option value="Gwenborough">Gwenborough</option>
              <option value="Wisokyburgh">Wisokyburgh</option>
              <option value="McKenziehaven">McKenziehaven</option>
              <option value="South Elvis">South Elvis</option>
              <option value="Roscoeview">Roscoeview</option>
              <option value="South Christy">South Christy</option>
              <option value="Howemouth">Howemouth</option>
              <option value="Aliyaview">Aliyaview</option>
              <option value="Bartholomebury">Bartholomebury</option>
              <option value="Lebsackbury">Lebsackbury</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}; 