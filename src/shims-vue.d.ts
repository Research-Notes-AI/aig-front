declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  
  declare module '@/services/axiosConfig' {
    import { AxiosInstance } from 'axios'
    const axiosInstance: AxiosInstance
    export default axiosInstance
  }
  