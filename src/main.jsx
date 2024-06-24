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



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: ':username',
        element: <UserPage />
      },
      {
        path: '/post/:slug',
        element: <PostPage />
      }

    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(

  <GlobalStateProvider>
    <RouterProvider router={router} />
  </GlobalStateProvider>

)
