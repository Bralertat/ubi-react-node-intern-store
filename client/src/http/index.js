import axios from "axios"

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
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

//перед каждым запросом будет подставлять токен
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
