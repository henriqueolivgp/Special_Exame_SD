import axios from 'axios';
import Cookies from 'js-cookie';

// Instância para o serviço de autenticação (auth-api)
export const authApi = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_URL,
});

// Instância para o serviço de negócio / filmes (bl-api)
export const blApi = axios.create({
  baseURL: process.env.REACT_APP_BL_API_URL,
});

// Anexa automaticamente o token (se existir) em todos os pedidos ao bl-api
blApi.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Se o token expirar/for inválido (401), limpa a sessão automaticamente
const handleUnauthorized = (error) => {
  if (error.response && error.response.status === 401) {
    Cookies.remove('token');
  }
  return Promise.reject(error);
};

blApi.interceptors.response.use((response) => response, handleUnauthorized);

// Export mantido por compatibilidade, aponta para o bl-api
export const api = blApi;
