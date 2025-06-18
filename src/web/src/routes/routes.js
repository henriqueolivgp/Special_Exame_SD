import { createBrowserRouter, } from 'react-router-dom'
import App from '../app/app'
import Home from '../Pages/home'
import { Register } from '../Pages/register'
import UsersControl from '../Pages/users.control'
import { Login } from '../Pages/login'

import { AuthProvider } from '../providers/AuthProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { PrivateRoutes } from './privateRoutes'
import HomeContent from '../components/home/home.container2'

// Create a client
const queryClient = new QueryClient()

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    ),
    // Pagina de erro
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes
            element={<Home />}
            notHaveAccessNavigateTo="login"
          />
        ),
        children: [
          {
            path: "/",
            element: <HomeContent />
          },
          {
            path: "admin-panel",
            element: <UsersControl />
          },

        ]
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },

    ]
  }
])