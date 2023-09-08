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
  useEffect(() => {
    setTimeout(() => {
      check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
      }).finally(() => setLoading(false))
    }, 1000);
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
