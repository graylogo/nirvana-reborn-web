import hyRequest from '../index'

import { Account, LoginInfo } from './types'

enum LoginAPI {
  AccountLogin = '/system-web-app/auth/login',
  UserInfo = '/system-web-app/auth/getUserInfo',
  UserMenus = '/role/',
  GetCode = '/system-web-app/auth/getLoginCode'
}

export function accountLoginRequest(account: Account) {
  return hyRequest.post<LoginInfo>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function getLoginCode() {
  return hyRequest.get({
    url: LoginAPI.GetCode
  })
}

export function getUserById() {
  return hyRequest.get({
    url: LoginAPI.UserInfo
  })
}

export function getUserMenus(id: number) {
  return hyRequest.get({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
