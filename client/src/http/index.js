import axios from "axios"

//создаем инстансы
const $host = axios.create({ // для неавторизованных запросов
  baseURL: process.env.REACT_APP_API_URL
  // baseURL: 'http://localhost:7000/'
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
  // baseURL: 'http://localhost:7000/'
})

const authInterceptor = config => {
  //local storage нехорошо нужно в cookie
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`//если токена нет пошлет null
  return config
}

//перед каждым запросом будет подставлять токен
$authHost.interceptors.request.use(authInterceptor,
  // у меня ошибки эти пока не выскакивали
  error => {
    console.log('authHost axios error ', error.message)
    return Promise.reject(error)
  }
)/// тут можно дописать ловитель ошибок https://axios-http.com/docs/interceptors

$host.interceptors.request.use(conf=> conf,
  // у меня ошибки эти пока не выскакивали
  error => {
    console.log('host axios error ', error.message)
    return Promise.reject(error)
  }
)

export {
  $host,
  $authHost
}
