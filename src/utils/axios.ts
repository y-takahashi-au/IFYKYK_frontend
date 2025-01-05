import axios from 'axios'
import { authStore } from '@/stores/auth'

/**
 * axios初期設定
 */
const _axios = axios.create({
  // ベースURL
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // タイムアウト
  timeout: 5000,
  // ヘッダー
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * リクエスト共通処理
 */
_axios.interceptors.request.use(
  (request) => {
    // アクセストークンを取得
    const accessToken = authStore().getAccessToken

    // アクセストークンをリクエストヘッダーに追加
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`
    }

    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 401エラーになった場合のリトライ制御: 無限ループ対策
let isTried = false
/**
 * レスポンス共通処理
 */
_axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // 認証エラー
    if (error.response.status === 401 && !isTried) {
      // リトライ済み
      isTried = true
      // StoreからRefresh Tokenを取得
      const refreshToken = authStore().getRefreshToken

      // Refresh Tokenを使用して新しいAccess Tokenを取得、取得できない場合はRefresh Tokenの期限切れとなる
      const token = await _axios.post('/Authentication/token/refresh', { refreshToken })
      if (token.status === 200) {
        // Access TokenをStoreで保持
        authStore().setAccessToken(token.data.accessToken)

        // 新しいAccess Tokenを取得する前の元のリクエスト処理を再開
        return _axios.request({
          ...error.config,
          headers: {
            Authorization: `'Bearer ${token.data.accessToken}`
          }
        })
      }
    } else if (error.response.status === 401 && isTried) {
      // ログアウト
      authStore().logout()
      // NOTE: Vue Routerを使用できないので以下のwindow.locationで対応
      window.location.href = 'session-time-out'
    }

    return Promise.reject(error)
  }
)

export default _axios
