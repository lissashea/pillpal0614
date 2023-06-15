import axios from 'axios';

const getToken = () => {
  return new Promise(resolve => {
    resolve(`Token ${localStorage.getItem('token') || null}`);
  });
};

const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    Authorization: getToken()
  }
});

export default api;
