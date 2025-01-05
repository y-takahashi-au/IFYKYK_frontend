import type UserAuthentification from '@/dto/UserAuthentification'
import http from './HttpCommon'
import AxiosHeader from './AxiosHeader'
import type { AccountInit, ApprovalAccount } from '@/dto/AccountDto'

/* eslint-disable */
class account {
  login(userAuthentification: UserAuthentification): Promise<any> {
    return http.post('/account/login', userAuthentification, AxiosHeader.createRequestHeader())
  }

  authorize(): Promise<any> {
    return http.get(`/account/authorize`, AxiosHeader.createRequestHeader())
  }

  create(): Promise<any> {
    return http.put('/account/create', AxiosHeader.createRequestHeader())
  }

  apply(accountInit: AccountInit): Promise<any> {
    return http.put('/account/apply', accountInit, AxiosHeader.createRequestHeader())
  }

  approve(approvalAccount: ApprovalAccount): Promise<any> {
    return http.put('/account/approve', approvalAccount, AxiosHeader.createRequestHeader())
  }
}

export default new account()
