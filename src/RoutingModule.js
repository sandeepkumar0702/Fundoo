import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer';
import TrashContainer from './components/TrashContainer/TrashContainer';
import AuthRoute from './components/Routes/AuthRoute'; // Import AuthRoute
import ProtectedRoute from './components/Routes/ProtectedRoute'; // Import ProtectedRoute

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardContainer />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true, // Default child route
        element: <Navigate to="notes" />,
      },
      {
        path: "notes",
        element: <NotesContainer />,
      },
      {
        path: "archive",
        element: <ArchiveContainer />,
      },
      {
        path: "trash",
        element: <TrashContainer />,
      },
    ],
  },
  {
    path: "*", // Fallback for invalid routes
    element: <Navigate to="/" replace />,
  },
]);

// Export the RoutingModule as the default export
export default function RoutingModule() {
  return <RouterProvider router={router} />;
}