import React, { useState } from "react";
import { User } from "../../../types";
import { UserRow } from "./UserRow";
import { Pagination } from "../../common/Pagination";
import { UserDetailsModal } from "./UserDetailsModal";
import { useTranslation } from "react-i18next";

interface UsersListProps {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems?: number;
}

export const UsersList: React.FC<UsersListProps> = ({
  users,
  isLoading,
  error,
  currentPage,
  onPageChange,
  itemsPerPage,
  totalItems = 100,
}) => {
  const { t } = useTranslation();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{t("common.error")}: {error.message}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => window.location.reload()}
        >
          {t("common.tryAgain")}
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500 dark:text-gray-400">
        {t("users.noUsersFound")}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("userDetails.fullName")}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("userDetails.email")}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("userDetails.company")}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("userDetails.city")}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t("common.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <UserRow 
                key={user.id} 
                user={user} 
                onSelect={handleUserSelect} 
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />

      {selectedUserId && (
        <UserDetailsModal 
          userId={selectedUserId} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}; 