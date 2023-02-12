import { Routes, Route } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import './style.css'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
