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

// Anexa automaticamente o token (se existir) em todos os pedidos
const attachToken = (config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

blApi.interceptors.request.use(attachToken);
// Necessário para as rotas de admin (/users, /users/:id, /user/:id) do auth-api.
// NOTA: o backend atual (verifyAuth.js) só lê o token de um cookie httpOnly,
// não do header Authorization. Ver aviso no fundo da conversa sobre o patch
// necessário no backend para estas rotas funcionarem.
authApi.interceptors.request.use(attachToken);

// Se o token expirar/for inválido (401), limpa a sessão automaticamente
const handleUnauthorized = (error) => {
  if (error.response && error.response.status === 401) {
    Cookies.remove('token');
  }
  return Promise.reject(error);
};

blApi.interceptors.response.use((response) => response, handleUnauthorized);
authApi.interceptors.response.use((response) => response, handleUnauthorized);

// Export mantido por compatibilidade, aponta para o bl-api
export const api = blApi;
