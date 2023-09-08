import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'
import { useContext } from 'react'
import { Context } from '..'

const AppRouter = () => {
  const {user} = useContext(Context)
  console.log(user)
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} Component={Component} />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} Component={Component} />
      )}
      <Route path="*" element={<Navigate replace to={SHOP_ROUTE}/>}/>
    </Routes>
  )
}
export default AppRouter