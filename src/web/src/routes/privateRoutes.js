import { useAuth } from '../hooks/AuthHook'
import { Navigate } from 'react-router-dom'

export function PrivateRoutes ({ element, notHaveAccessNavigateTo, allowedRoles }) {
  const { signed, loading, role } = useAuth()

  if(loading) {
    return <p>Loading Page.....</p>
  }

  if (!signed) {
    return <Navigate to={notHaveAccessNavigateTo} replace />
  }

  // Se a rota exige roles específicas (ex: Admin Panel) e o utilizador não as tem,
  // manda-o para a home em vez de deixar renderizar uma página vazia/errada
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return element
}