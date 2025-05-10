import React, { useEffect, useState } from "react";
import { User, UserSearchParams } from "../../../types";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
            placeholder={t("users.search")}
            value={searchValue}
            onChange={handleSearchChange}
            aria-label={t("common.search")}
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
          {t("users.filters")} {Object.keys(searchParams).length > 1 && <span className="ml-1 text-blue-500">•</span>}
        </button>
        
        {(Object.keys(searchParams).length > 0) && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleReset}
            aria-label={t("users.reset")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            {t("users.reset")}
          </button>
        )}
      </div>
      
      {isFiltersOpen && (
        <div id="filter-options" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("users.sortBy")}
            </label>
            <select
              id="sort-select"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"%236B7280\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/></svg>')", backgroundPosition: "calc(100% - 12px) center" }}
              value={searchParams.sortBy ? `${searchParams.sortBy}-${searchParams.sortOrder || 'asc'}` : ''}
              onChange={handleSortChange}
              aria-label={t("users.sortBy")}
            >
              <option value="">{t("users.default")}</option>
              <option value="name-asc">{t("users.nameAZ")}</option>
              <option value="name-desc">{t("users.nameZA")}</option>
              <option value="email-asc">{t("users.emailAZ")}</option>
              <option value="email-desc">{t("users.emailZA")}</option>
              <option value="username-asc">{t("users.usernameAZ")}</option>
              <option value="username-desc">{t("users.usernameZA")}</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="company-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("users.company")}
            </label>
            <select
              id="company-select"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"%236B7280\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/></svg>')", backgroundPosition: "calc(100% - 12px) center" }}
              value={searchParams.company || ''}
              onChange={handleCompanyChange}
              aria-label={t("users.company")}
            >
              <option value="">{t("users.allCompanies")}</option>
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
              {t("users.city")}
            </label>
            <select
              id="city-select"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 appearance-none bg-no-repeat bg-right"
              style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"%236B7280\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/></svg>')", backgroundPosition: "calc(100% - 12px) center" }}
              value={searchParams.city || ''}
              onChange={handleCityChange}
              aria-label={t("users.city")}
            >
              <option value="">{t("users.allCities")}</option>
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