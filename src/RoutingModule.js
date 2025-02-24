import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import NotesContainer from './components/NotesContainer/NotesContainer';
import ArchiveContainer from './components/ArchiveContainer/ArchiveContainer'
import TrashContainer from './components/TrashContainer/TrashContainer'

export default function RoutingModule() {
  const routes=createBrowserRouter([ 
    {
      path:"",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:'/dashboard',
      element: <DashboardContainer/>,
      children:[
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
      ]
    },

  ]);
  return (
    <RouterProvider router={routes}/>
  )
}
