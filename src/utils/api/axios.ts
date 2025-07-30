import axios from 'axios';
import getOrCreateSessionkey from '../session';

const Axios = axios.create({
  baseURL: 'http://localhost:8000/api',
})

Axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem('access_token');
  const sessionKey = getOrCreateSessionkey();
  if(token) {
    config.headers.Authorization =`Bearer ${token}`;
    return config;
  }
  config.headers['X-Session-Key'] = sessionKey;
  config.headers['Content-Type'] = 'application/json'
  console.log(config.headers)
  return config;
});

Axios.interceptors.response.use(res => res, async err =>{
  const originalRequest = err.config;
  if(err.response.status === 401 && !originalRequest._retry){
      originalRequest._retry=true;
      const refreshToken = localStorage.getItem('refresh_token');
      const res = await Axios.post('/users/refresh/',{
        refresh: refreshToken
      });
      const newAccessToken = res.data.access;
      localStorage.setItem('access_token',newAccessToken);

      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axios(originalRequest);
  }
  return Promise.reject(err);
})

export default Axios;