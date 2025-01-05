import { defineStore } from 'pinia'

export type AccountInfo = {
  accountId: string
  userId: string
  roll: string
}

export const AccountStore = defineStore({
  id: 'AccountStore',
  state: () =>
    ({
      accountId: '',
      userId: '',
      roll: ''
    }) as AccountInfo,
  actions: {
    reset() {
      this.accountId = ''
      this.userId = ''
      this.roll = ''
    }
  },
  persist: {
    storage: sessionStorage
    // シリアライズ・デシリアライズの処理をJSONではなくAESを使った暗号処理に変更
    // serializer: {
    //   deserialize: (str) => {
    //     const decrypted = CryptoJS.AES.decrypt(str, 'user')
    //     const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
    //     return JSON.parse(decryptedData)
    //   },
    //   serialize: (state) => {
    //     return CryptoJS.AES.encrypt(JSON.stringify(state), 'user').toString()
    //   }
    // }
  }
})
