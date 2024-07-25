import { AuthContext } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const url = 'localhost:18080';

  useEffect(() => {
    const userCookie = Cookies.get('user');
    console.log('userCookies: ' + userCookie)
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    setLoading(false); // Após verificar os cookies, definimos o loading como false
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('userData antes de inserir: ' + JSON.stringify(userData))
      const { username, password } = userData;
      console.log('username: ' + username + ' password: ' + password)
      const response = await axios.post('http://localhost:18080/register', {
        username,
        password
      });
      console.log('userData depois de inserir: ' + userData)
      setUser(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { username, password } = credentials;
      const response = await axios.post('http://localhost:18080/login', {
        username,
        password
      });
      setUser(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro de rede');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Implementar a lógica de logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
