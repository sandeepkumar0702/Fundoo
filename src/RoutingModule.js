import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

export default function RoutingModule() {
  const route=createBrowserRouter([ 
    {
      path:"",
      element:<Login/>
    },
    {
      path:"signup",
      element:<Signup/>
    },

  ]);
  return (
    <RouterProvider router={route}/>
  )
}
