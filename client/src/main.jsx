import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'

import App from './App.jsx'
//import './index.css'
import './assets/style/style.css'
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Account from './pages/Account.jsx'
import Character from './pages/Character.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/character/guest',
        element: <Character />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/account',
        element:
        <ProtectedRoute>
          <Account />
        </ProtectedRoute>
      },
      {
        path: '/character/:id',
        element: 
        <ProtectedRoute>
          <Character />
        </ProtectedRoute>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
