import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer'
import TrashContainer from './components/TrashContainer/TrashContainer'
import Reminders from './components/Reminders/Reminders'
import AuthRoute from './components/ProtectedRoute/AuthRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
export default function RoutingModule() {
  const routes=createBrowserRouter([ 
    {
      path:"",
      element:<AuthRoute>
        <Login/>
      </AuthRoute>
    },
    {
      path:"/signup",
      element:<AuthRoute>
        <Signup/>
      </AuthRoute>
    },
    {
      path:'/dashboard',
      element: <ProtectedRoute>
        <DashboardContainer/>
      </ProtectedRoute>,
      children:[
        {
          index: true, // default child route
          element: <Navigate to="notes" />
        },
        {
          path:"notes",
          element: <NotesContainer/>
        },
        {
          path:"archive",
          element: <ArchiveContainer/>
        },
        {
          path:"trash",
          element:<TrashContainer/>
        },
        {
          path:"reminders",
          element:<Reminders/>
        },
      ]
    },

  ]);
  return (
    <RouterProvider router={routes}/>
  )
}
