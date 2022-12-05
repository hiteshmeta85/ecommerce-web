import {parseCookies} from 'nookies'

const cookies = parseCookies()

export const getAuthTokenCookie = () => {
  return cookies['token'] || ""
}
