import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

import axios from 'axios';

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
        setSigned(true);
      } else {
        setUser(null);
        setSigned(false);
      }
      setLoading(false);
    }
    userIsSigned()
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
      toast.success('Your registration is Succefull!!!')
    } catch (err) {
      setError(err.response ? err.response.data : 'Erro de rede');
      toast.error(error.error)
    }
  };

  const login = async (credentials) => {
    setError({});
    try {
      const { username, password } = credentials;

      console.log('dados antes da requesicao:' + username + ' - ' + password)

      // make the request into my auth api for logged in
      const response = await axios.post('http://localhost:18080/login', {
        username,
        password
      });

      const token = response.data.token;
      // generate token with the name "token"
      Cookies.set('token', token, { expires: 1 });
      // save decoded token in User
      const User = jwt_decode(token);
      setUser(User);

      // update signed for true
      setSigned(true);
      toast.success("You logged in!!");
      navigate("/");

    } catch (err) {
      setError(err.response ? err.response.data : 'Erro de rede');
      toast.error(error.error);
      return false;
    }
  };

  const logout = () => {
    // Remove token inside the cookies
    Cookies.remove('token');
    // Update user state for null 
    setUser(null);
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ user, loading, signed, logout, register, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};
