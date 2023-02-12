import { useContext } from "react"
import { logout } from "../context/authContext/AuthActions"
import { AuthContext } from "../context/authContext/AuthContext"
export default function Home() {
  const { user } = useContext(AuthContext)
  const handleLogout = () => {
    logout(dispatch)
  }
  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <h2>Click to <Link to='/login'><button onClick={handleLogout}>Logout</button></Link> </h2>
    </>
  )
}
