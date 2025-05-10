import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { UserStatsChart } from "../components/features/charts/UserStatsChart";
import { SearchFilters } from "../components/features/users/SearchFilters";
import { UsersList } from "../components/features/users/UsersList";
import { useUsers, useAllUserStats } from "../hooks/useUsers";

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const {
    searchParams,
    setSearch,
    setSort,
    setCompanyFilter,
    setCityFilter,
    resetFilters,
  } = useSearch();

  const { data: users, isLoading, error } = useUsers({
    page,
    limit,
    ...searchParams,
  });

  const { data: userStats, isLoading: isLoadingStats } = useAllUserStats();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          User Dashboard
        </h1>
        
        <SearchFilters 
          onSearch={setSearch}
          onSortChange={setSort} 
          onCompanyFilter={setCompanyFilter}
          onCityFilter={setCityFilter}
          onReset={resetFilters}
          searchParams={searchParams}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <UsersList 
              users={users || []}
              isLoading={isLoading}
              error={error}
              currentPage={page}
              onPageChange={handlePageChange}
              itemsPerPage={limit}
            />
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Activity Overview
            </h2>
            
            <UserStatsChart 
              data={userStats || []} 
              isLoading={isLoadingStats} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
