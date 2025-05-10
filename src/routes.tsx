import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <Layout>
        <UserDetails />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
