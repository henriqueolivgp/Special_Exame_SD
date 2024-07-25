import { AuthContext } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // const url = 'localhost:18080';

  useEffect(() => {
    const userToken = Cookies.get('authToken');
    // console.log('userCookies: ' + userToken);

    if (userToken) {
      try {
        const decodedToken = jwtDecode(userToken,);
        // console.log('Decoded Token: ', decodedToken);

        // Verificar se o token contém userId
        if (decodedToken.sub) {
          // console.log('User ID: ', decodedToken.sub);
          // const userId = decodedToken.sub;
          // setSession(userId)
          // Faça o que for necessário com o userId
        } else {
          console.log('User ID não encontrado no token');
        }

      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      console.log('Token não encontrado nos cookies');
    }
    
    // if (session === null) {
    //   return console.log('nao ha user' + session)
    // }
  }, []);

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
      const response = await axios.post('http://localhost:18080/login', {
        username,
        password
      });
      setUser(response.data);

      // console.log(response.data)

      const token = response.data.token;

      Cookies.set('authToken', token, { expires: 1 });

    } catch (err) {
      setError(err.response ? err.response.data : 'Erro de rede');
    } finally {
    }
  };

  const logout = () => {
    // Remove o token de autenticação dos cookies
    Cookies.remove('authToken');
    // Atualizar o estado do usuário para 
    setUser(null);
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
