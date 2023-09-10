import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this._isAuth = false
    this._user = {}
    // mobx будет следить за этим объектом и будет перерендеривать при изменении
    makeAutoObservable(this)
  }

  setIsAuth(bool) { this._isAuth = bool }

  setUser(user) { this._user = user }

  //??? компьютед функции, вызываются только если переменная внутри была изменена что https://youtu.be/H2GCkRF9eko?list=PL6DxKON1uLOFJ5_dDcX7G1osKnsBlCaaT&t=4897
  //эти функции вызываются при изменении стора
  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._user
  }


}