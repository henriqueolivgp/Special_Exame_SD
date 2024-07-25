import { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext); 
  return context;
};