import type UserAuthentification from '@/dto/UserAuthentification'
import http from './HttpCommon'
import AxiosHeader from './AxiosHeader'

/* eslint-disable */
class account {
  login(userAuthentification: UserAuthentification): Promise<any> {
    return http.post('/account/login', userAuthentification, AxiosHeader.createRequestHeader())
  }

  authorize(): Promise<any> {
    return http.get(`/account`, AxiosHeader.createRequestHeader())
  }

  create(): Promise<any> {
    return http.post('/account/create', AxiosHeader.createRequestHeader())
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/tutorials/${id}`, data)
  }

  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`)
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`)
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`)
  }
}

export default new account()
