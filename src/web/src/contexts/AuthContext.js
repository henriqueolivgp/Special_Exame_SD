import { createContext } from "react";

// Não existe ReactNode em JS, então você pode ignorar ou apenas comentar
// Também não precisa da interface ChildrenContext

// Não há tipagem para AuthDataContext em JS
// Apenas documente com comentários se quiser

export const AuthContext = createContext({
  user: null,
  loading: false,
  signed: false,  
  logout: () => {},
  register: async (email, password) => {},
  login: async (email, password) => {},
  passwordReset: async (email) => {},
  passwordUpdate: async (newpassword) => {},
});
