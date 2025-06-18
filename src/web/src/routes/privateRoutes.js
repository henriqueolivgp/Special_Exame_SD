import { useAuth } from '../hooks/AuthHook'
import { Navigate } from 'react-router-dom'

export function PrivateRoutes ({ element, notHaveAccessNavigateTo }) {
  const { signed, loading } = useAuth()

  if(loading) {
    return <p>Loading Page.....</p>
  }

  return signed ? element : <Navigate to={notHaveAccessNavigateTo} replace />
}