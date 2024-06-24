import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './views/Home.jsx';
import { GlobalStateProvider } from './GlobalState.jsx';
import UserPage from './views/UserPage.jsx';
import PostPage from './views/PostPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AuthLayout from './views/layouts/AuthLayout.jsx';
import RegisterPage from './views/RegisterPage.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element:
      <GlobalStateProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalStateProvider>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: ':username',
        element: <UserPage />
      },
      {
        path: 'post/:slug',
        element: <PostPage />
      }
    ],
  },
  {
    path: '/login',
    element:
      <GlobalStateProvider>
        <AuthLayout>


        </AuthLayout>

      </GlobalStateProvider>,
    children: [
      {
        path: '',
        element: <LoginPage />,
      }
    ]
  },
  {
    path: '/register',
    element:
      <GlobalStateProvider>
        <AuthLayout>
        </AuthLayout>

      </GlobalStateProvider>,
    children: [
      {
        path: '',
        element: <RegisterPage />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(


  <RouterProvider router={router}>

  </RouterProvider>



)
