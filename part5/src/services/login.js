import axios from 'axios';
const baseUrl = '/api/login';

let token = undefined;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
  window.localStorage.setItem('token', token);
};

const getToken = () => {
  return window.localStorage.getItem('token');
};

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login, setToken, getToken };
