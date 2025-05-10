import React, { useState, useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { UserStatsChart } from "../components/features/charts/UserStatsChart";
import { SearchFilters } from "../components/features/users/SearchFilters";
import { UsersList } from "../components/features/users/UsersList";
import { useUsers, useAllUserStats } from "../hooks/useUsers";
import axios from "axios";
import { User } from "../types";
import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
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

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        let allUsers = response.data as User[];
        
        if (searchParams.search) {
          const searchTerm = searchParams.search.toLowerCase();
          allUsers = allUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm) || 
            user.username.toLowerCase().includes(searchTerm)
          );
        }
        
        if (searchParams.company) {
          allUsers = allUsers.filter(user => 
            user.company.name === searchParams.company
          );
        }
        
        if (searchParams.city) {
          allUsers = allUsers.filter(user => 
            user.address.city === searchParams.city
          );
        }
        
        setTotalUsers(allUsers.length);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };
    
    fetchTotalUsers();
  }, [searchParams]);

  const { data: userStats, isLoading: isLoadingStats } = useAllUserStats();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t("dashboard.title")}
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
              totalItems={totalUsers}
            />
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("dashboard.activityOverview")}
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
