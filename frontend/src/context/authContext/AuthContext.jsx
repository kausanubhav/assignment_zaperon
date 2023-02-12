import axios from "axios"
import { createContext, useReducer, useEffect, useState } from "react"
import AuthReducer from "./AuthReducers"
const INITIAL_STATE = {
  user: null,
  error: false,
  message: "",
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //checkLoggedIn function
  const API_URL = "http://localhost:5000/api"
  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  })
  const getLoggedIn = async () => {
    const loggedInResponse = await axiosInstance.get("users/loggedIn")
    setIsLoggedIn(loggedInResponse.data)
  }

  useEffect(() => {
    getLoggedIn()
  }, [])
  return (
    <AuthContext.Provider value={{ ...state, dispatch, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
