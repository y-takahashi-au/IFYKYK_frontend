import { ref } from 'vue'
import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

export const authStore = defineStore({
  id: 'authStore',
  state: () => ({
    userId: '',
    userName: '',
    loggedIn: false,
    accessToken: '',
    refreshToken: ''
  }),
  getters: {
    getUserId: (state) => state.userId,
    getUserName: (state) => state.userName,
    isLoggedIn: (state) => state.loggedIn,
    getAccessToken: (state) => state.accessToken,
    getRefreshToken: (state) => state.refreshToken
  },
  actions: {
    /**
     * ログイン
     * @param {String} accessToken
     * @param {String} recommended
     */
    login(accessToken: string, refreshToken: string) {
      this.loggedIn = true
      this.accessToken = accessToken
      this.refreshToken = refreshToken
    },
    /**
     * ログアウトアウト
     */
    logout() {
      this.loggedIn = false
      this.accessToken = ''
      this.refreshToken = ''
    },
    setAccessToken(accessToken: string) {
      this.userId = accessToken
    }
  },
  persist: {
    storage: sessionStorage,
    // シリアライズ・デシリアライズの処理をJSONではなくAESを使った暗号処理に変更
    serializer: {
      deserialize: (str) => {
        const decrypted = CryptoJS.AES.decrypt(str, 'user')
        const decryptedData = decrypted.toString(CryptoJS.enc.Utf8)
        return JSON.parse(decryptedData)
      },
      serialize: (state) => {
        return CryptoJS.AES.encrypt(JSON.stringify(state), 'user').toString()
      }
    }
  }
})
