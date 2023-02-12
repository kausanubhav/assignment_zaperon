import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/authContext/AuthContext"

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext)
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoute
