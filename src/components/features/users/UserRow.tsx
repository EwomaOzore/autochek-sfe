import React from "react";
import { User } from "../../../types";
import { usePrefetchUser } from "../../../hooks/useUsers";

interface UserRowProps {
  user: User;
  onSelect: (userId: number) => void;
}

export const UserRow: React.FC<UserRowProps> = ({ user, onSelect }) => {
  const prefetchUser = usePrefetchUser();
  
  const handleMouseEnter = () => {
    prefetchUser(user.id);
  };

  return (
    <tr 
      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
      onClick={() => onSelect(user.id)}
      onMouseEnter={handleMouseEnter}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${user.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(user.id);
          e.preventDefault();
        }
      }}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
            <span className="text-blue-600 dark:text-blue-300 font-medium">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              @{user.username}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        <a 
          href={`mailto:${user.email}`} 
          className="hover:text-blue-500 dark:hover:text-blue-400"
          onClick={(e) => e.stopPropagation()}
        >
          {user.email}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {user.company.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {user.address.city}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 px-3 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(user.id);
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
}; 