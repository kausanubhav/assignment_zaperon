import axios from "axios"
import {
  loginFailure,
  
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./AuthActions"
const API_URL = "http://localhost:5000/api"

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

//login
export const login = async (user, dispatch) => {
  try {
    const res = await axiosInstance.post("users/login", user)
    dispatch(loginSuccess(res.data))
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    dispatch(loginFailure(message))
  }
}

//register

export const register = async (user, dispatch) => {
  dispatch(registerStart())

  try {
    const res = await axiosInstance.post("users", user)
    dispatch(registerSuccess(res.data))
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    dispatch(registerFailure(message))
  }
}

//logout
export const logout = async (dispatch) => {
    await axiosInstance.delete("users/logout")
    dispatch(logout())
 
}
