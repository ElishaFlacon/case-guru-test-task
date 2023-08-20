import axios, { AxiosInstance } from "axios";


export const API_URL = 'http://localhost:5000';


export const $api: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


export const $authApi: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

$authApi.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});
