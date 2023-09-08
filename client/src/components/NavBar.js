import { useContext } from "react"
import { Context } from ".."
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap"
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts"
import { observer } from "mobx-react-lite";

// он еще оборачивал в observer https://youtu.be/H2GCkRF9eko?list=PL6DxKON1uLOFJ5_dDcX7G1osKnsBlCaaT&t=5300
const NavBar = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()  // const history = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>КупиДевайс</NavLink>
        {user.isAuth ?
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Выйти
            </Button>
          </Nav>
          :
          <Nav className="ml-auto" style={{ color: 'white' }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        }
      </Container>
    </Navbar>
  )
})
export default NavBar