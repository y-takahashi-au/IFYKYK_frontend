import http from './HttpCommon'
import AxiosHeader from './AxiosHeader'
import type { Edit, SearchCondition } from '@/dto/FlatHouse'

/* eslint-disable */
class flatHouse {
  getList(searchCondition: SearchCondition): Promise<any> {
    return http.post('/flat_house/list', searchCondition, AxiosHeader.createRequestHeader())
  }

  getDetail(id: string): Promise<any> {
    return http.get(`/flat_house/detail?id=${id}`, AxiosHeader.createRequestHeader())
  }

  create(edit: Edit): Promise<any> {
    return http.post(`/flat_house/create`, edit, AxiosHeader.createRequestHeader())
  }

  approve(edit: Edit): Promise<any> {
    return http.post(`/flat_house/approve`, edit, AxiosHeader.createRequestHeader())
  }
}

export default new flatHouse()
