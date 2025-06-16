import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import axios from 'axios';

import Cookies from 'js-cookie';
import { jwtDecode as jwt_decode } from 'jwt-decode';

import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userIsSigned = async () => {
      const CookieToken = Cookies.get('token');

      if (typeof CookieToken === 'string' && CookieToken) {
        const User = jwt_decode(CookieToken);
        setUser(User);
        setSigned(!!User);
        setLoading(false)
      } else {
        setUser(null);
        setSigned(false);
      }
      setLoading(false);

    }
    userIsSigned()
  }, [signed]);

  const register = async (userData) => {
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
    }
  };

  const login = async (credentials) => {
    setError(null);
    try {
      const { username, password } = credentials;

      // faco pedido a minha auth api para fazer login
      const response = await axios.post('http://localhost:18080/login', {
        username,
        password
      });

      setUser(response.data);

      // console.log("data do login: " + JSON.stringify(response.data))

      const token = response.data.token;

      // gerar o token com onome "token"
      Cookies.set('token', token, { expires: 1 });
      toast.success("You logged in!!")

      navigate("/")
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro de rede');
      toast.error("Ocurred an error when you trying make login!!!! Pls verify you username or password")
    }
  };

  const logout = () => {
    // Remove o token de autenticação dos cookies
    Cookies.remove('token');
    // Atualizar o estado do usuário para 
    setUser(null);
    navigate("/")
  };

  return (
    <AuthContext.Provider value={{ user, loading, signed, logout, register, login,  error }}>
      {children}
    </AuthContext.Provider>
  );
};
