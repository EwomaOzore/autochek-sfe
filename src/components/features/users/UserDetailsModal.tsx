import React, { useEffect, useRef } from "react";
import { useUser, useUserPosts, useUserTodos, useUserStats } from "../../../hooks/useUsers";

interface UserDetailsModalProps {
  userId: number;
  onClose: () => void;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ userId, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { data: user, isLoading, error } = useUser(userId);
  const { data: posts } = useUserPosts(userId);
  const { data: todos } = useUserTodos(userId);
  const { data: userStats } = useUserStats(userId);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
          <h3 className="text-xl font-bold text-red-500 mb-4">Error</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {error ? error.message : "User not found"}
          </p>
          <div className="mt-6 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const completedTodos = todos?.filter(todo => todo.completed).length || 0;
  const totalTodos = todos?.length || 0;
  const completionPercentage = totalTodos ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            User Details
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="text-gray-900 dark:text-white">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                      <p className="text-gray-900 dark:text-white">@{user.username}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-gray-900 dark:text-white">
                        <a 
                          href={`mailto:${user.email}`}
                          className="hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          {user.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-gray-900 dark:text-white">
                        <a 
                          href={`tel:${user.phone}`}
                          className="hover:text-blue-500 dark:hover:text-blue-400"
                        >
                          {user.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                    <p className="text-gray-900 dark:text-white">
                      <a 
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-500 dark:hover:text-blue-400"
                      >
                        {user.website}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Address</h3>
                <div className="space-y-2">
                  <p className="text-gray-900 dark:text-white">
                    {user.address.street}, {user.address.suite}
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Company</h3>
                <div className="space-y-2">
                  <p className="text-gray-900 dark:text-white font-medium">{user.company.name}</p>
                  <p className="text-gray-700 dark:text-gray-300 italic">"{user.company.catchPhrase}"</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">BS: {user.company.bs}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Activity Stats</h3>
                
                {userStats && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Activity Score</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {userStats.activityScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${userStats.activityScore}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</span>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {Math.round(userStats.completionRate * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="bg-green-500 h-2.5 rounded-full" 
                          style={{ width: `${userStats.completionRate * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p>Total Tasks: <span className="font-medium text-gray-900 dark:text-white">{userStats.taskCount}</span></p>
                      <p>Last Active: <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(userStats.lastActive).toLocaleDateString()}
                      </span></p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Tasks</h3>
                
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Completed Tasks</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {completedTodos}/{totalTodos}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-green-500 h-2.5 rounded-full" 
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="max-h-40 overflow-y-auto">
                  <ul className="space-y-2">
                    {todos?.slice(0, 5).map((todo) => (
                      <li 
                        key={todo.id}
                        className="flex items-start"
                      >
                        <span className={`inline-block w-2 h-2 mt-1.5 mr-2 rounded-full ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                        <span className={`text-sm ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                          {todo.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {todos && todos.length > 5 && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      + {todos.length - 5} more tasks
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Recent Posts</h3>
                
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {posts?.slice(0, 3).map((post) => (
                    <div key={post.id} className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{post.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                        {post.body}
                      </p>
                    </div>
                  ))}

                  {posts && posts.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No posts found for this user.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 