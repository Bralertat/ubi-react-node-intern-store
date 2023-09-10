import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode"// достает из токена данные

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password })
  localStorage.setItem('token', data.token)
  return jwt_decode(data.token)
}

//если токен невалидный то пользователь должен разлогиниваться // эту функцию у меня запускает только крутилка
export const check = async () => {
  console.log('client check function')
  try {
    const { data } = await $authHost.get('api/user/auth')
    //в этом месте появляется ошибка потому все что ниже не выполняется
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  } catch (error) {
    console.log('client check function Error', error.name,': ' ,error.message)
    throw error
  }
}
