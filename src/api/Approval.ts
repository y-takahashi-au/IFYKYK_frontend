import http from './HttpCommon'
import AxiosHeader from './AxiosHeader'

/* eslint-disable */
class flatHouse {
  getCount(): Promise<any> {
    return http.get('/approval/total_count', AxiosHeader.createRequestHeader())
  }

  getAccountList(): Promise<any> {
    return http.get('/approval/account_list', AxiosHeader.createRequestHeader())
  }

  getFlatHouseReviewList(): Promise<any> {
    return http.get('/approval/flat_house_review_list', AxiosHeader.createRequestHeader())
  }
}

export default new flatHouse()
