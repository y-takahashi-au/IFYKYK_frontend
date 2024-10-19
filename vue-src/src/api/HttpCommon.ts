import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:8081/'
})

// export function apiClient(): AxiosInstance {
//   const authorization = document.cookie.split(';')[0].split('=')[1]
//   return axios.create({
//     baseURL: 'https://localhost:8081/',
//     headers: {
//       'Content-type': 'application/json;charset=UTF-8',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization,X-Requested-With',
//       // 'Access-Control-Expose-Headers': '*, Authorization'
//       Authorization: 'Bearer' + authorization
//     }
//   })
// }

export default apiClient
