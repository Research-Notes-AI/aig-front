// src/services/axiosConfig.ts
import axios, { type AxiosInstance} from 'axios'
import router from '../router'
import { useToast } from 'vue-toastification';

const toast = useToast();

// 创建一个 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://13.215.140.116:5001/api/v1',// 替换为你的 API 基础 URL
  timeout: 10000,
})

// 添加请求拦截器

axiosInstance.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    console.log(localStorage.getItem('token'))
    const token = localStorage.getItem('token')

    if (token) {
      // 在请求头中添加 token
      config.headers.Token = `${token}`
    }
    else{
      //跳到登录
      router.push({ name: 'login' });
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response); // 添加日志
       // 检查 errno 是否为 401，表示未登录
       if (response.data.errno === 401) {
        // 可选：显示一条消息
  
        toast.error('请先登录');
        // 跳转到登录页
        router.push({ name: 'login' });
        // 可选：清除存储的 token 或其他用户信息
        localStorage.removeItem('token');
      }
      // 返回响应数据
      return response;
    },
    (error) => {
    if (error.response) {
      // Token 过期或未授权，清除 token 并跳转到登录页
      localStorage.removeItem('token');
      console.log("跳转到登录页");
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance
