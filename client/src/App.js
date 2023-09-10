import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "."
import { check } from "./http/userAPI"
import { Spinner } from "react-bootstrap"



const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  //console.log('urllll', process.env.REACT_APP_API_URL) не работало пока не перезагрузил сервер

  //управляем крутилкой и логиним пользователя
  //крутим пока не прийдет ответ что пользователь есть и тогда страница загружается
  //ИМХО неправлильно это она всегда должна грузиться но какая именно страничка должно зависеть от ответа
  //https://youtu.be/H2GCkRF9eko?list=PL6DxKON1uLOFJ5_dDcX7G1osKnsBlCaaT&t=7933
  useEffect(() => {
    check().then(data => {
        user.setUser(data)// ??? тру? тут ведь должен объект юзера храниться
        user.setIsAuth(true)
      })
      .catch(e => { // не знаю правильно ли её тут ловить??
        console.log('Пользователь не залогинен ',e.message, e)
      })
      //"перерендеринга навбара мы не видим " https://youtu.be/H2GCkRF9eko?list=PL6DxKON1uLOFJ5_dDcX7G1osKnsBlCaaT&t=8068
      //я все вижу всегда, как мы не видим если мы перезапускаем приложение обновлением страницы
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={'grow'} />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  )
})

export default App
