// src/services/axiosConfig.ts
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'


// 创建一个 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://13.215.140.116:5001/api/v1',// 替换为你的 API 基础 URL
  timeout: 10000,
})

// 添加请求拦截器

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token
    console.log(localStorage.getItem('token'))
    const token = localStorage.getItem('token')

    if (token) {
      // 在请求头中添加 token
      config.headers.Token = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
