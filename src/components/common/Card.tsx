import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  footer?: ReactNode;
  isLoading?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = "",
  footer,
  isLoading = false,
}) => {
  return (
    <div
      className={`bg-card-light dark:bg-card-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
    >
      {isLoading ? (
        <div className="p-6 animate-pulse">
          {title && (
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/3"></div>
          )}
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ) : (
        <>
          {title && (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
          )}
          <div className="p-6">{children}</div>
          {footer && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {footer}
            </div>
          )}
        </>
      )}
    </div>
  );
};
