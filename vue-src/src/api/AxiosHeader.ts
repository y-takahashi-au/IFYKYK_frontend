export interface RequestHeader {
  headers: {
    'Content-type': string
    'Access-Control-Allow-Headers': string
    'X-AUTH-TOKEN': string | null
  }
}

/* eslint-disable */
class AxiosHeader {
  createRequestHeader(): RequestHeader {
    var a = document.cookie
      .split(';')
      .filter((cookie) => (cookie.split('=')[0] = 'authorization'))
      .map((cookie) => cookie.split('=')[0])

    const authorization = document.cookie.split(';')[0].split('=')[1]
    console.log()
    return {
      headers: {
        'Content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization,X-Requested-With',
        'X-AUTH-TOKEN': authorization ? 'Bearer ' + authorization : null
      }
    }
  }
}

export default new AxiosHeader()
