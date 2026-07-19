import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import { authApi } from '../api/api';

import Cookies from 'js-cookie';
import { jwtDecode as jwt_decode } from 'jwt-decode';

import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userIsSigned = async () => {
      const CookieToken = Cookies.get('token');

      if (typeof CookieToken === 'string' && CookieToken) {
        try {
          // Decodifica o token guardado para restaurar o utilizador ao recarregar a página
          const decoded = jwt_decode(CookieToken);

          // Se o token já expirou, limpa tudo em vez de confiar nele
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            Cookies.remove('token');
            setUser(null);
            setSigned(false);
          } else {
            setUser(decoded);
            setSigned(true);
          }
        } catch (err) {
          // Token corrompido/ilegível
          Cookies.remove('token');
          setUser(null);
          setSigned(false);
        }
      } else {
        setUser(null);
        setSigned(false);
      }
      setLoading(false);
    }
    userIsSigned()
  }, []);

  const register = async (userData) => {
    setError({});
    try {
      const { username, password } = userData;
      const response = await authApi.post('/register', {
        username,
        password
      });
      setUser(response.data);
      toast.success('Your registration is Succefull!!!')
    } catch (err) {
      const errData = err.response ? err.response.data : { error: 'Erro de rede' };
      setError(errData);
      toast.error(errData?.error || 'Erro ao registar. Tenta novamente.');
    }
  };

  const login = async (credentials) => {
    setError({});
    try {
      const { username, password } = credentials;

      // pedido ao auth-api para autenticar
      const response = await authApi.post('/login', {
        username,
        password
      });

      const token = response.data.token;
      // guarda o token nos cookies
      Cookies.set('token', token, { expires: 1 });
      // guarda o token descodificado no estado do utilizador
      const User = jwt_decode(token);
      setUser(User);

      setSigned(true);
      toast.success("You logged in!!");
      navigate("/");

    } catch (err) {
      const errData = err.response ? err.response.data : { error: 'Erro de rede' };
      setError(errData);
      toast.error(errData?.error || 'Credenciais inválidas ou erro de rede.');
      return false;
    }

  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setSigned(false);
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ user, loading, signed, logout, register, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};
