import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { UserStats } from "../../../types";

interface UserStatsChartProps {
  data: UserStats[];
  isLoading: boolean;
}

export const UserStatsChart: React.FC<UserStatsChartProps> = ({
  data,
  isLoading,
}) => {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");

  // Process data for the charts
  const chartData = data.map((stats) => ({
    name: `User ${stats.userId}`,
    activityScore: stats.activityScore,
    completionRate: Math.round(stats.completionRate * 100),
    taskCount: stats.taskCount,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FFC658",
    "#8DD1E1",
    "#A4DE6C",
    "#D0ED57",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No data available to display
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setChartType("bar")}
          className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            chartType === "bar"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-label="Show bar chart"
          aria-pressed={chartType === "bar"}
        >
          Bar
        </button>
        <button
          onClick={() => setChartType("line")}
          className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            chartType === "line"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-label="Show line chart"
          aria-pressed={chartType === "line"}
        >
          Line
        </button>
        <button
          onClick={() => setChartType("pie")}
          className={`px-3 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            chartType === "pie"
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-label="Show pie chart"
          aria-pressed={chartType === "pie"}
        >
          Pie
        </button>
      </div>

      {chartType === "bar" && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis
              dataKey="name"
              tick={{ fill: 'currentColor' }}
              className="text-gray-500 dark:text-gray-400 text-xs"
            />
            <YAxis
              tick={{ fill: 'currentColor' }}
              className="text-gray-500 dark:text-gray-400 text-xs"
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
            />
            <Legend />
            <Bar
              dataKey="activityScore"
              name="Activity Score"
              fill="#0088FE"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completionRate"
              name="Completion Rate (%)"
              fill="#00C49F"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="taskCount"
              name="Task Count"
              fill="#FFBB28"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {chartType === "line" && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis
              dataKey="name"
              tick={{ fill: 'currentColor' }}
              className="text-gray-500 dark:text-gray-400 text-xs"
            />
            <YAxis
              tick={{ fill: 'currentColor' }}
              className="text-gray-500 dark:text-gray-400 text-xs"
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="activityScore"
              name="Activity Score"
              stroke="#0088FE"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="completionRate"
              name="Completion Rate (%)"
              stroke="#00C49F"
            />
            <Line
              type="monotone"
              dataKey="taskCount"
              name="Task Count"
              stroke="#FFBB28"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {chartType === "pie" && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="activityScore"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '4px', border: '1px solid #ccc', color: '#333' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
} 