import axios from 'axios';
import index from '../config';

// axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => {
        if (response.data.msg === 401) {
            sessionStorage.removeItem("auth");
            window.location.href = "http://localhost:3000/#/";
        }
        return response;
    },
    error => {
        console.log("请求错误，请重试");
        return Promise.reject(error);
    }
);

axios.interceptors.request.use(
    config => {
        config.baseURL = index.serve + '/back';
        config.withCredentials = true; // 允许携带token ,这个是解决跨域产生的相关问题
        config.timeout = 6000;
        /*let token = "test"; // sessionStorage.getItem('access_token');
        if (token) {
            config.headers = {
                'Access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }*/
        if (config.url === 'refresh') {
            config.headers = {
                'refresh-token': sessionStorage.getItem('refresh_token'),
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const api = axios;